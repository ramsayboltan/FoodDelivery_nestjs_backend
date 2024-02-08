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
import { UsersService } from './users.service';
import { ApiTags, ApiHeader, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { createUserDto, PagingQueryDto, LoginModel, UserUpdateDto, fileUploadDto } from './users.dto';
import { TokenAuthGuard } from 'src/helpers/guards/auth.guard';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from 'src/helpers/decorators/response.message';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
@ApiTags('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private userService: UsersService, // private readonly logger: Logger,
  ) {}

  @Post('/create')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('user created.')
  createUser(@Body() model: createUserDto) {
    console.log(model);
    return this.userService.createUser(model);
  }

  @Get('/getall/:id')
  @UseGuards(TokenAuthGuard)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  @ResponseMessage('users fetched.')
  @UseInterceptors(ResponseInterceptor)
  getAllUser(@Param('id') id: string, @Query() query: PagingQueryDto) {
    this.logger.log('[getall:user]');
    return this.userService.getAllUser(id, query);
  }

  @Post('/login')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('login successfully.')
  login(@Body() model: LoginModel) {
    return this.userService.login(model);
  }

  @Get('/getById/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('fetched successfully.')
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async getById(@Param('id') userId: string) {
    const user = await this.userService.getByIdUser(userId);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Delete('/remove/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(MessageResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  async softDelete(@Param('id') userId: string): Promise<string> {
    const user = this.userService.softDelete(userId);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return 'user removed';
  }

  @Put('/update/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('user updated.')
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  updateUser(@Param('id') userId: string, @Body() model: UserUpdateDto) {
    return this.userService.updateUser<string>(userId, model);
  }

  // upload file
  @Put('/uploadProfile/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @UseInterceptors(MessageResponseInterceptor)
  @ApiHeader({
    name: 'x-access-token',
    description: 'Please enter access token',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'please upload image here',
    type: fileUploadDto,
  })
  uploadProfileImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadProfileImage(id, file);
  }
}
