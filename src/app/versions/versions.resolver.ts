import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { VersionsService } from './versions.service';
import { CreateVersionInput } from './dto/createVersionInput.dto';
import { UpdateVersionInput } from './dto/updateVersionInput.dto';
import { Versions } from './entities/versions.entity';

@Resolver( of => Versions )
export class VersionsResolver {

    constructor(private readonly versionsService : VersionsService){}

    @Query(of => [Versions],{name:"versions"})
    async versions(){
        return await this.versionsService.allVersions();
    }

    @Query(of => Versions,{name:"findVersionById"})
    async findById(@Args('_id') _id : string){
        return await this.versionsService.findById(_id);
    }

    @Mutation(of  => Versions,{name:"crateVersion"})
    async create(@Args("createVersionsInput") createVersionsInput : CreateVersionInput){
        return await this.versionsService.create(createVersionsInput)
    }

    @Mutation(of => Versions,{name:"updateVersion"})
    async update(
        @Args("_id") _id :string,
        @Args("updateVersionsInput") updateVersionsInput:UpdateVersionInput){
        return await this.versionsService.update(_id,updateVersionsInput)
    }

    @Mutation( of => Versions,{name:"remove"} )
    async remove(@Args("_id") _id :string){
        return await this.versionsService.remove(_id);
    }  
}
