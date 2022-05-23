import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { validate, Validator, isDate, isDefined } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';


export function IsDate(valeur): boolean {    
    const Dt = new Date(valeur);
    const validator = new Validator();
    return isDate(Dt);
}

export async function Validate(metatype, valeur){
    const object = plainToClass(metatype, valeur);
    const errors:any = await validate(object);
    if (errors.length > 0) {
        throw new HttpException({
            status:{ code : HttpStatus.BAD_REQUEST, error:"Les paramètres de la requète sont incorrectes" , message : errors }
            },HttpStatus.BAD_REQUEST);
    }
    return object;
}

export async function ValidateForeignKey<T>(args: object, key: string , object: object, U?: { new(): T; } ):Promise<T> {
    const repository = getRepository(U);
    const data = await repository.findOne(args);
    const validator = new Validator();
    if(!isDefined(data)){
        throw new HttpException({
            status :{ code : HttpStatus.BAD_REQUEST, error:"Les paramètres de la requète sont incorrectes",
            message : [{
                target :object, valeur: args, property: key,
                constraints : {
                    isForeignKey : `${key} doit être une clé étrangère de ${U.name}`
                }
            }] }
        },HttpStatus.BAD_REQUEST);
    }
    return data;
}

export function ValidatePrimaryKey(objectValeur : object,ModelKey : Array<string>) : boolean{
    let state  = true;
    ModelKey.forEach(function(key){
        if(!(key in objectValeur)) { state = false;  }
    })
    return state;
}
