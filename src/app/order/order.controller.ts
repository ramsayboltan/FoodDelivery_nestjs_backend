import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Logger,
  UseGuards,
  UseInterceptors,
  Param,
  Res,
  HttpException,
  InternalServerErrorException,
  HttpStatus,
  Delete,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OrderService } from './order.service';
import { ApiTags, ApiHeader, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { createOrderDto, PagingQueryDto, orderFilterDto, OrderUpdateDto } from './order.dto';
import { TokenAuthGuard } from 'src/helpers/guards/auth.guard';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from 'src/helpers/decorators/response.message';
import { orderpdfinterface } from '@app/helpers/interfaces/order.interface';
// import { PDFDocument } from 'pdfkit';
// import * as fs from 'fs';

@Controller('order')
@ApiTags('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(private OrderService: OrderService) {}

  @Post('/create')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('user created.')
  createUser(@Body() model: createOrderDto) {
    // console.log(model);
    return this.OrderService.createOrder(model);
  }

  @Get('/getall/:id')
  @UseGuards(TokenAuthGuard)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  @ResponseMessage('orders fetched.')
  @UseInterceptors(ResponseInterceptor)
  getAllUser(@Param('id') id: string, @Query() query: PagingQueryDto) {
    const data = this.OrderService.getAllOrder(id, query);
    return data;
  }

  @Get('/getById/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('fetched successfully.')
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async getById(@Param('id') orderId: string) {
    const order = await this.OrderService.getByIdOrder(orderId);
    return order;
  }

  @Get('/getByIdPdf/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(ResponseInterceptor)
  @ApiConsumes('multipart/form-data')
  async orderPdf(@Param('id') orderId: string) {
    try {
      const data = await this.OrderService.generatePDF(orderId);
      return data;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new HttpException('PDF generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Put('/softDelete/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(MessageResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async softDelete(@Param('id') orderId: string) {
    const order = await this.OrderService.softDelete(orderId);
    return order;
  }

  // @Get('/getByRestaurantId/:id')
  // @UseGuards(TokenAuthGuard)
  // @UseInterceptors(ResponseInterceptor)
  // @ResponseMessage('fetched successfully.')
  // @ApiHeader({
  //   name: 'x-access-token',
  //   description: 'Please enter access token',
  // })
  // async getByRestaurantId(@Param('id') restaurantId: string) {
  //   const order = await this.OrderService.getByRestaurantId(restaurantId);
  //   return order;
  // }
  // @Get('/getByCustomerId/:id')
  // @UseGuards(TokenAuthGuard)
  // @UseInterceptors(ResponseInterceptor)
  // @ResponseMessage('fetched successfully.')
  // @ApiHeader({
  //   name: 'x-access-token',
  //   description: 'Please enter access token',
  // })
  // async getByCustomerId(@Param('id') customerId: string) {
  //   const order = await this.OrderService.getByCustomerId(customerId);
  //   return order;
  // }
  // @Get('/getByDriverId/:id')
  // @UseGuards(TokenAuthGuard)
  // @UseInterceptors(ResponseInterceptor)
  // @ResponseMessage('fetched successfully.')
  // @ApiHeader({
  //   name: 'x-access-token',
  //   description: 'Please enter access token',
  // })
  // async getByDriverId(@Param('id') driverId: string) {
  //   const order = await this.OrderService.getByDriverId(driverId);
  //   return order;
  // }
  @Put('/update/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('order updated.')
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  orderUpdate(@Param('id') orderId: string, @Body() model: OrderUpdateDto) {
    return this.OrderService.orderUpdate(orderId, model);
  }
  @Get('/search')
  @UseInterceptors(ResponseInterceptor)
  async searchCustomer(@Query('name') name: string) {
    const data = await this.OrderService.searchOrder(name);

    return data;
  }
  @Get('/filter')
  @UseInterceptors(ResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async filterCustomer(@Query() query: orderFilterDto) {
    const data = await this.OrderService.filterOrder<typeof query>(query);
    return data;
  }
}
