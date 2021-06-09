import AbstractController from '@api/abstractions/abstract.controller'
import Constants from '@api/utils/Constants'
import { Controller, Get } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'

@Controller(Constants.PUBLIC)
export default class CommandsController extends AbstractController {

  @Get('commands')
  @Throttle(15, 60)
  async execute() {

    const script = 'Array.from(this.cache.commands?.filter(c =>'
      + ' !c.developer && !c.disabled && !c.settings '
      + ').values())'
      + '.map(c => { return { '
      + 'name: c.name, translations: c.translations, '
      + 'memberPermissions: c.memberPermissions ?? [], isModerator: c.moderator ?? false, '
      + 'category: c.translations.en.category'
      + '} })'

    return await this.manager.shards.first()!.eval(script)

  }

}
