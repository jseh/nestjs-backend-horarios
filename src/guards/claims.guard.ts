
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

function matchRoles(claimsRequeridos, claimsEnToken){

  for (let c of claimsRequeridos) {
    if(!claimsEnToken.includes(c)){
      return false;
    }
  }

  return true;
}


@Injectable()
export class ClaimsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const claims = this.reflector.get<string[]>('claims', context.getHandler());
    if (!claims) { // si la ruta no tiene claims que evaluar, dejalos pasar
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    
    // return true;
    const tokenDecoded = request.user.tokenDecoded;
    return matchRoles(claims, tokenDecoded.claims);
  
  }
}