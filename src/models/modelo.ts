
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Alumno extends Document {
  // herada de Document una propiedad statica llamada name

  @Prop()
  nombre: string;

  @Prop()
  edad: number;

  @Prop()
  color: string;
}

export const AlumnoSchema = SchemaFactory.createForClass(Alumno);