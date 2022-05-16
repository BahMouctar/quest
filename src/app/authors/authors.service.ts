import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorsInput } from './dto/createAuthorsInput.dto';
import { UpdateAuthorsInput } from './dto/updateAuthorsInput.dto';
import { Authors } from './entities/authors.entity';

@Injectable()
export class AuthorsService {
    constructor(@InjectRepository(Authors) private readonly authorsRepository : Repository<Authors>){}

    async create(createAuthorInput:CreateAuthorsInput) :  Promise<Authors | undefined>{
        const authors = await  this.authorsRepository.create(createAuthorInput);
        return await this.authorsRepository.save(authors);
    }

    async allAuthors() : Promise<Authors[] | undefined>{
        return await this.authorsRepository.find({relations:["books"]});
    }

    async findOne(condt: Partial<Authors>){
        return await this.authorsRepository.find(condt);
    }

    async findById(_id:string) : Promise<Authors | undefined>{
        
        const author = await this.authorsRepository.findOne({_id:_id},{relations:["books"]});
        if(!author) throw new NotFoundException("Cet autheur n'existe pas !");

        return author;
    }

    async update(_id:string, updateAuthorsInput:UpdateAuthorsInput):Promise<Authors | undefined>{

        const found_author = await this.findById(_id);
        if(!found_author){throw new NotFoundException("Cet utilisateur n'existe pas")}

        const author = Object.assign(found_author,updateAuthorsInput)
       
        return await this.authorsRepository.save(author)
    }

    async remove(_id:string) : Promise<Authors | undefined>{
        const author = await this.findById(_id);
        const deletedAuthor = await this.authorsRepository.remove(author);
        if(!deletedAuthor){throw new Error("Une erreur s'est produite")}

        author._id = _id;

        return author;
       
    }
}
