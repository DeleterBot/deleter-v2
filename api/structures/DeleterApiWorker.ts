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
import Logger from '@src/services/misc/Logger'

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
    await this.db.connect(true).catch(e => {
      this.logger.error('fastify', 'connection to database failed. exiting NOW ==>', e)
      process.exit(1)
    })

    global.ApiWorker = this

    const AppModule = require('@api/modules/app.module').default

    this.api = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(options),
      {
        logger: [ 'error' ]
      }
    )

    this.api.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }))

    const adapter = this.api.getHttpAdapter()
    this.api.useGlobalFilters(new AllExceptionsFilter(adapter))

    this.api.setGlobalPrefix(Constants.PREFIX || '')

    plugins.forEach(([ plugin, pluginOptions ]) => this.api.register(plugin as any, pluginOptions))

    return this.api.listen(this.port, this.ip, (err: Error, address: string) => {
      if (err) {
        this.logger.warn('fastify', `${err.name}: ${err.message}.`, 'api will be disabled')
        return err
      } else {
        this.logger.info('fastify', `listening on ${address}`)
        return true
      }
    })
  }
}
