import { Controller, Get,Post, UseGuards, Request, UseInterceptors, UploadedFiles, UploadedFile, Param } from '@nestjs/common';
import { AppService, PgResults } from './app.service';
import { Alumno } from './models/modelo';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Claims } from './decorators/claims.decorator';
import { ClaimsGuard } from './guards/claims.guard';
import { AuthService } from './services/auth.service';

import { FilesInterceptor, FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { extname } from 'path';



const pngFileFilter = (req, file, callback) => {

  let ext = path.extname(file.originalname);

  if(ext !== '.png'){
      req.fileValidationError = 'Invalid file type';
      return callback(new Error('Invalid file type'), false);
  }

  return callback(null, true);

}



@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }



  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadPrueba(@UploadedFile() file) {
    console.log(file);
    return { id: '1', name: file.originalname };
  }


  
  @Post('/subir/archivo')
  @UseInterceptors(FileInterceptor('upload_file'))
  subidaUnSoloArchivo(@UploadedFile() file) {
    console.log(file);
    return { id: '1', name: file.originalname };
  }

  @Post('/subir/archivos')
  @UseInterceptors(FilesInterceptor('files'))
  subidaMultiplesArchivos(@UploadedFiles() files) {
    console.log(files);
  }

  @Post('/subir/archivos2')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ]))
  subidaMultiplesArchivos2(@UploadedFiles() files) {
    console.log(files);
  }








  @Post('/login/')
  async login(username: string, password: string) {

    return await this.authService.login(username, password);

  }

  @Claims('soloAdmins','soloJseh') // claims que seran evaluados por el claims guard
  @UseGuards(JwtAuthGuard, ClaimsGuard)
  @Get('/protegido')
  protegido(@Request() req): string {
    console.log(req.user);
    return 'ok';
  }

  @Get('/ws')
  websockets(): string {
    return 'ok';
  }

  // @Get('/db4')
  // async probarmongocon(): Promise<any> {
  //   return await this.appService.probarMongo2();
  // }

  // @Get('/db3')
  // async pruebadbmongo(): Promise<any> {
  //   return await this.appService.probarMongo();
  // }

  @Get('/db')
  async pruebadb(): Promise<any> {
    let data = await this.appService.probarDb();
    return data;
  }

  @Get('/db2')
  async pruebadb2(): Promise<any> {

    let data = await this.appService.probarPgDb();
    
    for(let r of data.rows){
      console.log(r);
    }
    return data.rows;
  }

}
