import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Get,
  ParseIntPipe,
  Query,
  Delete,
  Param,
  Put,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Store } from 'src/models/store.schema';
import { Observable } from 'rxjs';
import { StoreService } from './store.service';
import { ApiTags } from '@nestjs/swagger';
import { createStoreDto, PagingQueryDto, updateStoreDto, UploadImageDto } from './store.dto';
import { ResponseInterceptor, MessageResponseInterceptor } from '@app/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from '@app/helpers/decorators/response.message';
import { multerDiskUploader } from '@app/utils/multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
const UPLOAD_DIR = join(process.cwd(), 'assets/images');
const files_upload_midd = { storage: multerDiskUploader(UPLOAD_DIR) };
@ApiTags('stores')
@Controller('stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post('/create')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('store created.')
  async create(@Body() body: createStoreDto): Promise<Store | Observable<Store>> {
    return this.storeService.createStore(body);
  }

  @Get('/getAll/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('store fetched.')
  async getAll(@Param('id') id: string, @Query() query: PagingQueryDto) {
    const data = await this.storeService.getAll(id, query);
    return data;
  }

  @Delete('/remove/:id')
  @UseInterceptors(MessageResponseInterceptor)
  async deleteStore(@Param('id') id: string) {
    const respone = await this.storeService.remove<string>(id);
    return respone;
  }

  @Get('/getById/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('store fetched.')
  async getById(@Param('id') id: string) {
    return await this.storeService.getById(id);
  }

  @Put('/update/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('store updated.')
  async update(@Param('id') id: string, @Body() model: updateStoreDto): Promise<Store | Observable<Store>> {
    const data = await this.storeService.update(id, model);
    return data;
  }

  @Post('/uploadImage/:id')
  @ApiBody({
    description: 'please upload image here',
    type: UploadImageDto,
  })
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', files_upload_midd))
  @UseInterceptors(MessageResponseInterceptor)
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const data = await this.storeService.uploadImage(id, file);
    return data;
  }
}
