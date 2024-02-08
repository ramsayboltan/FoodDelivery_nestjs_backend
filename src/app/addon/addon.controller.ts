import {
  Controller,
  Logger,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseInterceptors,
  Param,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateAddonDto, addonFilterDto, PagingQueryDto, updateAddonDto } from './addon.dto';
import { AddonService } from './addon.service';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from 'src/helpers/decorators/response.message';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { multerDiskUploader } from '@app/utils/multer';
import { documenteFileType } from '@app/helpers/types/addon';
import { pagingQueryType } from '@app/helpers/types/common';

const category_filefield_payload = [{ name: 'image', maxCount: 1 }];
const UPLOAD_DIR = join(process.cwd(), 'assets/images');
const files_upload_midd = { storage: multerDiskUploader(UPLOAD_DIR) };

@ApiTags('addon')
// import { Controller } from '@nestjs/common';

@Controller('addon')
export class AddonController {
  constructor(private addonService: AddonService) {}
  //   Controller,
  //   Logger,
  //   Get,
  //   Post,
  //   Body,
  //   Put,
  //   Delete,
  //   Query,
  //   UseInterceptors,
  //   Param,
  //   UploadedFiles,
  // } from '@nestjs/common';
  // import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
  // import { createAddonDto} from './addon.dto';
  // import { AddonService } from './addon.service';
  // import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
  // import { ResponseMessage } from 'src/helpers/decorators/response.message';
  // import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
  // import { join } from 'path';
  // import { multerDiskUploader } from '@app/utils/multer';
  // import { documenteFileType } from '@app/helpers/types/addon';
  // import { pagingQueryType } from '@app/helpers/types/common';

  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @ResponseMessage('addon created')
  @UseInterceptors(ResponseInterceptor)
  @UseInterceptors(FileFieldsInterceptor(category_filefield_payload, files_upload_midd))
  async createAddon(@UploadedFiles() files: documenteFileType, @Body() model: CreateAddonDto) {
    const addon = await this.addonService.createAddon(files, model);
    return addon;
  }

  @Get('/getAll/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('addon fetched.')
  async getAllAddon(@Param('id') id: string, @Query() query: PagingQueryDto) {
    return this.addonService.getAllAddon(id, query);
  }

  // const category_filefield_payload = [{ name: 'image', maxCount: 1 }];
  // const UPLOAD_DIR = join(process.cwd(), 'assets/images');
  // const files_upload_midd = { storage: multerDiskUploader(UPLOAD_DIR) };

  // @ApiTags('addon')
  // @Controller('addon')
  // export class AddonController {
  //   private readonly logger = new Logger(AddonController.name);
  //   constructor(private addonService: AddonService) {}

  //   @Post('/create')
  //   @ApiConsumes('multipart/form-data')
  //   @ResponseMessage('addon created')
  //   @UseInterceptors(ResponseInterceptor)
  //   @UseInterceptors(FileFieldsInterceptor(category_filefield_payload, files_upload_midd))
  //   async createAddon(@UploadedFiles() files: documenteFileType, @Body() model: createAddonDto) {
  //     const addon = await this.addonService.createAddon(files, model);
  //     return addon;
  //   }

  //   @Get('/getAll')
  //   @UseInterceptors(ResponseInterceptor)
  //   @ResponseMessage('addon fetched.')
  //   async getAllAddon(@Query() query: PagingAddonDto) {
  //     this.logger.log('[getall: addon');
  //     return this.addonService.getAllAddon(query);
  //   }

  @Delete('/delete/:id')
  @ResponseMessage('addon deleted')
  @UseInterceptors(ResponseInterceptor)
  async deleteAddon(@Param('id') id: string) {
    const addon = await this.addonService.deleteAddon(id);
    return addon;
  }
  @Get('/search')
  @UseInterceptors(ResponseInterceptor)
  async searchCustomer(@Query('name') name: string) {
    const data = await this.addonService.searchAddon(name);
    return data;
  }
  @Get('/filter')
  @UseInterceptors(ResponseInterceptor)
  async filterCustomer(@Query() query: addonFilterDto) {
    const data = await this.addonService.filterAddon<typeof query>(query);
    return data;
  }
}
//   @Get('/getById/:id')
//   @ResponseMessage('addon fetched')
//   @UseInterceptors(ResponseInterceptor)
//   async getByIdAddon(@Param('id') id: string) {
//     const addon = await this.addonService.getByIdAddon(id);
//     return addon;
//   }

//   @Put('/update/:id')
//   @ResponseMessage('addon updated')
//   @UseInterceptors(ResponseInterceptor)
//   async updateAddon(@Param('id') id: string, @Body() model: updateAddonDto) {
//     const addon = await this.addonService.updateAddon(id, model);
//     return addon;
//   }

//   @Delete('/delete/:id')
//   @ResponseMessage('addon deleted')
//   @UseInterceptors(ResponseInterceptor)
//   async deleteAddon(@Param('id') id: string) {
//     const addon = await this.addonService.deleteAddon(id);
//     return addon;
//   }
// }
