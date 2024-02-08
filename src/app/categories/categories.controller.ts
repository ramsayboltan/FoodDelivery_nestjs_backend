import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  Logger,
  Param,
  Put,
  Delete,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiConsumes, ApiBody } from '@nestjs/swagger';
import {
  createCategoryDto,
  PagingQueryDto,
  categoryDtoFilter,
  updateCategoryDto,
  categoryUploadDto,
} from './categories.dto';
import { CategoriesService } from './categories.service';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from 'src/helpers/decorators/response.message';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { multerDiskUploader } from '@app/utils/multer';
import { documentesFileType } from '@app/helpers/types/category';

const category_filefield_payload = [{ name: 'avatar', maxCount: 1 }];
const UPLOAD_DIR = join(process.cwd(), 'assets/images');
const files_upload_midd = { storage: multerDiskUploader(UPLOAD_DIR) };

@ApiTags('category')
@Controller('categories')
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);
  constructor(private categoryService: CategoriesService) {}

  @Post('/create')
  // @ApiBody({ type: createCategoryDto })
  @ApiConsumes('multipart/form-data')
  @ResponseMessage('category created')
  @UseInterceptors(ResponseInterceptor)
  @UseInterceptors(FileFieldsInterceptor(category_filefield_payload, files_upload_midd))
  async createCategory(@UploadedFiles() files: documentesFileType, @Body() body: createCategoryDto) {
    console.log('category create>>>>>>>>>>>>>>>...start', files, body);

    const category = await this.categoryService.createCategory(files, body);
    return category;
  }

  @Get('/getAll/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('category fetched.')
  async getAllCategory(@Param('id') id: string, @Query() query: PagingQueryDto) {
    this.logger.log('[getall: Category');
    return this.categoryService.getAllCategory(id, query);
  }

  @Get('/getById/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('Category fetched')
  async getByIdCategory(@Param('id') id: string) {
    const category = await this.categoryService.getByIdCategory<string>(id);
    return category;
  }

  @Put('/updateCategory/:id')
  @UseInterceptors(ResponseInterceptor)
  @ApiConsumes('multipart/form-data')
  @ResponseMessage(' Category updated')
  async updateCategory(@Param('id') id: string, @Body() model: updateCategoryDto) {
    const category = await this.categoryService.updateCategory(id, model);
    return category;
  }

  @Put('/uploadProfile/:id')
  @UseInterceptors(ResponseInterceptor)
  @ApiBody({
    description: 'please upload image here',
    type: categoryUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar', files_upload_midd))
  @UseInterceptors(MessageResponseInterceptor)
  async uploadProfileImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const category = await this.categoryService.uploadProfileImage(id, file);
    return category;
  }

  @Delete('/deleteCategory/:id')
  @ResponseMessage(' Category deleted')
  @UseInterceptors(ResponseInterceptor)
  async deleteCategory(@Param('id') id: string): Promise<string> {
    const data = await this.categoryService.categoryDelete(id);
    return data;
  }
  @Get('/search')
  @UseInterceptors(MessageResponseInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async searchCustomer(@Query('name') name: string) {
    const data = await this.categoryService.searchCategory(name);

    return data;
  }
  @Get('/filter')
  @UseInterceptors(ResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async filterCustomer(@Query() query: categoryDtoFilter) {
    const data = await this.categoryService.filterCategory<typeof query>(query);
    return data;
  }
}
