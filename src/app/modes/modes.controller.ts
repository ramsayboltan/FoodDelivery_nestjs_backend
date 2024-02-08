import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Logger,
  Param,
  Put,
  Delete,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ModesService } from './modes.service';
import { ApiTags } from '@nestjs/swagger';
import { createModeDto, PagingQueryDto, ModeUpdateDto } from './modes.dto';
import {
  MessageResponseInterceptor,
  ResponseInterceptor,
  // MessageResponseInterceptor,
} from 'src/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from 'src/helpers/decorators/response.message';

@Controller('modes')
@ApiTags('modes')
export class ModesController {
  private readonly logger = new Logger(ModesController.name);

  constructor(private modeService: ModesService) {}

  @Post('/create')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('mode created.')
  createMode(@Body() model: createModeDto) {
    return this.modeService.createMode(model);
  }

  @Get('/getall')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('mode fetched.')
  async getAllMode(@Query() query: PagingQueryDto) {
    this.logger.log('[getAll: mode');
    const mode = await this.modeService.getAllMode(query);
    return mode;
  }

  @Get('/getById/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('mode fetched')
  async getById(@Param('id') id: string) {
    const mode = await this.modeService.getById(id);
    if (!mode) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return mode;
  }

  @Put('/updateMode/:id')
  @UseInterceptors(MessageResponseInterceptor)
  async updateMode(@Param('id') id: string, @Body() model: ModeUpdateDto) {
    const updatedMode = await this.modeService.updateMode(id, model);
    return updatedMode;
  }
  @Delete('/deleteMode/:id')
  @UseInterceptors(MessageResponseInterceptor)
  async deleteMode(@Param('id') id: string): Promise<string> {
    const mode = await this.modeService.DeleteMode(id);
    if (!mode) {
      throw new HttpException('mode not found', HttpStatus.BAD_REQUEST);
    }
    return 'mode removed';
  }
}
