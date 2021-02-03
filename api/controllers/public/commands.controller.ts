import AbstractController from '@api/abstractions/abstract.controller'
import Constants from '@api/utils/Constants'
import { Controller, Get, InternalServerErrorException } from '@nestjs/common'

@Controller(Constants.PUBLIC)
export default class CommandsController extends AbstractController {

  @Get('commands')
  async execute() {

    if (!this.manager.shards.size)
      throw new InternalServerErrorException({
        message: 'shards haven\'t created yet'
      })

    const script = 'Array.from(this.cache.commands?.filter(c =>'
      + ' !c.developer && !c.disabled && !c.settings '
      + ').values())'
      + '.map(c => { return { '
      + 'name: c.name, ru: c.ru, en: c.en, gg: c.gg, '
      + 'memberPermissions: c.memberPermissions ?? [], isModerator: c.moderator ?? false, '
      + 'category: c.en.category'
      + '} })'

    return await this.manager.shards.first()!.eval(script)

  }

}