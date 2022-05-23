import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { InputsService } from './inputs.service';
import { CreateInput } from './dto/createInput.dto';
import { UpdateInput } from './dto/updateInput.dto';
import { Inputs } from './entities/inputs.entity';

@Resolver( of => Inputs )
export class InputsResolver {

    constructor(private readonly inputsService : InputsService){}

    @Query(of => [Inputs],{name:"inputs"})
    async inputs(){
        return await this.inputsService.allInputs();
    }

    @Query(of => Inputs,{name:"findBookById"})
    async findById(@Args('_id') _id : string){
        return await this.inputsService.findById(_id);
    }

    @Mutation(of  => Inputs,{name:"createBook"})
    async create(@Args("createInputs") createInput : CreateInput){
        return await this.inputsService.create(createInput)
    }

    @Mutation(of => Inputs,{name:"updateBook"})
    async update(
        @Args("_id") _id :string,
        @Args("updateInput") updateInput:UpdateInput){
        return await this.inputsService.update(_id,updateInput)
    }

    @Mutation( of => Inputs,{name:"remove"} )
    async remove(@Args("_id") _id :string){
        return await this.inputsService.remove(_id);
    }  
}
