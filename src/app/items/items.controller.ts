import {
  Controller,
  Post,
  Query,
  Get,
  UseInterceptors,
  Logger,
  Body,
  ParseIntPipe,
  Param,
  HttpException,
  Delete,
  Put,
  HttpStatus,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { createItemDto, PagingQueryDto, itemUploadDto, itemDtoFilter, ItemUpdatedDto } from './items.dto';
import { ItemsService } from './items.service';
import { ResponseMessage } from 'src/helpers/decorators/response.message';
import { documentsFileType } from '@app/helpers/types/item';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { multerDiskUploader } from '@app/utils/multer';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { toItem as itemMapperModel, toSearchModel } from '@app/mappers/item';
const item_filefields_payload = [
  { name: 'avatar', maxCount: 1 },
  { name: 'addon_images', maxCount: 1 },
];
const UPLOAD_DIR = join(process.cwd(), 'assets/images');
const files_upload_midd = { storage: multerDiskUploader(UPLOAD_DIR) };

@Controller('items')
@ApiTags('Items')
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);
  constructor(private itemService: ItemsService) {}

  @Post('/create')
  @UseInterceptors(ResponseInterceptor)
  @ApiBody({ type: createItemDto })
  @ApiConsumes('multipart/form-data')
  @ResponseMessage('item created.')
  @UseInterceptors(FileFieldsInterceptor(item_filefields_payload, files_upload_midd))
  async createItem(@UploadedFiles() files: documentsFileType, @Body() body: createItemDto) {
    const item = await this.itemService.createItem(files.avatar, body, files.addon_images);
    return item;
  }
  // // , files.addon_images
  // @Get('/getall')
  // @ResponseMessage('item fetched.')
  // @UseInterceptors(ResponseInterceptor)
  // async getAllItem(@Query('page_size') page_size: string, @Query('page_number') page_number: string) {
  //   const data = await this.itemService.getAllItem({
  //     page_size,
  //     page_number,
  //   });
  //   return toSearchModel(data as any);
  // }

  @Get('/getAll/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('item fetched.')
  async getAll(@Param('id') id: string, @Query() query: PagingQueryDto) {
    const data = await this.itemService.getAll(id, query);
    return data;
  }
  // @Get('/getById/:id')
  // @ResponseMessage('item fetched.')
  // @UseInterceptors(ResponseInterceptor)
  // async getByIdItem(@Param('id') id: string) {
  //   const item = await this.itemService.getByIdItem(id);
  //   const data = itemMapperModel(item);
  //   return data;
  // }

  @Get('/getById/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('item fetched.')
  async getByIdItem(@Param('id') id: string) {
    return await this.itemService.getByIdItem(id);
  }
  @Put('/updateItem/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('item updated.')
  async updateItem(@Param('id') id: string, @Body() model: ItemUpdatedDto) {
    const item = await this.itemService.updateItem(id, model);
    return item;
  }

  @Delete('/delteItem/:id')
  @UseInterceptors(MessageResponseInterceptor)
  async deleteItem(@Param('id') id: string) {
    const item = await this.itemService.deleteItem(id);
    if (!item) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return 'user removed';
  }
  @Get('/search')
  @UseInterceptors(ResponseInterceptor)
  async searchCustomer(@Query('name') name: string) {
    const data = await this.itemService.searchItem(name);

    return data;
  }
  @Get('/filter')
  @UseInterceptors(ResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async filterCustomer(@Query() query: itemDtoFilter) {
    const data = await this.itemService.filterItem<typeof query>(query);
    return toSearchModel(data as any[]);
  }

  @Put('/uploadProfile/:id')
  @UseInterceptors(ResponseInterceptor)
  @ApiBody({
    description: 'please upload image here',
    type: itemUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar', files_upload_midd))
  @UseInterceptors(MessageResponseInterceptor)
  async uploadProfileImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const category = await this.itemService.uploadProfileImage(id, file);
    return category;
  }
  @Get('/getByIdMode/:id')
  //   @UseGuards(TokenAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('customer fetched.')
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async getByIdMode(@Param('id') id: string) {
    const data = await this.itemService.getByIdMode(id);
    return data;
  }
}
