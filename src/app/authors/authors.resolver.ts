import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { CreateAuthorsInput } from './dto/createAuthorsInput.dto';
import { UpdateAuthorsInput } from './dto/updateAuthorsInput.dto';
import { Authors } from './entities/authors.entity';

@Resolver( of =>  Authors)
export class AuthorsResolver {
    constructor(private readonly authorsService : AuthorsService){}

    @Query(of => [Authors],{name:"authors"})
    async authors(){
        return await this.authorsService.allAuthors();
    }

    @Query(of => Authors,{name:"findBookById"})
    async findById(@Args('_id') _id : string){
        return await this.authorsService.findById(_id);
    }

    @Mutation(of  => Authors,{name:"createAuthor"})
    async create(@Args("createAuthorsInput") createAuthorsInput : CreateAuthorsInput){
        return await this.authorsService.create(createAuthorsInput)
    }

    @Mutation(of => Authors,{name:"updateAuthor"})
    async update(
        @Args("_id") _id :string,
        @Args("updateAuthorInput") updateAuthorInput:UpdateAuthorsInput){
        return await this.authorsService.update(_id,updateAuthorInput)
    }

    @Mutation( of => Authors,{name:"remove"} )
    async remove(@Args("_id") _id :string){
        return await this.authorsService.remove(_id);
    }    
}
