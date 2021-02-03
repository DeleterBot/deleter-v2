import AbstractController from '@api/abstractions/abstract.controller'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import Constants from '@api/utils/Constants'
import AuthGuard from '@api/guards/auth.guard'
import QiwiBillingCreateDto from '@api/dto/qiwi-billing-create.dto'
import Snowflake from '@src/utils/Snowflake'
import AuthorizedRequest from '@api/types/AuthorizedRequest'

@Controller(Constants.PRIVATE + 'billing')
export default class QiwiBillingController extends AbstractController {

  @Post('create')
  @UseGuards(new AuthGuard())
  async create(@Body() body: QiwiBillingCreateDto, @Req() req: AuthorizedRequest) {

    const params = {
      amount: body.amount,
      expirationDateTime: this.qiwi.getLifetimeByDay(0.5),
      currency: 'RUB',
      successUrl: 'https://qiwi.com/',
      customFields: {
        themeCode: Constants.qiwiThemeCode
      }
    }

    const bill = await this.qiwi.createBill(Snowflake.generate(), params)

    console.log(bill, req.user)

    return {
      payUrl: bill.payUrl,
      comment: bill.comment,
      amount: bill.amount.value
    }

  }

  @Get('check')
  @UseGuards(new AuthGuard())
  async check() {} // eslint-disable-line no-empty

}
