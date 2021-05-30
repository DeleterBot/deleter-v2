import AbstractController from '@api/abstractions/abstract.controller'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import Constants from '@api/utils/Constants'
import AuthGuard from '@api/guards/auth.guard'
import QiwiBillingCreateDto from '@api/dto/qiwi-billing-create.dto'
import Snowflake from '@src/utils/other/Snowflake'
import AuthorizedRequest from '@api/types/AuthorizedRequest'
import CachedBill from '@api/types/CachedBill'
import { Throttle } from '@nestjs/throttler'

@Controller(Constants.PRIVATE + 'billing')
export default class QiwiBillingController extends AbstractController {

  @Post('create')
  @UseGuards(new AuthGuard())
  @Throttle(1, 60)
  async create(@Body() body: QiwiBillingCreateDto, @Req() req: AuthorizedRequest) {

    const cacheKey = `${Constants.billingPrefix}:${req.user.id}:${body.amount}`

    const cache: CachedBill | undefined
      = await this.db.cache?.get(cacheKey)

    if (cache) return cache

    const params = {
      amount: body.amount,
      expirationDateTime: this.qiwi.getLifetimeByDay(0.1),
      currency: 'RUB',
      successUrl: 'https://qiwi.com/',
      customFields: {
        themeCode: Constants.qiwiThemeCode
      }
    }

    const bill = await this.qiwi.createBill(Snowflake.generate(), params)

    if (bill && this.db.cache)
      await this.db.cache.set(cacheKey, bill)

    return {
      payUrl: bill.payUrl,
      comment: bill.comment,
      amount: bill.amount.value
    }

  }

  @Get('check')
  @UseGuards(new AuthGuard())
  @Throttle(5, 60)
  async check() {} // eslint-disable-line no-empty

}
