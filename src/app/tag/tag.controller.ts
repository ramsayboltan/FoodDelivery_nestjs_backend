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
  HttpException,
  HttpStatus,
  Delete,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags, ApiHeader, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { PagingQueryDto, tagFilterDto, TagUpdateDto, createTagDto } from './tag.dto';
import { TokenAuthGuard } from 'src/helpers/guards/auth.guard';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from 'src/helpers/decorators/response.message';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('Tags')
@ApiTags('Tags')
export class TagController {
  private readonly logger = new Logger(TagController.name);

  constructor(
    private tagService: TagService, // private readonly logger: Logger,
  ) {}

  @Post('/create')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('user created.')
  createUser(@Body() model: createTagDto) {
    console.log(model);
    return this.tagService.createtag(model);
  }

  @Get('/getall/:id')
  // @UseGuards(TokenAuthGuard)
  // @ApiHeader({
  //     name: 'x-access-token',
  //     description: 'Please enter access token',
  // })
  @ResponseMessage('tags fetched.')
  @UseInterceptors(ResponseInterceptor)
  getAllTag(@Param('id') id: string, @Query() query: PagingQueryDto) {
    return this.tagService.getAlltag(id, query);
  }

  @Delete('/remove/:id')
  // @UseGuards(TokenAuthGuard)
  @UseInterceptors(MessageResponseInterceptor)
  // @ApiHeader({
  //     name: 'x-access-token',
  //     description: 'Please enter access token',
  // })
  async softDelete(@Param('id') tagId: string): Promise<string> {
    const tag = this.tagService.softDelete(tagId);
    if (!tag) {
      throw new HttpException('tag not found', HttpStatus.BAD_REQUEST);
    }
    return 'tag removed';
  }

  @Put('/update/:id')
  // @UseGuards(TokenAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('tag updated.')
  // @ApiHeader({
  //   name: 'x-access-token',
  //   description: 'Please enter access token',
  // })
  updateUser(@Param('id') userId: string, @Body() model: TagUpdateDto) {
    return this.tagService.updateUser<string>(userId, model);
  }
  @Get('/search')
  @UseInterceptors(ResponseInterceptor)
  @UseInterceptors(MessageResponseInterceptor)
  async searchCustomer(@Query('name') name: string) {
    const data = await this.tagService.searchTag(name);
    return data;
  }
  @Get('/filter')
  @UseInterceptors(ResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async filterCustomer(@Query() query: tagFilterDto) {
    const data = await this.tagService.filterTag<typeof query>(query);
    return data;
  }
}
