import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/createBookInput.dto';
import { UpdateBookInput } from './dto/updateBookInput.dto';
import { Books } from './entities/books.entity';

@Resolver( of => Books )
export class BooksResolver {

    constructor(private readonly booksService : BooksService){}

    @Query(of => [Books],{name:"books"})
    async books(){
        return await this.booksService.allBooks();
    }

    @Query(of => Books,{name:"findBookById"})
    async findById(@Args('_id') _id : string){
        return await this.booksService.findById(_id);
    }

    @Mutation(of  => Books,{name:"crateBook"})
    async create(@Args("createBooksInput") createBooksInput : CreateBookInput){
        return await this.booksService.create(createBooksInput)
    }

    @Mutation(of => Books,{name:"updateBook"})
    async update(
        @Args("_id") _id :string,
        @Args("updateBooksInput") updateBooksInput:UpdateBookInput){
        return await this.booksService.update(_id,updateBooksInput)
    }

    @Mutation( of => Books,{name:"remove"} )
    async remove(@Args("_id") _id :string){
        return await this.booksService.remove(_id);
    }  
}
