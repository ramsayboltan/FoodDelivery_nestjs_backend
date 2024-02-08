import { Controller, Post, Get, Put, Body, UseInterceptors, Query, Param, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiHeader, ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  createCustomerDto,
  updateUserDto,
  deleteManyDto,
  PagingQueryDto,
  customerFilterDto,
  CustomerAddressUpdateDto,
} from './customers.dto';
import { CustomersService } from './customers.service';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from 'src/helpers/decorators/response.message';
import { TokenAuthGuard } from 'src/helpers/guards/auth.guard';
import { toModel as customerMapperModel, toSearchModel } from '../../mappers/customer';

// import { Customer } from '@app/models/customer.schema';
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  // ^  create customer api
  @Post('/create')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('customer created')
  createCustomer(@Body() body: createCustomerDto) {
    return this.customerService.createCustomer(body);
  }

  // ^ get all customer
  @Get('/getall/:id')
  //   @UseGuards(TokenAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('customer fetched.')
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async getAllCustomer(@Param('id') id: string, @Query() query: PagingQueryDto) {
    const data = await this.customerService.getAllCustomer(id, query);
    return data;
  }

  @Get('/search')
  @UseInterceptors(ResponseInterceptor)
  async searchCustomer(@Query('name') name: string) {
    const data = await this.customerService.searchCustomer(name);

    return toSearchModel(data as any);
  }

  // * customer get by id
  @Get('/getById/:id')
  //   @UseGuards(TokenAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('customer fetched.')
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async getById(@Param('id') id: string) {
    const data = await this.customerService.getById(id);
    return customerMapperModel(data);
  }
  // * update customer api
  @Put('/update/:id')
  @UseInterceptors(MessageResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  updateCustomer(@Param('id') id: string, @Body() model: updateUserDto) {
    return this.customerService.updateCustomer(id, model);
  }

  // * delete api
  @Delete('/remove/:id')
  @UseInterceptors(MessageResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async remove(@Param('id') id: string): Promise<string> {
    const data = await this.customerService.remove<string>(id);
    return data;
  }

  //* delete many customer
  @Put('/deleteMany')
  @UseInterceptors(MessageResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async deleteManyCustomer(@Body() model: deleteManyDto): Promise<string> {
    const data = await this.customerService.removeManyCustomer<string[]>(model.customer_ids);
    return data;
  }

  @Get('/filter')
  @UseInterceptors(ResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async filterCustomer(@Query() query: customerFilterDto) {
    const data = await this.customerService.filterCustomer<typeof query>(query);
    return toSearchModel(data as any[]);
  }

  @Put('/update/address/:id')
  async updateAddress(@Body() body: CustomerAddressUpdateDto, @Param('id') id: string) {
    const data = await this.customerService.updateAddress(id, body);
    return data;
  }

  // @Delete('/delete/address/:customerId/:addressId')
  // async deleteAddress(@Param('customerId') customerId: string, @Param('addressId') addressId: string) {
  //   const data = await this.customerService.deleteAddress(customerId, addressId);
  //   return data;
  // }
}
