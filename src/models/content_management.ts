import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class ContentManagement {
  @Prop(
    raw({
      banner1: { type: String, required: false },
      banner2: { type: String, required: false },
      banner3: { type: String, required: false },
      banner4: { type: String, required: false },
    }),
  )
  banners: Record<string, any>;
  @Prop({ required: true, default: true })
  is_activated: boolean;

  @Prop({ required: true, default: false })
  is_deleted: boolean;
}

export type ContentManagementType = mongoose.HydratedDocument<ContentManagement>;
export const ContentManagementSchema = SchemaFactory.createForClass(ContentManagement);
