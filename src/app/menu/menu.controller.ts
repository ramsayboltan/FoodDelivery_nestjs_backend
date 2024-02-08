import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Logger,
  UseInterceptors,
  Query,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { createMenuDto, updateMenuDto, PagingQueryDto } from './menu.dto';
import { MenuService } from './menu.service';
import { ResponseInterceptor, MessageResponseInterceptor } from 'src/helpers/interceptors/respone.interceptor';
import { ResponseMessage } from 'src/helpers/decorators/response.message';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  private readonly logger = new Logger(MenuController.name);
  constructor(private menuService: MenuService) {}

  @Post('/create')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('menu created')
  async createMenu(@Body() body: createMenuDto) {
    const menu = await this.menuService.createMenu(body);
    return menu;
  }

  @Get('/getAll/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('menu fetched')
  async getAllMenu(@Param('id') id: string, @Query() query: PagingQueryDto) {
    this.logger.log('[getall: Menu ]');
    return this.menuService.getAllMenu(id, query);
  }

  @Get('/getById/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('menu fetched')
  async getByIdMenu(@Param('id') id: string) {
    const menu = await this.menuService.getByIdMenu(id);
    return menu;
  }

  @Put('/update/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('updated menu')
  async updateMenu(@Param('id') id: string, @Body() model: updateMenuDto) {
    const menu = await this.menuService.updateMenu(id, model);
    return menu;
  }

  @Delete('/delete/:id')
  @UseInterceptors(ResponseInterceptor)
  @ResponseMessage('deleted menu')
  async deleteMenu(@Param('id') id: string) {
    const menu = await this.menuService.deleteMenu(id);
    return menu;
  }
}
