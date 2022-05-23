import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { SubjectsService } from './subjects.service';
import { CreateSubjectInput } from './dto/createSubjectInput.dto';
import { UpdateSubjectInput } from './dto/updateSubjectInput.dto';
import { Subjects } from './entities/subjects.entity';

@Resolver( of => Subjects )
export class SubjectsResolver {

    constructor(private readonly subjectsService : SubjectsService){}

    @Query(of => [Subjects],{name:"subjects"})
    async subjects(){
        return await this.subjectsService.allSubjects();
    }

    @Query(of => Subjects,{name:"findSubjectById"})
    async findById(@Args('_id') _id : string){
        return await this.subjectsService.findById(_id);
    }

    @Mutation(of  => Subjects,{name:"crateSubject"})
    async create(@Args("createSubjectsInput") createSubjectsInput : CreateSubjectInput){
        return await this.subjectsService.create(createSubjectsInput)
    }

    @Mutation(of => Subjects,{name:"updateSubject"})
    async update(
        @Args("_id") _id :string,
        @Args("updateSubjectsInput") updateSubjectsInput:UpdateSubjectInput){
        return await this.subjectsService.update(_id,updateSubjectsInput)
    }

    @Mutation( of => Subjects,{name:"remove"} )
    async remove(@Args("_id") _id :string){
        return await this.subjectsService.remove(_id);
    }  
}
