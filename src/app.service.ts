import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MariaDB } from "./maria.db";
import { PostgreDB } from './postgre.db';
import { Alumno } from './models/modelo';
import { Model } from 'mongoose';

export interface PgResults {
  id: number,
  nombre: string
}

@Injectable()
export class AppService {

  constructor(
    private readonly db: MariaDB,
    private readonly db2: PostgreDB,
    // @InjectModel(Alumno.name) private alumnoModel: Model<Alumno>,
    // @InjectConnection('jseh') private mongoCon: Connection

    ) {}


  getHello(): string {
    return 'Hello World!';
  }

  // async probarMongo2(): Promise<any> {
  //   let datos = this.mongoCon.collection('alumnos');
  //   let n = await datos.find({}).toArray();
  //   return n;
  // }

  // async probarMongo(): Promise<Alumno> {

  //   const c = new this.alumnoModel({
  //     nombre: "Laura",
  //     edad: 23,
  //     color: "Vino",
  //   });
  //   return await c.save();
  // }

  async probarDb(): Promise<string> {

    let conn;
    let datos;
    try {
      conn = await this.db.pool.getConnection();
      datos = await conn.query("SELECT * from alumnos");
  
    } catch (err) {
      throw err;
    } finally {
      if (conn){
        conn.end();
      }   
    }
    
    return datos;
  }

  async probarPgDb(): Promise<any> {

    let conn;
    let datos;
    
    try {
      conn = await this.db2.pool.connect()
      datos = await conn.query("SELECT * from alumnos");

    } catch (err) {
      throw err;
    } finally {
      if (conn){ 
        conn.release(); 
      }
    }

    return datos;
  }

}
