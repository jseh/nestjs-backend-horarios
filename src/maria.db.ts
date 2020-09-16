import * as mariadb from 'mariadb';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MariaDB {
    private static instance: MariaDB;

    public pool: any;

    public constructor() { 

    //     this.pool = mariadb.createPool({
    //         host: 'localhost', 
    //         user:'root', 
    //         password: '',
    //         database: 'mibase',
    //         connectionLimit: 5
    //    });

    }
  
}