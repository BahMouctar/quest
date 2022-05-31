import { Body, Catch, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { isDefined } from 'class-validator';
import { Message } from 'src/core/shared/constant/message.enum';
import { ExceptionInterceptor } from 'src/core/shared/interceptors/exception.interceptor';
import { LoggingInterceptor } from 'src/core/shared/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/core/shared/interceptors/transform.interceptor';
import { ValidationPipe } from 'src/core/shared/pipes/validation.pipe';
import { CreateInput } from './dto/createInput.dto';
import { InputsService } from './inputs.service';


@Catch()
@ApiTags('Inputs')
@UseInterceptors(ExceptionInterceptor,LoggingInterceptor,TransformInterceptor)
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth('jwt')
@Controller('inputs')
export class InputsController {
    constructor(
        private readonly inputService: InputsService,
    ) {}
    
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post()
    async save(@Body(new ValidationPipe()) inputDto: CreateInput, @Req() req) {
        //inputDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const input = await this.inputService.save(inputDto as any);
        if (input)  return { status: { code: HttpStatus.CREATED, message: Message.SUCCESS_MESSAGE_SAVE }, data: input };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_MESSAGE_SAVE}, data: null };
    }

    @ApiResponse({ status: HttpStatus.ACCEPTED })
    @Put(':primaryKey')
    async update(@Param('primaryKey') primaryKey: string, @Body(new ValidationPipe()) inputDto:CreateInput, @Req() req): Promise<any> {
        //inputDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const input = await this.inputService.updateInput( inputDto as any, primaryKey);
        if (input) return { status: { code: HttpStatus.ACCEPTED, message: Message.SUCCESS_UPDATE_MESSAGE }, data: input };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_UPDATE_MESSAGE }, data: null };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Delete(':primaryKey')
    async delete(@Param('primaryKey') primaryKey: string, @Req() req): Promise<any> {
        //inputDto.createdBy = req.user.email / req.user.nom +" "+ req.user.prenoms;
        const input = await this.inputService.delete(primaryKey);
        if (input) return { status: { code: HttpStatus.OK, message: Message.SUCCESS_DELETE_MESSAGE } };
        return { status: { code: HttpStatus.BAD_REQUEST, message: Message.ERROR_DELETE_MESSAGE } };
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get()
    async findAll(): Promise<any> {
        const inputs = await this.inputService.findAll({order:{id:"DESC"},relations: ["type","subject"]});
        return { status: { code: HttpStatus.OK, message: inputs.length+" "+Message.SUCCESS_FETCH_ALL_MESSAGE }, data: inputs}
    }

    @ApiResponse({ status: HttpStatus.OK })
    @Get(':primaryKey')
    async findOne(@Param('primaryKey') primaryKey: string): Promise<any> {
        const input = await  this.inputService.findByIdInput(primaryKey);
        if (!isDefined(input))  throw (new HttpException({ status: { code: HttpStatus.NOT_FOUND, error: Message.ERROR_FETCH_ONE_MESSAGE } }, HttpStatus.NOT_FOUND));
        return { status: { code: HttpStatus.OK, message: Message.SUCCESS_FETCH_ONE_MESSAGE }, data: input };
    }
}
