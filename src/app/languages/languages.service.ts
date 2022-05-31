import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateLanguageInput } from './dto/createLanguageInput.dto';
import { UpdateLanguageInput } from './dto/updateLanguageInput.dto';
import { Languages } from './entities/languages.entity';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';

@Injectable()
export class LanguagesService {
    constructor(@InjectRepository(Languages) private readonly languagesRepository : Repository<Languages>){}


    async create(createLanguageInput : CreateLanguageInput) : Promise<Languages | undefined>{
        try{
            const language = await this.languagesRepository.create(createLanguageInput);
            return await this.languagesRepository.save(language);
        }catch(err){
            return Promise.reject(null);
        }
    }


    async allLanguages() : Promise<Languages[] | undefined>{
        return await this.languagesRepository.find({relations:["quest","versions","questSubjectLanguages"]});
    }

    async findOne(condt: Partial<Languages>){
        return await this.languagesRepository.find(condt);
    }

    async findById(_id:string) : Promise<Languages | undefined>{
        
        const language = await this.languagesRepository.findOne({_id:_id},{relations:["quest","versions","questSubjectLanguages"]});
        if(!language) throw new NotFoundException("Ce langage n'existe pas !");

        return language;
    }

    async update(_id:string, updateLanguagesInput : UpdateLanguageInput):Promise<Languages | undefined>{

        const found_language = await this.findById(_id);
        if(!found_language){throw new NotFoundException("Ce langage n'existe pas")}

        const language = Object.assign(found_language,updateLanguagesInput)
       
        return await this.languagesRepository.save(language)
    }

    async remove(_id:string) : Promise<Languages | undefined>{
        const language = await this.findById(_id);
        const deletedlanguage = await this.languagesRepository.remove(language);
        if(!deletedlanguage){throw new Error("Une erreur s'est produite")}

        language._id = _id;

        return language;
       
    }

    async save(language: Object): Promise<any>{
        try{
            return await this.languagesRepository.save(language as Languages);
        }
        catch(err){
            return Promise.reject(null);
        }
    }
    
    async updateLanguage(language: Object, primaryKey: string): Promise<any>{
        try{
            const response: any = await this.findByIdLanguage(primaryKey);
            return await this.languagesRepository.save({ ...response.data, ...language });
        }catch(err){
            return Promise.resolve(null);
        }
    }
    
    async delete(primaryKey: string): Promise<any>{
        try{
            return await this.languagesRepository.softDelete(primaryKey);
        }catch(err){
            return Promise.resolve(null);
        }
    }

    async findAll(query: Object): Promise<any> {
       return await this.languagesRepository.find(TypeOrmHttpParamQuery(query));
    }

    async findByIdLanguage(primaryKey: string): Promise<any> {
       return  await this.languagesRepository.findOne(primaryKey,{where:{deleted_at:IsNull()}, relations: ["quest","versions","questSubjectLanguages"] });
    }
}
