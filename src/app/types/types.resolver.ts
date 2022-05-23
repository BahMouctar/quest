import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { TypesService } from './types.service';
import { CreateTypeInput } from './dto/createTypeInput.dto';
import { UpdateTypeInput } from './dto/updateTypeInput.dto';
import { Types } from './entities/types.entity';

@Resolver( of => Types )
export class TypesResolver {

    constructor(private readonly typesService : TypesService){}

    @Query(of => [Types],{name:"types"})
    async types(){
        return await this.typesService.allTypes();
    }

    @Query(of => Types,{name:"findTypeById"})
    async findById(@Args('_id') _id : string){
        return await this.typesService.findById(_id);
    }

    @Mutation(of  => Types,{name:"crateType"})
    async create(@Args("createTypesInput") createTypesInput : CreateTypeInput){
        return await this.typesService.create(createTypesInput)
    }

    @Mutation(of => Types,{name:"updateType"})
    async update(
        @Args("_id") _id :string,
        @Args("updateTypesInput") updateTypesInput:UpdateTypeInput){
        return await this.typesService.update(_id,updateTypesInput)
    }

    @Mutation( of => Types,{name:"remove"} )
    async remove(@Args("_id") _id :string){
        return await this.typesService.remove(_id);
    }  
}
