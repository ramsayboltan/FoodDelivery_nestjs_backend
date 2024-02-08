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
import { ContentManagementService } from './content_management.service';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from 'src/helpers/decorators/response.message';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { multerDiskUploader } from '@app/utils/multer';
import { documentesFileType, pagingQueryType } from '@app/helpers/types/content';
import { createUploadProfileDto } from './content_management.dto';
import { PagingQueryDto } from './content_management.dto';

const content_filefield_payload = [
  { name: 'banner1', maxCount: 1 },
  { name: 'banner2', maxCount: 1 },
  { name: 'banner3', maxCount: 1 },
  { name: 'banner4', maxCount: 1 },
];
const UPLOAD_DIR = join(process.cwd(), 'assets/images');
const files_upload_midd = { storage: multerDiskUploader(UPLOAD_DIR) };

@ApiTags('content_Management')
@Controller('content-management')
export class ContentManagementController {
  private readonly logger = new Logger(ContentManagementController.name);
  constructor(private contentService: ContentManagementService) {}

  @Post('/create')
  // @ApiBody({ type: createCategoryDto })
  @ApiConsumes('multipart/form-data')
  @ResponseMessage('category created')
  @ApiBody({ type: createUploadProfileDto })
  @UseInterceptors(MessageResponseInterceptor)
  @UseInterceptors(FileFieldsInterceptor(content_filefield_payload, files_upload_midd))
  async createContentBanner(@UploadedFiles() files: createUploadProfileDto) {
    const category = await this.contentService.createUploadProfilebanner(files);
    return category;
  }
  // @UseInterceptors(FileInterceptor('avatar', files_upload_midd))
  @Put('/uploadProfiley/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: createUploadProfileDto })
  @UseInterceptors(MessageResponseInterceptor)
  @UseInterceptors(FileFieldsInterceptor(content_filefield_payload, files_upload_midd))
  driverUploadProfile(@Param('id') id: string, @UploadedFiles() files: createUploadProfileDto): Promise<string> {
    // console.log('file', files);
    return this.contentService.uploadProfileImage(id, files);
  }
  @Get('/getall')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('content fetched.')
  async getAll(@Query() query: PagingQueryDto) {
    this.logger.log('[getall: ContentManagement');
    const data = await this.contentService.getAll(query);
    return data;
  }
  @Get('/getById/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('content fetched')
  async getByIdCategory(@Param('id') id: string) {
    const content = await this.contentService.getByIdcontent(id);
    return content;
  }
  @Delete('/delete/:id')
  @UseInterceptors(MessageResponseInterceptor)
  async deleteContent(@Param('id') id: string) {
    const data = await this.contentService.deleteContent(id);
    return data;
  }
}
