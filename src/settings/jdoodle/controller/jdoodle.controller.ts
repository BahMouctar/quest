import { Catch, Controller, Get, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ExceptionInterceptor } from 'src/core/shared/interceptors/exception.interceptor';
import { LoggingInterceptor } from 'src/core/shared/interceptors/logging.interceptor';


@ApiTags('Jdoodle')
@Catch()
@UseInterceptors(ExceptionInterceptor, LoggingInterceptor)
@Controller('jdoodle')
export class JdoodleController {
    constructor() {}

    
    @ApiResponse({ status: HttpStatus.OK })
    @Get('jdoodle')
    async jdoodle() {
        return ;
    }
}
