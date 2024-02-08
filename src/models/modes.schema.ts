import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
@Schema()
export class Mode {
  @Prop()
  name: string;

  @Prop()
  display_name: string;

  @Prop()
  description: string;

  @Prop(
    raw({
      platform: { type: String },
      os: { type: String },
      browser: { type: String },
      ip: { type: String },
    }),
  )
  metadata: Record<string, any>;

  @Prop({ required: false, default: false })
  is_activated: boolean;

  @Prop()
  note: string;

  @Prop()
  admin_note: string;

  @Prop({ required: false, default: false })
  is_deleted: boolean;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}

export type ModeschemaType = HydratedDocument<Mode>;
export const ModeSchema = SchemaFactory.createForClass(Mode);
