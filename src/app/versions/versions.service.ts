import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVersionInput } from './dto/createVersionInput.dto';
import { UpdateVersionInput } from './dto/updateVersionInput.dto';
import { Versions } from './entities/versions.entity';

@Injectable()
export class VersionsService {
    constructor(@InjectRepository(Versions) private readonly versionsRepository : Repository<Versions>){}


    async create(createVersionInput : CreateVersionInput) : Promise<Versions | undefined>{
        const version = await this.versionsRepository.create(createVersionInput);
        return await this.versionsRepository.save(version);
    }

    async allVersions() : Promise<Versions[] | undefined>{
        return await this.versionsRepository.find({relations:["language"]});
    }

    async findOne(condt: Partial<Versions>){
        return await this.versionsRepository.find(condt);
    }

    async findById(_id:string) : Promise<Versions | undefined>{
        
        const version = await this.versionsRepository.findOne({_id:_id},{relations:["language"]});
        if(!version) throw new NotFoundException("Cette version n'existe pas !");

        return version;
    }

    async update(_id:string, updateVersionsInput : UpdateVersionInput):Promise<Versions | undefined>{

        const found_version = await this.findById(_id);
        if(!found_version){throw new NotFoundException("Cette version n'existe pas")}

        const version = Object.assign(found_version,updateVersionsInput)
       
        return await this.versionsRepository.save(version)
    }

    async remove(_id:string) : Promise<Versions | undefined>{
        const version = await this.findById(_id);
        const deletedversion = await this.versionsRepository.remove(version);
        if(!deletedversion){throw new Error("Une erreur s'est produite")}

        version._id = _id;

        return version;
       
    }
}
