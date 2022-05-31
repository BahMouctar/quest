import { Body, Catch, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { isDefined } from 'class-validator';
import { Message } from 'src/core/shared/constant/message.enum';
import { ExceptionInterceptor } from 'src/core/shared/interceptors/exception.interceptor';
import { LoggingInterceptor } from 'src/core/shared/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/core/shared/interceptors/transform.interceptor';
import { CreateVersionInput } from './dto/createVersionInput.dto';
import { VersionsService } from './versions.service';

@Catch()
@ApiTags('Versions')
@UseInterceptors(ExceptionInterceptor,LoggingInterceptor,TransformInterceptor)
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth('jwt')
@Controller('versions')
export class VersionsController {
    constructor(
        private readonly versionService: VersionsService,
    ) {}
    
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post()
    async save(@Body(new ValidationPipe()) versionDto: CreateVersionInput, @Req() req) {
        //versionDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const version = await this.versionService.save(versionDto as any);
        if (version)  return { status: { code: HttpStatus.CREATED, message: Message.SUCCESS_MESSAGE_SAVE }, data: version };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_MESSAGE_SAVE}, data: null };
    }

    @ApiResponse({ status: HttpStatus.ACCEPTED })
    @Put(':primaryKey')
    async update(@Param('primaryKey') primaryKey: string, @Body(new ValidationPipe()) versionDto:CreateVersionInput, @Req() req): Promise<any> {
        //versionDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const version = await this.versionService.updateVersion( versionDto as any, primaryKey);
        if (version) return { status: { code: HttpStatus.ACCEPTED, message: Message.SUCCESS_UPDATE_MESSAGE }, data: version };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_UPDATE_MESSAGE }, data: null };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':primaryKey')
    async delete(@Param('primaryKey') primaryKey: string, @Req() req): Promise<any> {
        //versionDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const version = await this.versionService.delete(primaryKey);
        if (version) return { status: { code: HttpStatus.OK, message: Message.SUCCESS_DELETE_MESSAGE } };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_DELETE_MESSAGE } };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get()
    async findAll(): Promise<any> {
        const versions = await this.versionService.findAll({order:{id:"DESC"},relations: ["language"]});
        return { status: { code: HttpStatus.OK, message: versions.length+" "+Message.SUCCESS_FETCH_ALL_MESSAGE }, data: versions}
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get(':primaryKey')
    async findOne(@Param('primaryKey') primaryKey: string): Promise<any> {
        const version = await  this.versionService.findByIdVersion(primaryKey);
        if (!isDefined(version))  throw (new HttpException({ status: { code: HttpStatus.NOT_FOUND, error: Message.ERROR_FETCH_ONE_MESSAGE } }, HttpStatus.NOT_FOUND));
        return { status: { code: HttpStatus.OK, message: Message.SUCCESS_FETCH_ONE_MESSAGE }, data: version };
    }

}
