import { Body, Catch, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { isDefined } from 'class-validator';
import { Message } from 'src/core/shared/constant/message.enum';
import { ExceptionInterceptor } from 'src/core/shared/interceptors/exception.interceptor';
import { LoggingInterceptor } from 'src/core/shared/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/core/shared/interceptors/transform.interceptor';
import { ValidationPipe } from 'src/core/shared/pipes/validation.pipe';
import { CreateQuestsInput } from './dto/createQuestInput.dto';
import { QuestsService } from './quests.service';

@Catch()
@ApiTags('Quests')
@UseInterceptors(ExceptionInterceptor,LoggingInterceptor,TransformInterceptor)
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth('jwt')
@Controller('quests')
export class QuestsController {
    constructor(
        private readonly questService: QuestsService,
    ) {}
    
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post()
    async save(@Body(new ValidationPipe()) questDto: CreateQuestsInput, @Req() req) {
        //questDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const quest = await this.questService.save(questDto as any);
        if (quest)  return { status: { code: HttpStatus.CREATED, message: Message.SUCCESS_MESSAGE_SAVE }, data: quest };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_MESSAGE_SAVE}, data: null };
    }

    @ApiResponse({ status: HttpStatus.ACCEPTED })
    @Put(':primaryKey')
    async update(@Param('primaryKey') primaryKey: string, @Body(new ValidationPipe()) questDto:CreateQuestsInput, @Req() req): Promise<any> {
        //questDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const quest = await this.questService.updateQuest( questDto as any, primaryKey);
        if (quest) return { status: { code: HttpStatus.ACCEPTED, message: Message.SUCCESS_UPDATE_MESSAGE }, data: quest };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_UPDATE_MESSAGE }, data: null };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':primaryKey')
    async delete(@Param('primaryKey') primaryKey: string, @Req() req): Promise<any> {
        //questDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const quest = await this.questService.delete(primaryKey);
        if (quest) return { status: { code: HttpStatus.OK, message: Message.SUCCESS_DELETE_MESSAGE } };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_DELETE_MESSAGE } };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get()
    async findAll(): Promise<any> {
        const quests = await this.questService.findAll({order:{id:"DESC"},relations: ["questSubjects","languages"]});
        return { status: { code: HttpStatus.OK, message: quests.length+" "+Message.SUCCESS_FETCH_ALL_MESSAGE }, data: quests}
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get(':primaryKey')
    async findOne(@Param('primaryKey') primaryKey: string): Promise<any> {
        const quest = await  this.questService.findByIdQuest(primaryKey);
        if (!isDefined(quest))  throw (new HttpException({ status: { code: HttpStatus.NOT_FOUND, error: Message.ERROR_FETCH_ONE_MESSAGE } }, HttpStatus.NOT_FOUND));
        return { status: { code: HttpStatus.OK, message: Message.SUCCESS_FETCH_ONE_MESSAGE }, data: quest };
    }

}
