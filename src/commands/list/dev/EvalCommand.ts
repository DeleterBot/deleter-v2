import BaseCommand from '@src/abstractions/BaseCommand'
import Discord from 'discord.js'
import Axios from 'axios'
import Info from '@src/types/Info'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import { types, inspect } from 'util'
import environmentEval from '@src/utils/environmentEval'
import EvalCommandConfig from '@src/commands/list/dev/resources/configs/EvalCommandConfig'

export default class EvalCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.dev.EvalCommand', new EvalCommandConfig())
  }

  async execute(msg: Discord.Message, info: Info): Promise<CommandExecutionResult> {

    try {

      let toEval = info.args.join(' '),
        { isAsync, shard } = info.flags

      const { noReply, last, all, shell, everywhere, api, more, db } = info.flags

      if (!toEval) return new CommandExecutionResult('bruh').setReply(true)

      toEval = toEval.replace(/(```(.+)?)?/g, '')

      if (!isNaN(parseInt(shard))) shard = parseInt(shard)

      if (toEval.includes('await')) isAsync = true

      if (isAsync) toEval = '(async() => {' + toEval + '})()'

      const before = process.hrtime.bigint()

      let evaled
      if (db) {
        evaled = this.client.db.execute(toEval)
      } else if (shell) {
        evaled = environmentEval(toEval)

      } else if (api) {

        const port = process.env.API_PORT ?? 8379
        const address = process.env.API_ADDRESS ?? 'localhost'
        const path = process.env.API_PATH ?? ''
        const endpoint = `${address}:${port}${path}/private/eval`

        evaled = Axios.post(
          endpoint,
          { toEval: toEval },
          { headers: { 'Authorization': this.client.token } }
          )
          .then((r) => r.data.toString())
          .catch((e) => {
            if (e.response?.text) throw new Error(e.response.text)
            else throw e
          })

      } else if (everywhere) {
        evaled = this.client.shard?.broadcastEval(toEval)

      } else if (shard) {

        if (shard !== 'any')
          evaled =
            this.client.shard?.broadcastEval(`if (this.shard?.ids?.includes(${shard})) eval("${toEval}")`)
        else
          evaled = this.client.shard?.broadcastEval(`eval("${toEval}")`)

      } else evaled = eval(toEval)

      if (noReply) return new CommandExecutionResult('😎').setReact(true)

      if (types.isPromise(evaled)) evaled = await evaled

      const after = process.hrtime.bigint()

      if (shard) {
        if (shard === 'any') {
          evaled = evaled.filter((e: any) => e)
        } else evaled = evaled[shard]
      }

      if (typeof evaled !== 'string') evaled = inspect(evaled, {
        depth: more ? 2 : 0
      })

      if (evaled === 'undefined' || evaled === 'null' || evaled === '') evaled = '\nEmpty Response'

      if (evaled.length >= 1900 && !all) {
        if (!last) evaled = evaled.slice(0, 1900)
        else evaled = evaled.slice(evaled.length - 1900)
      }

      evaled =
        'Completed in '
        + (after - before) +
        ' nanoseconds or ' + (parseInt(String(after - before)) / 1000000).toFixed(3) + 'ms\n'
        + evaled

      const tokenRegExp = new RegExp(
        `${process.env.TOKEN}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'g'
        ),
        cloudflareRegExp = new RegExp(
          `${process.env.CF_TOKEN ?? '__cf.D'}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'g'
        ),
        databaseRegExp = new RegExp(
          `${process.env.DB_USRN ?? process.env.DB ?? '__db.D'}`
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'g'
        ),
        databaseRegExp2 = new RegExp(
          `${process.env.DB_PSWD ?? '__db.D'}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'g'
        ),
        clientSecretRegExp = new RegExp(
          `${process.env.CLIENT_SECRET ?? '__secret.D'}`
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'g'
        ),
        wbTokenRegExp = new RegExp(
          `${process.env.WBTOKEN ?? '__wbToken.D'}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'g'
        )

      evaled = evaled
        .replace(tokenRegExp, '__token.D')
        .replace(cloudflareRegExp, '__cf.D')
        .replace(databaseRegExp, '__db.D')
        .replace(databaseRegExp2, '__db.D')
        .replace(clientSecretRegExp, '__secret.D')
        .replace(wbTokenRegExp, '__wbToken.D')

      const code = shell ? 'xl' : 'js'
      const result = new CommandExecutionResult(evaled).setOptions({ code: code })

      if (all) {
        return result.amendOptions({
          split: {
            char: '\n'
          }
        })
      } else return result

    } catch (e) {
      let err = `${e.name}\n${e.message}`
      if (err.length >= 1980) err = err.slice(0, 1980) + '...'
      return new CommandExecutionResult(err).setReply(true)
    }

  }
}
