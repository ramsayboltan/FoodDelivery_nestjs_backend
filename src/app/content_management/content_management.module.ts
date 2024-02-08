import { Module } from '@nestjs/common';
import { ContentManagementController } from './content_management.controller';
import { ContentManagementService } from './content_management.service';
import { ContentManagement, ContentManagementSchema } from '../../models/content_management';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: ContentManagement.name, schema: ContentManagementSchema }])],
  controllers: [ContentManagementController],
  providers: [ContentManagementService],
  exports: [ContentManagementService],
})
export class ContentManagementModule {}
