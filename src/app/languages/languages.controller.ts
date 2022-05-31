import { Body, Catch, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { isDefined } from 'class-validator';
import { Message } from 'src/core/shared/constant/message.enum';
import { ExceptionInterceptor } from 'src/core/shared/interceptors/exception.interceptor';
import { LoggingInterceptor } from 'src/core/shared/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/core/shared/interceptors/transform.interceptor';
import { ValidationPipe } from 'src/core/shared/pipes/validation.pipe';
import { CreateLanguageInput } from './dto/createLanguageInput.dto';
import { LanguagesService } from './languages.service';


@Catch()
@ApiTags('Languages')
@UseInterceptors(ExceptionInterceptor,LoggingInterceptor,TransformInterceptor)
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth('jwt')
@Controller('languages')
export class LanguagesController {
    constructor(
        private readonly languageService: LanguagesService,
    ) {}
    
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post()
    async save(@Body(new ValidationPipe()) languageDto: CreateLanguageInput, @Req() req) {
        //languageDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const language = await this.languageService.save(languageDto as any);
        if (language)  return { status: { code: HttpStatus.CREATED, message: Message.SUCCESS_MESSAGE_SAVE }, data: language };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_MESSAGE_SAVE}, data: null };
    }

    @ApiResponse({ status: HttpStatus.ACCEPTED })
    @Put(':primaryKey')
    async update(@Param('primaryKey') primaryKey: string, @Body(new ValidationPipe()) languageDto:CreateLanguageInput, @Req() req): Promise<any> {
        //languageDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const language = await this.languageService.updateLanguage( languageDto as any, primaryKey);
        if (language) return { status: { code: HttpStatus.ACCEPTED, message: Message.SUCCESS_UPDATE_MESSAGE }, data: language };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_UPDATE_MESSAGE }, data: null };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':primaryKey')
    async delete(@Param('primaryKey') primaryKey: string, @Req() req): Promise<any> {
        //languageDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const language = await this.languageService.delete(primaryKey);
        if (language) return { status: { code: HttpStatus.OK, message: Message.SUCCESS_DELETE_MESSAGE } };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_DELETE_MESSAGE } };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get()
    async findAll(): Promise<any> {
        const languages = await this.languageService.findAll({order:{id:"DESC"},relations: ["quest","versions","questSubjectLanguages"]});
        return { status: { code: HttpStatus.OK, message: languages.length+" "+Message.SUCCESS_FETCH_ALL_MESSAGE }, data: languages}
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get(':primaryKey')
    async findOne(@Param('primaryKey') primaryKey: string): Promise<any> {
        const language = await  this.languageService.findByIdLanguage(primaryKey);
        if (!isDefined(language))  throw (new HttpException({ status: { code: HttpStatus.NOT_FOUND, error: Message.ERROR_FETCH_ONE_MESSAGE } }, HttpStatus.NOT_FOUND));
        return { status: { code: HttpStatus.OK, message: Message.SUCCESS_FETCH_ONE_MESSAGE }, data: language };
    }
}
