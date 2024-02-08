import {
  Controller,
  Post,
  Get,
  Query,
  Put,
  Delete,
  Param,
  Body,
  Logger,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SubCategoryDto, PagingQueryDto, updateSubCategory } from './sub-category.dto';
import { SubCategoryService } from './sub-category.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { join } from 'path';
import { multerDiskUploader } from '@app/utils/multer';
import { ResponseMessage } from 'src/helpers/decorators/response.message';
import { documentesSubType } from '@app/helpers/types/subCategory';

const category_filefield_payload = [{ name: 'image', maxCount: 1 }];
const UPLOAD_DIR = join(process.cwd(), 'assets/images');
const files_upload_midd = { storage: multerDiskUploader(UPLOAD_DIR) };

@ApiTags('subCategory')
@Controller('sub-category')
export class SubCategoryController {
  private readonly logger = new Logger(SubCategoryController.name);
  constructor(private subCategoryService: SubCategoryService) {}

  @Post('/create')
  @UseInterceptors(ResponseInterceptor)
  @ApiConsumes('multipart/form-data')
  @ResponseMessage('subCategory fetched.')
  @UseInterceptors(FileFieldsInterceptor(category_filefield_payload, files_upload_midd))
  async createSub(@UploadedFiles() files: documentesSubType, @Body() body: SubCategoryDto) {
    const sub = await this.subCategoryService.createSub(files, body);
    return sub;
  }

  @Get('/getAll')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('subCategory fetched.')
  async getAllSub(@Query() query: PagingQueryDto) {
    this.logger.log('[getall: sub-Category');
    return this.subCategoryService.getAllSub(query);
  }

  @Get('/getById/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('subCategory fetched')
  async getByIdCategory(@Param('id') id: string) {
    const category = await this.subCategoryService.getByIdSub<string>(id);
    return category;
  }

  @Put('/update/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('updated subCategory')
  async updateSub(@Param('id') id: string, @Body() model: updateSubCategory) {
    const sub = await this.subCategoryService.updateSub(id, model);
    return sub;
  }

  @Put('/updateSc/:id')
  @UseInterceptors(ResponseInterceptor)
  @ApiConsumes('multipart/form-data')
  @ResponseMessage('updated subCategory')
  @UseInterceptors(FileFieldsInterceptor(category_filefield_payload, files_upload_midd))
  @UseInterceptors(FileFieldsInterceptor(category_filefield_payload, files_upload_midd))
  async updateSC(@Param('id') id: string, files: documentesSubType, @Body() model: updateSubCategory) {
    const sub = await this.subCategoryService.updateSC(id, files, model);
    return sub;
  }

  @Delete('/delete/:id')
  @ResponseMessage('  subCategory deleted')
  @UseInterceptors(ResponseInterceptor)
  async deleteSub(@Param('id') id: string): Promise<string> {
    const data = await this.subCategoryService.deleteSub(id);
    return data;
  }
}
