import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import Discord from 'discord.js'
import { FastifyPluginCallback, FastifyRegisterOptions, FastifyServerOptions } from 'fastify'
import { ValidationPipe } from '@nestjs/common'
import DatabaseOperator from '@src/services/db/DatabaseOperator'
import Constants from '@api/utils/Constants'
import QiwiBillPaymentsAPI from '@qiwi/bill-payments-node-js-sdk'
import AllExceptionsFilter from '@api/utils/AllExceptionsFilter'
import { Server } from 'http'
import Logger from '@src/utils/other/Logger'
import { promisify } from 'util'

const wait = promisify(setTimeout)

export default class DeleterApiWorker {
  private readonly port: number
  private readonly ip: string
  public manager: Discord.ShardingManager
  public db!: DatabaseOperator
  public api!: NestFastifyApplication
  public qiwi: QiwiBillPaymentsAPI
  public logger: Logger = new Logger()

  constructor(manager: Discord.ShardingManager, port = 8379, ip = '0.0.0.0') {
    this.manager = manager
    this.port = port
    this.ip = ip
    this.qiwi = new QiwiBillPaymentsAPI(process.env.QIWI_PRIVATE_KEY)
  }

  public async start(
    options?: FastifyServerOptions,
    ...plugins: Array<[ FastifyPluginCallback<Record<never, never>, Server>, FastifyRegisterOptions<any> ]>
  ) {

    this.db = new DatabaseOperator()
    await this.db.connect({ createTables: true, log: true }).catch(e => {
      this.logger.critical('fastify', 'connection to database failed. exiting NOW |', e)
      process.exit(1)
    })

    this.logger.log('nest', 'bootstrapping application')
    this.logger.clear = true

    await wait(200)

    global.ApiWorker = this

    const AppModule = require('@api/modules/app.module').default

    this.api = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(options),
      {
        logger: [ 'error' ]
      }
    )

    this.logger.log('nest', 'applying global validation pipes')
    await wait(200)

    this.api.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }))

    this.logger.log('nest', 'applying global exceptions filters')
    await wait(200)

    const adapter = this.api.getHttpAdapter()
    this.api.useGlobalFilters(new AllExceptionsFilter(adapter))

    this.logger.log('nest', 'applying global prefix')
    await wait(100)

    this.api.setGlobalPrefix(Constants.PREFIX || '')

    this.logger.log('nest', 'applying fastify plugins')
    await wait(200)

    plugins.forEach(([ plugin, pluginOptions ]) => this.api.register(plugin as any, pluginOptions))

    return new Promise(res => {
      this.api.listen(this.port, this.ip, (err: Error, address: string) => {
        if (err) {
          this.logger.warn('fastify', `${err.name}: ${err.message}.`, 'api will be disabled')
          this.logger.clear = false
          res(err)
        } else {
          this.logger.success('fastify', `listening on ${address}`)
          this.logger.clear = false
          res(true)
        }
      })
    })
  }
}
