
import { Module } from '@nestjs/common';
import { LanguagesModule } from 'src/app/languages/languages.module';
import { VersionsModule } from 'src/app/versions/versions.module';
import { LanguageVersionController } from './language-version/controller/language-version.controller';
import { LanguageVersionService } from './language-version/service/language-version.service';

@Module({
    imports: [LanguagesModule, VersionsModule],
    providers: [LanguageVersionService],
    controllers: [LanguageVersionController],
    exports: [LanguageVersionService]
})
export class SettingsModule {}
