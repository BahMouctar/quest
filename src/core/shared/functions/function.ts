import { applyDecorators } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";

//GET GENERATED NUMBER
export const getCode =()=>{
    return (Math.random().toString(36).substr(2, 9)).toUpperCase();
}

//GET CREATE FOLDER
export const newFolder =(dir)=>{
    if (!existsSync(dir)){
        mkdirSync(dir, {recursive: true});
    }
    return dir;
}

//Utilitaire
export const  generateCode = (code: string, type: string)=> {
    const month = (new Date().getMonth() + 1);
    const year = new Date().getFullYear();
    const _mont = month.toString();
    const _entity = 'VEH';
    const _val = code.concat(type, _entity);
    const result_ = _val + month + year;
    return result_
}


//Méthode pour retourner le premier objet(1)
export const first = (response: any) => {
    return response.length > 0 ? response[0] : null ;
}
//Méthode pour retourner un objet(2)
export const results = (response: any) => {
    return response;
}
