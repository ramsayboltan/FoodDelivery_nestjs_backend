import { Module, Logger, Global } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { subCategory, subCategorySchema } from '../../models/subcategory.Schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: subCategory.name, schema: subCategorySchema }])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, Logger],
  exports: [SubCategoryService],
})
export class SubCategoryModule {}
