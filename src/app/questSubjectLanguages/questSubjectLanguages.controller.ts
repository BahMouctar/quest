import { Body, Catch, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { isDefined } from 'class-validator';
import { Message } from 'src/core/shared/constant/message.enum';
import { ExceptionInterceptor } from 'src/core/shared/interceptors/exception.interceptor';
import { LoggingInterceptor } from 'src/core/shared/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/core/shared/interceptors/transform.interceptor';
import { ValidationPipe } from 'src/core/shared/pipes/validation.pipe';
import { CreateQuestSubjectLanguageInput } from './dto/createQuestSubjectLanguageInput.dto';
import { QuestSubjectLanguagesService } from './questSubjectLanguages.service';

@Catch()
@ApiTags('Quest Subject Languages')
@UseInterceptors(ExceptionInterceptor,LoggingInterceptor,TransformInterceptor)
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth('jwt')
@Controller('quest-subject-languages')
export class QuestSubjectLanguagesController {
    constructor(
        private readonly questSubjectLanguageService: QuestSubjectLanguagesService,
    ) {}
    
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post()
    async save(@Body(new ValidationPipe()) questSubjectLanguageDto: CreateQuestSubjectLanguageInput, @Req() req) {
        //questSubjectLanguageDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const questSubjectLanguage = await this.questSubjectLanguageService.save(questSubjectLanguageDto as any);
        if (questSubjectLanguage)  return { status: { code: HttpStatus.CREATED, message: Message.SUCCESS_MESSAGE_SAVE }, data: questSubjectLanguage };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_MESSAGE_SAVE}, data: null };
    }

    @ApiResponse({ status: HttpStatus.ACCEPTED })
    @Put(':primaryKey')
    async update(@Param('primaryKey') primaryKey: string, @Body(new ValidationPipe()) questSubjectLanguageDto:CreateQuestSubjectLanguageInput, @Req() req): Promise<any> {
        //questSubjectLanguageDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const questSubjectLanguage = await this.questSubjectLanguageService.updateQuestSubjectLanguage( questSubjectLanguageDto as any, primaryKey);
        if (questSubjectLanguage) return { status: { code: HttpStatus.ACCEPTED, message: Message.SUCCESS_UPDATE_MESSAGE }, data: questSubjectLanguage };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_UPDATE_MESSAGE }, data: null };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':primaryKey')
    async delete(@Param('primaryKey') primaryKey: string, @Req() req): Promise<any> {
        //questSubjectLanguageDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const questSubjectLanguage = await this.questSubjectLanguageService.delete(primaryKey);
        if (questSubjectLanguage) return { status: { code: HttpStatus.OK, message: Message.SUCCESS_DELETE_MESSAGE } };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_DELETE_MESSAGE } };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get()
    async findAll(): Promise<any> {
        const questSubjectLanguages = await this.questSubjectLanguageService.findAll({order:{id:"DESC"},relations: ["questSubject","languages"]});
        return { status: { code: HttpStatus.OK, message: questSubjectLanguages.length+" "+Message.SUCCESS_FETCH_ALL_MESSAGE }, data: questSubjectLanguages}
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get(':primaryKey')
    async findOne(@Param('primaryKey') primaryKey: string): Promise<any> {
        const questSubjectLanguage = await  this.questSubjectLanguageService.findByIdQuestSubjectLanguage(primaryKey);
        if (!isDefined(questSubjectLanguage))  throw (new HttpException({ status: { code: HttpStatus.NOT_FOUND, error: Message.ERROR_FETCH_ONE_MESSAGE } }, HttpStatus.NOT_FOUND));
        return { status: { code: HttpStatus.OK, message: Message.SUCCESS_FETCH_ONE_MESSAGE }, data: questSubjectLanguage };
    }

}
