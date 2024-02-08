import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAddressDtoForExtend {
  //   @ApiProperty()
  //   user: string;
  @ApiProperty()
  type: string;

  @ApiProperty()
  is_activated: boolean;

  @IsString()
  @ApiProperty()
  country: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  zip_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address_line1?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address_line2?: string;
}
