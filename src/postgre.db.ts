import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PostgreDB {

    public pool: any;

    public constructor() { 

        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'jsehdb',
            password: 'postgres',
            port: 5432,
        })


    }
  
}