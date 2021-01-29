import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import Discord from 'discord.js'
import { FastifyPluginCallback, FastifyRegisterOptions, FastifyServerOptions } from 'fastify'
import AppModule from '@api/modules/app.module'
import { ValidationPipe } from '@nestjs/common'

export default class DeleterApiWorker {
  private readonly port: number
  private readonly ip: string
  public manager: Discord.ShardingManager
  public api!: NestFastifyApplication

  constructor(manager: Discord.ShardingManager, port: number = 8379, ip: string = '0.0.0.0') {
    this.manager = manager
    this.port = port
    this.ip = ip
  }

  public async start(
    options?: FastifyServerOptions,
    ...plugins: Array<[ FastifyPluginCallback, FastifyRegisterOptions<any> ]>
  ) {
    global.ApiWorker = this

    this.api = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(options),
      {
        logger: true
      }
    )

    this.api.useGlobalPipes(new ValidationPipe())

    plugins.forEach(([ plugin, pluginOptions ]) => this.api.register(plugin, pluginOptions))

    return this.api.listen(this.port, this.ip, (err: Error, address: string) => {
      if (err) {
        console.error(err)
        return err
      }
      else {
        console.info(`fastify | listening on ${address}`)
        return true
      }
    })
  }
}