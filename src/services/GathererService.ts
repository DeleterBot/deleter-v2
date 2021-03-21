import Discord from 'discord.js'
import fs from 'fs'
import { parse } from 'dot-properties'
import BaseEvent from '../abstractions/BaseEvent'
import BaseCommand from '@src/abstractions/BaseCommand'
import { resolve } from 'path'

const req = require

class Gatherer {
  public static readonly isUtils: boolean = true

  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be installed.`)
  }

  static loadFiles(fn: any, savingType?: string, isProperties?: boolean) {
    const result: any = savingType === 'collection' ? new Discord.Collection() : []
    loadFiles()

    function loadFiles(dir = resolve(isProperties ? './src' : './dist/src') + '/') {
      const files = fs.readdirSync(dir)
      files.forEach((file) => {

        if (fs.lstatSync(dir + file).isDirectory()) {
          loadFiles(dir + file + '/')
          return
        }

        if (
          (file.endsWith('.js')
            || file.endsWith('.ts')
            || file.endsWith('.properties')
          ) && !file.endsWith('.d.ts')
        ) {
          if (file.endsWith('.properties') && isProperties)
            end()
          else if (!file.endsWith('.properties'))
            end()
        }

        function end() {
          const res = fn(file, dir)
          if (res) {
            if (Array.isArray(result)) {
              result.push(res)
            } else {
              if (Array.isArray(res)) {
                res.forEach(r => {
                  result.set(r.key, r.value)
                })
              } else result.set(res.key, res.value)
            }
          }
        }

      })
    }

    return result

  }

  static loadCommands(): Discord.Collection<string, BaseCommand> {
    return this.loadFiles((file: string, dir: string) => {

      const commandPath = `${dir}${file}`
      const command = req(commandPath)?.default

      if (command?.isCommand) {
        delete require.cache[commandPath]
        const comm = req(commandPath)?.default
        const newCommand = new comm()
        if (newCommand.name) {
          const result = {
            name: newCommand.name,
            translations: newCommand.translations,
            path: newCommand.path
          }
          return {
            key: result.name,
            value: result
          }
        }
      }

    }, 'collection')
  }

  static loadSubCommands(): Discord.Collection<string, any> {
    return this.loadFiles((file: string, dir: string) => {

      const subCommandPath = `${dir}${file}`
      const subCommand = req(subCommandPath)?.default

      if (subCommand?.isSubCommand) {
        delete require.cache[subCommandPath]
        const subComm = req(subCommandPath)?.default
        const newSubCommand = new subComm()
        if (newSubCommand.name && newSubCommand.path && newSubCommand.slaveOf) {
          const result = {
            name: newSubCommand.name,
            slaveOf: newSubCommand.slaveOf,
            translations: newSubCommand.translations,
            path: newSubCommand.path
          }
          return {
            key: result.path,
            value: result
          }
        }
      }

    }, 'collection')
  }

  static loadProps(mode: 'keywords' | 'phrases'): Discord.Collection<string, any> {
    return this.loadFiles((file: string, dir: string) => {

      const propertyPath = `${dir}${file}`
      try {

        if (propertyPath.endsWith('.properties')) {
          const file = fs.readFileSync(propertyPath, { encoding: 'utf-8' })
          const property = parse(file)
          const result: Record<string, any>[] = []

          if (property.mode === mode) {
            const root = property.root ? property.root : ''

            if (root) delete property.root
            delete property.mode

            const entries = Object.entries(property)

            entries.forEach(e => {
              result.push({ key: root + e[0], value: e[1] })
            })
          }

          return result
        }
      } catch (e) {} // eslint-disable-line no-empty

    }, 'collection', true)
  }

  static loadEvents(): Array<BaseEvent> {
    return this.loadFiles((file: string, dir: string) => {

      const eventPath = `${dir}${file}`
      const event = req(eventPath)?.default

      if (event?.isEvent) {
        delete require.cache[eventPath]
        const ev = req(eventPath)?.default
        const newEvent = new ev()
        if (newEvent.name) return newEvent
      }

    })
  }

}

export default Gatherer
