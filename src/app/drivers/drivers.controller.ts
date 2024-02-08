import { Controller, Post, Get, Body, UseInterceptors, Query, Param, Put, Delete, UploadedFiles } from '@nestjs/common';
import { ApiTags, ApiHeader, ApiConsumes, ApiBody } from '@nestjs/swagger';
import {
  createDriverDto,
  updateDriverDto,
  DriverFileUploadDto,
  PagingQueryDto,
  driverAddressUpdateDto,
  driverFilterDto,
} from './drivers.dto';
import { DriversService } from './drivers.service';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from 'src/helpers/decorators/response.message';
import { toDriver as driverMapperModel, toSearchDriver } from 'src/mappers/driver';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { filterType } from '@app/helpers/types/driver';
import { join } from 'path';
import { multerDiskUploader } from '@app/utils/multer';
import { toSearchModel } from '@app/mappers/customer';
import { uploadProfileImage } from 'src/helpers/types/driver';

const driver_filefields_payload = [
  { name: 'rc_image', maxCount: 1 },
  { name: 'govt_id_image', maxCount: 1 },
  { name: 'liscense_image', maxCount: 1 },
  { name: 'verified_picture', maxCount: 1 },
];

const UPLOAD_DIR = join(process.cwd(), 'assets/images');
const files_upload_midd = { storage: multerDiskUploader(UPLOAD_DIR) };

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private driverService: DriversService) {}

  //* driver crete
  @Post('/create')
  @ApiBody({ type: createDriverDto })
  @ApiConsumes('multipart/form-data')
  @ResponseMessage('driver created')
  @UseInterceptors(ResponseInterceptor)
  @UseInterceptors(FileFieldsInterceptor(driver_filefields_payload, files_upload_midd))
  async createDriver(@UploadedFiles() files: filterType, @Body() body: createDriverDto) {
    const driver = await this.driverService.createDriver(files, body);
    return driver;
  }

  // search api
  @Get('/search')
  @UseInterceptors(ResponseInterceptor)
  async searchDriver(@Query('searchValue') searchValue: string) {
    const data = await this.driverService.searchDriver(searchValue);
    return toSearchDriver(data as any);
  }
  //* driver getall
  //* driver getall
  @Get('/getall/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('driver fetched')
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async getAllDriver(@Param('id') id: string, @Query() query: PagingQueryDto) {
    const driver = await this.driverService.getAllDrivers(id, query);
    return driver;
  }
  // driver getBYID
  @Get('/getById/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('diver fetched')
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async getByIdDriver(@Param('id') id: string) {
    const driver = await this.driverService.getByIdDriver(id);
    return driverMapperModel(driver);
  }
  // driver update api
  // @Put('/updateDriver/:id')
  // @UseInterceptors(MessageResponseInterceptor)
  // @ApiHeader({
  //   name: 'x-access-token',
  //   description: 'Please enter access token',
  // })
  // async updateDriver(@Param('id') id: string, @Body() model: updateDriverDto) {
  //   const driver = await this.driverService.updateDriver(id, model);
  //   return driver;
  // }
  // @Put('/updateDriver/:id')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileFieldsInterceptor(driver_filefields_payload, files_upload_midd))
  // @UseInterceptors(MessageResponseInterceptor)
  // @ApiHeader({
  //   name: 'x-access-token',
  //   description: 'Please enter access token',
  // })
  // async updateDriver(
  //   @Param('id') id: string,
  //   @UploadedFiles() files: documentFileType,
  //   @Body() model: updateDriverDto,
  // ) {
  //   const driver = await this.driverService.updateDriver(id, files, model);
  //   return driver;
  // }
  @Put('/updateDriver/:id')
  @UseInterceptors(MessageResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async updateDriver(@Param('id') id: string, @Body() model: updateDriverDto) {
    const driver = await this.driverService.updateDriver(id, model);
    return driver;
  }

  @Delete('/deleteDriver/:id')
  @UseInterceptors(MessageResponseInterceptor)
  async deleteDriver(@Param('id') id: string): Promise<string> {
    const driver = await this.driverService.deleteDriver<string>(id);
    return driver;
  }
  // @UseInterceptors(FileInterceptor('avatar', files_upload_midd))
  @Put('/uploadProfiley/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: DriverFileUploadDto })
  @UseInterceptors(MessageResponseInterceptor)
  @UseInterceptors(FileFieldsInterceptor(driver_filefields_payload, files_upload_midd))
  driverUploadProfile(@Param('id') id: string, @UploadedFiles() files: DriverFileUploadDto): Promise<string> {
    // console.log('file', files);
    return this.driverService.uploadProfileImage(id, files);
  }

  // filter api
  @Get('/filter')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('diver fetched')
  async driverFilter(@Query() query: driverFilterDto) {
    const data = await this.driverService.driverFilter<typeof query>(query);
    return toSearchDriver(data as any[]);
  }
}
