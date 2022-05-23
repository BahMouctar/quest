import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLanguageInput } from './dto/createLanguageInput.dto';
import { UpdateLanguageInput } from './dto/updateLanguageInput.dto';
import { Languages } from './entities/languages.entity';

@Injectable()
export class LanguagesService {
    constructor(@InjectRepository(Languages) private readonly languagesRepository : Repository<Languages>){}


    async create(createLanguageInput : CreateLanguageInput) : Promise<Languages | undefined>{
        const language = await this.languagesRepository.create(createLanguageInput);
        return await this.languagesRepository.save(language);
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
}
