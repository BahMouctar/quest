import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/createBookInput.dto';
import { UpdateBookInput } from './dto/updateBookInput.dto';
import { Books } from './entities/books.entity';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Books) private readonly booksRepository : Repository<Books>){}


    async create(createBookInput : CreateBookInput) : Promise<Books | undefined>{
        const book = await this.booksRepository.create(createBookInput);
        return await this.booksRepository.save(book);
    }


    async allBooks() : Promise<Books[] | undefined>{
        return await this.booksRepository.find({relations:["author"]});
    }

    async findOne(condt: Partial<Books>){
        return await this.booksRepository.find(condt);
    }

    async findById(_id:string) : Promise<Books | undefined>{
        
        const book = await this.booksRepository.findOne({_id:_id},{relations:["author"]});
        if(!book) throw new NotFoundException("Cet livre n'existe pas !");

        return book;
    }

    async update(_id:string, updateBooksInput : UpdateBookInput):Promise<Books | undefined>{

        const found_book = await this.findById(_id);
        if(!found_book){throw new NotFoundException("Cet livre n'existe pas")}

        const book = Object.assign(found_book,updateBooksInput)
       
        return await this.booksRepository.save(book)
    }

    async remove(_id:string) : Promise<Books | undefined>{
        const book = await this.findById(_id);
        const deletedbook = await this.booksRepository.remove(book);
        if(!deletedbook){throw new Error("Une erreur s'est produite")}

        book._id = _id;

        return book;
       
    }
}
