import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { LanguagesService } from './languages.service';
import { CreateLanguageInput } from './dto/createLanguageInput.dto';
import { UpdateLanguageInput } from './dto/updateLanguageInput.dto';
import { Languages } from './entities/languages.entity';

@Resolver( of => Languages )
export class LanguagesResolver {

    constructor(private readonly languagesService : LanguagesService){}

    @Query(of => [Languages],{name:"languages"})
    async languages(){
        return await this.languagesService.allLanguages();
    }

    @Query(of => Languages,{name:"findLanguageById"})
    async findById(@Args('_id') _id : string){
        return await this.languagesService.findById(_id);
    }

    @Mutation(of  => Languages,{name:"crateLanguage"})
    async create(@Args("createLanguagesInput") createLanguagesInput : CreateLanguageInput){
        return await this.languagesService.create(createLanguagesInput)
    }

    @Mutation(of => Languages,{name:"updateLanguage"})
    async update(
        @Args("_id") _id :string,
        @Args("updateLanguagesInput") updateLanguagesInput:UpdateLanguageInput){
        return await this.languagesService.update(_id,updateLanguagesInput)
    }

    @Mutation( of => Languages,{name:"remove"} )
    async remove(@Args("_id") _id :string){
        return await this.languagesService.remove(_id);
    }  
}
