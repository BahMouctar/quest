import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeInput } from './dto/createTypeInput.dto';
import { UpdateTypeInput } from './dto/updateTypeInput.dto';
import { Types } from './entities/types.entity';

@Injectable()
export class TypesService {
    constructor(@InjectRepository(Types) private readonly typesRepository : Repository<Types>){}


    async create(createTypeInput : CreateTypeInput) : Promise<Types | undefined>{
        const type = await this.typesRepository.create(createTypeInput);
        return await this.typesRepository.save(type);
    }


    async allTypes() : Promise<Types[] | undefined>{
        return await this.typesRepository.find({relations:["inputs"]});
    }

    async findOne(condt: Partial<Types>){
        return await this.typesRepository.find(condt);
    }

    async findById(_id:string) : Promise<Types | undefined>{
        
        const type = await this.typesRepository.findOne({_id:_id},{relations:["inputs"]});
        if(!type) throw new NotFoundException("Ce type n'existe pas !");

        return type;
    }

    async update(_id:string, updateTypesInput : UpdateTypeInput):Promise<Types | undefined>{

        const found_type = await this.findById(_id);
        if(!found_type){throw new NotFoundException("Ce type n'existe pas")}

        const type = Object.assign(found_type,updateTypesInput)
       
        return await this.typesRepository.save(type)
    }

    async remove(_id:string) : Promise<Types | undefined>{
        const type = await this.findById(_id);
        const deletedtype = await this.typesRepository.remove(type);
        if(!deletedtype){throw new Error("Une erreur s'est produite")}

        type._id = _id;

        return type;
       
    }
}
