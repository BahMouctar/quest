import { Body, Catch, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { isDefined } from 'class-validator';
import { Message } from 'src/core/shared/constant/message.enum';
import { ExceptionInterceptor } from 'src/core/shared/interceptors/exception.interceptor';
import { LoggingInterceptor } from 'src/core/shared/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/core/shared/interceptors/transform.interceptor';
import { ValidationPipe } from 'src/core/shared/pipes/validation.pipe';
import { CreateQuestSubjectInput } from './dto/createQuestSubjectInput.dto';
import { QuestSubjectsService } from './questSubjects.service';

@Catch()
@ApiTags('QuestSubject subject')
@UseInterceptors(ExceptionInterceptor,LoggingInterceptor,TransformInterceptor)
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth('jwt')
@Controller('questSubject-subject')
export class QuestSubjectController {
    constructor(
        private readonly questSubjectService: QuestSubjectsService,
    ) {}
    
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post()
    async save(@Body(new ValidationPipe()) questSubjectDto: CreateQuestSubjectInput, @Req() req) {
        //questSubjectDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const questSubject = await this.questSubjectService.save(questSubjectDto as any);
        if (questSubject)  return { status: { code: HttpStatus.CREATED, message: Message.SUCCESS_MESSAGE_SAVE }, data: questSubject };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_MESSAGE_SAVE}, data: null };
    }

    @ApiResponse({ status: HttpStatus.ACCEPTED })
    @Put(':primaryKey')
    async update(@Param('primaryKey') primaryKey: string, @Body(new ValidationPipe()) questSubjectDto:CreateQuestSubjectInput, @Req() req): Promise<any> {
        //questSubjectDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const questSubject = await this.questSubjectService.updateQuestSubject( questSubjectDto as any, primaryKey);
        if (questSubject) return { status: { code: HttpStatus.ACCEPTED, message: Message.SUCCESS_UPDATE_MESSAGE }, data: questSubject };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_UPDATE_MESSAGE }, data: null };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':primaryKey')
    async delete(@Param('primaryKey') primaryKey: string, @Req() req): Promise<any> {
        //questSubjectDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const questSubject = await this.questSubjectService.delete(primaryKey);
        if (questSubject) return { status: { code: HttpStatus.OK, message: Message.SUCCESS_DELETE_MESSAGE } };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_DELETE_MESSAGE } };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get()
    async findAll(): Promise<any> {
        const questSubjects = await this.questSubjectService.findAll({order:{id:"DESC"},relations: ["quest","subject","questSubjectLanguages"]});
        return { status: { code: HttpStatus.OK, message: questSubjects.length+" "+Message.SUCCESS_FETCH_ALL_MESSAGE }, data: questSubjects}
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get(':primaryKey')
    async findOne(@Param('primaryKey') primaryKey: string): Promise<any> {
        const questSubject = await  this.questSubjectService.findByIdQuestSubject(primaryKey);
        if (!isDefined(questSubject))  throw (new HttpException({ status: { code: HttpStatus.NOT_FOUND, error: Message.ERROR_FETCH_ONE_MESSAGE } }, HttpStatus.NOT_FOUND));
        return { status: { code: HttpStatus.OK, message: Message.SUCCESS_FETCH_ONE_MESSAGE }, data: questSubject };
    }

}
