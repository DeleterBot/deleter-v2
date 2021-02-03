import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import Discord from 'discord.js'
import { FastifyPluginCallback, FastifyRegisterOptions, FastifyServerOptions } from 'fastify'
import { ValidationPipe } from '@nestjs/common'
import DatabaseOperator from '@src/services/DatabaseOperator'
import Constants from '@api/utils/Constants'

export default class DeleterApiWorker {
  private readonly port: number
  private readonly ip: string
  public manager: Discord.ShardingManager
  public db!: DatabaseOperator
  public api!: NestFastifyApplication

  constructor(manager: Discord.ShardingManager, port = 8379, ip = '0.0.0.0') {
    this.manager = manager
    this.port = port
    this.ip = ip
  }

  public async start(
    options?: FastifyServerOptions,
    ...plugins: Array<[ FastifyPluginCallback, FastifyRegisterOptions<any> ]>
  ) {

    this.db = new DatabaseOperator()
    await this.db.connect().catch(e => {
      console.error('fastify | connection to database failed. exiting NOW', e)
      process.exit(1)
    })

    global.ApiWorker = this

    const AppModule = require('@api/modules/app.module').default

    this.api = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(options),
      {
        logger: true
      }
    )

    this.api.useGlobalPipes(new ValidationPipe({
      transform: true,
      forbidUnknownValues: true
    }))

    this.api.setGlobalPrefix(Constants.PREFIX)

    plugins.forEach(([ plugin, pluginOptions ]) => this.api.register(plugin, pluginOptions))

    return this.api.listen(this.port, this.ip, (err: Error, address: string) => {
      if (err) {
        console.error(err)
        return err
      } else {
        console.info(`fastify | listening on ${address}`)
        return true
      }
    })
  }
}