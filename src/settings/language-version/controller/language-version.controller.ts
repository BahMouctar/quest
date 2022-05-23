import { Catch, Controller, Get, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ExceptionInterceptor } from 'src/core/shared/interceptors/exception.interceptor';
import { LoggingInterceptor } from 'src/core/shared/interceptors/logging.interceptor';
import { LanguageVersionService } from '../service/language-version.service';


@ApiTags('Settings')
@Catch()
@UseInterceptors(ExceptionInterceptor, LoggingInterceptor)
@Controller('settings/language-version')
export class LanguageVersionController {
    constructor(private readonly languageVersionService: LanguageVersionService) {}

    
    @ApiResponse({ status: HttpStatus.OK })
    @Get('initialize')
    async initialize() {
        let result = await this.languageVersionService.initialize();
        return result;
    }
}
