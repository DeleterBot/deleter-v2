import 'module-alias/register'
import BaseCommand from '@/base/BaseCommand'
import Discord from 'discord.js'
import Axios from 'axios'

export default class EvalCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.dev.EvalCommand', {
      name: 'eval'
    })
  }

// @ts-ignore
  async execute(msg: Discord.Message, info: Record<string, any> = {}): any {

    if (!this.client.owner?.includes(msg.author.id)) return
    // const ResultsHandler = require('../../../util/ResultsHandler')
    info.args = msg.content.split(/ +/g).slice(1)
    try {

      let toEval = info.args.join(' '),
        isAsync = false, noReply = false, last = false, all = false,
        shell = false, everywhere = false, shard: string | boolean = false, api = false,
        more = false

      if (!toEval) return msg.reply('bruh')

      toEval = toEval
        .replace(/(```(.+)?)?/g, '')
        .replace('+async', () => {
          isAsync = true
          return ''
        })
        .replace(/(--noreply)|(--n)/g, () => {
          noReply = true
          return ''
        })
        .replace(/(--last)|(--l)/g, () => {
          last = true
          return ''
        })
        .replace(/(--all)/g, () => {
          all = true
          return ''
        })
        .replace(/(--api)/g, () => {
          api = true
          return ''
        })
        .replace(/(--shell)/g, () => {
          shell = true
          return ''
        })
        .replace(/(--more)|(--m)/g, () => {
          more = true
          return ''
        })
        .replace(/(--everywhere)|(--e)/g, () => {
          everywhere = true
          return ''
        })
        .replace(/(--shard=[0-9]+)/g, (match: string) => {
          shard = match.replace(/[^0-9]/g, '')
          return ''
        })

      if (toEval.includes('await')) isAsync = true

      if (isAsync) toEval = '(async() => {' + toEval + '})()'

      let before = process.hrtime.bigint()

      let evaled
      if (shell)
        evaled = require('child_process').execSync(toEval, { encoding: 'utf-8' })
      else if (api) {
        const port = process.env.API_PORT ?? 8379
        const address = process.env.API_ADDRESS ?? 'localhost'
        const path = process.env.API_PATH ?? ''
        const endpoint = `${address}:${port}${path}/private/eval`
        evaled = Axios.post(endpoint, {
          toEval: toEval
        }, {
          headers: {
            'Authorization': this.client.token
          }
        })
          .then((r: any) => r.text)
          .catch((e: any) => {
            if (e.response?.text) throw new Error(e.response.text)
            else throw e
          })
      } else if (everywhere)
        evaled = this.client.shard?.broadcastEval(toEval)
      else if (shard)
        evaled =
          this.client.shard?.broadcastEval(`if (client.shard?.ids?.includes(${shard})) eval("${toEval}")`)
      else
        evaled = eval(toEval)

      if (noReply) return msg.react('😎')

      if (require('util').types.isPromise(evaled)) evaled = await evaled

      let after = process.hrtime.bigint()

      if (shard) evaled = evaled[shard]

      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, {
        depth: more ? undefined : 0
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
        databaseRegExp = new RegExp(
          `${process.env.DB}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'g'
        ),
        clientSecretRegExp = new RegExp(
          `${process.env.CLIENT_SECRET ?? '__secret.D'}`
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'g'
        ),
        wbTokenRegExp = new RegExp(
          `${process.env.WBTOKEN}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'g'
        )

      evaled = evaled
        .replace(tokenRegExp, '__token.D')
        .replace(databaseRegExp, '__db.D')
        .replace(clientSecretRegExp, '__secret.D')
        .replace(wbTokenRegExp, '__wbToken.D')

      const code = shell ? 'xl' : 'js'

      if (all) { // @ts-ignore
        msg.channel.send(evaled, { code: code, split: '\n' })
      } else msg.channel.send(evaled, { code: code })

    } catch (e) {
      let err = `${e.name}\n${e.message}`
      if (err.length >= 1980) err = err.slice(0, 1980) + '...'
      msg.reply(err)
    }


  }
}