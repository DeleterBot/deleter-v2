import Discord from 'discord.js'
import fs from 'fs'
import { parse } from 'dot-properties'
import BaseEvent from '../abstractions/BaseEvent'
import BaseCommand from '@/abstractions/BaseCommand'

class Gatherer {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be installed.`)
  }

  static loadFiles(fn: Function, savingType?: string, isProperties?: boolean) {
    const result: any = savingType === 'collection' ? new Discord.Collection() : []
    loadFiles()

    function loadFiles(dir = require('path').resolve('./dist/src') + '/') {
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

          function end() {
            const res = fn(file, dir)
            if (res) {
              if (Array.isArray(result)) {
                result.push(res)
              } else result.set(res.key, res.value)
            }
          }

          if (file.endsWith('.properties') && isProperties)
            end()
          else if (!file.endsWith('.properties'))
            end()
        }

      })
    }

    return result

  }

  static loadCommands(): Discord.Collection<string, BaseCommand> {
    return this.loadFiles((file: string, dir: string) => {

      const commandPath = `${dir}${file}`
      const command = require(commandPath)?.default

      if (command?.isCommand) {
        delete require.cache[commandPath]
        const comm = require(commandPath)?.default
        const newCommand = new comm()
        if (newCommand.name) {
          const result = {
            name: newCommand.name,
            ru: newCommand.ru,
            en: newCommand.en,
            gg: newCommand.gg,
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
      const subCommand = require(subCommandPath)?.default

      if (subCommand?.isSubCommand) {
        delete require.cache[subCommandPath]
        const subComm = require(subCommandPath)?.default
        const newSubCommand = new subComm()
        if (newSubCommand.name && newSubCommand.path && newSubCommand.slaveOf) {
          const result = {
            name: newSubCommand.name,
            slaveOf: newSubCommand.slaveOf,
            ru: newSubCommand.ru,
            en: newSubCommand.en,
            gg: newSubCommand.gg,
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

  static loadProps(): Discord.Collection<string, any> {
    return this.loadFiles((file: string, dir: string) => {

      const propertyPath = `${dir}${file}`
      try {
        const file = fs.readFileSync(propertyPath, { encoding: 'utf-8' })
        const property = parse(file)
        if (property.name && property.isProperty) return {
          key: property.name,
          value: property
        }
      } catch (e) {} // eslint-disable-line no-empty

    }, 'collection', true)
  }

  static loadEvents(): Array<BaseEvent> {
    return this.loadFiles((file: string, dir: string) => {

      const eventPath = `${dir}${file}`
      const event = require(eventPath)?.default

      if (event?.isEvent) {
        delete require.cache[eventPath]
        const ev = require(eventPath)?.default
        const newEvent = new ev()
        if (newEvent.name) return newEvent
      }

    })
  }

}

export default Gatherer