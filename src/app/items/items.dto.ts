import { ApiProperty } from '@nestjs/swagger';
import { CreateAddonDtoForExtend } from '../addon/addon.dto';
import {
  IsOptional,
  //   IsEmail,
  IsNotEmpty,
  //   IsNumber,
  IsString,
  IsDateString,
  IsArray,
  IsEnum,
  //   IsNumberString,
  //   IsOptional,
  //   IsDate,
  //   IsDateString,
  //   IsStrongPassword,
} from 'class-validator';

class addon_item {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  price: string;
}

export class itemAddonDtoForExtend {
  @IsOptional()
  @ApiProperty({ type: addon_item })
  addon: addon_item;
}

export class addon_images_dto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: any;
}

enum vegEnum {
  VEG = 'veg',
  NON_VEG = 'non_veg',
}

export class createAddonDtoForExtend {
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsOptional()
  @ApiProperty()
  price: string;

  @IsOptional()
  @ApiProperty()
  is_activated: boolean;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: any;
}
export class createItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  itemName: string;

  @IsString()
  @ApiProperty()
  menu: string;

  @IsString()
  @ApiProperty()
  category: string;

  @IsOptional()
  @ApiProperty()
  mode: string;

  @IsString()
  @ApiProperty()
  status: string;

  @IsString()
  @ApiProperty()
  itemDsc: string;

  // @IsString()
  // @ApiProperty()
  // note: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  avatar: any;

  @IsString()
  @ApiProperty()
  quantity: string;

  // @IsString()
  // @ApiProperty()
  // subject: string;

  @ApiProperty()
  @IsString()
  price: string;

  // @ApiProperty()
  // @IsOptional()
  // vegetarian_type: string;

  // @IsString()
  // @ApiProperty()
  // @IsString()
  // admin_note: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(vegEnum)
  vegetarian_type: string;

  @ApiProperty()
  is_activated?: boolean;

  // @IsOptional()
  // @ApiProperty({ type: createAddonDtoForExtend })
  // readonly addon: createAddonDtoForExtend[];
  @IsOptional()
  @ApiProperty({ type: [itemAddonDtoForExtend], required: false })
  addon: itemAddonDtoForExtend[];

  @IsOptional()
  @IsArray()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  addon_images: any;
  // }
}

//   @IsOptional()
//   @ApiProperty({ type: [itemAddonDtoForExtend], required: false })
//   readonly addon: itemAddonDtoForExtend[];

//   @IsOptional()
//   @IsArray()
//   @ApiProperty({ type: 'string', format: 'binary', required: false })
//   addon_images: any;
// }

export class ItemUpdatedDto {
  @IsString()
  @ApiProperty()
  itemName?: string;

  @IsString()
  @ApiProperty()
  itemDsc?: string;

  @IsString()
  @ApiProperty()
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(vegEnum)
  vegetarian_type: string;

  @ApiProperty()
  @IsString()
  price?: string;
  @ApiProperty()
  @IsString()
  note?: string;

  @ApiProperty()
  @IsString()
  admin_note?: string;

  @ApiProperty()
  is_activated?: boolean;
}
enum OrderEnum {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}
export class PagingQueryDto {
  @ApiProperty()
  page_no: number;
  @ApiProperty()
  page_size: number;
}
export class itemDtoFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  // @IsBooleanString()
  is_active: string;

  @IsOptional()
  @ApiProperty({ required: false })
  // @IsBooleanString()
  is_inactive: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDateString()
  date_from: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDateString()
  date_to: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsEnum(OrderEnum)
  sort_order: string;
}
export class itemUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: any;
}
