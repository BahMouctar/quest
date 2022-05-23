
import { Injectable } from '@nestjs/common';
import { first } from 'rxjs';
import { Languages } from 'src/app/languages/entities/languages.entity';
import { LanguagesService } from 'src/app/languages/languages.service';
import { Versions } from 'src/app/versions/entities/versions.entity';
import { VersionsService } from 'src/app/versions/versions.service';
import { results } from 'src/core/shared/functions/function';
import { isArray, isNull } from 'util';
import { LANGUAGE_VERSIONS } from '../../../../app.constant';


@Injectable()
export class LanguageVersionService {
    public operation: any = null;

    constructor(
        private readonly languageService: LanguagesService,
        private readonly versionService: VersionsService,
    ) {}

    //Enregistrer un objet "Language"(3)
    private saveLanguage = async  (language : Languages): Promise<any> => {
        //Rechercher le language-service selon le code
        let response = await this.languageService.findOne({ label : language.label });
        //Retourner le premier objet "language" 
        let $language: Languages|any =  first(response as any);
        if (isNull($language)) {
            response = await this.languageService.create(language as any) as any;
        }
        else{
            response = await this.languageService.update({...language, ...$language }, <any>language._id) as any;
        }
        //Retourner l'objet "language" passer en paramètre
        $language =  results(response);
        return $language;
    }

    //Enregistrer un objet "Version"(4)
    private saveVersion = async (version : Versions): Promise<any> => {
        //Rechercher la "version" selon le code
        let response = await this.versionService.findOne({ label : version.label });
        //Retourner le premier objet 
        let $version: Versions|any =  first(response as any);
        if (isNull($version)) {
            response = await this.versionService.create(version as any) as any;
        }
        else{
            response = await this.versionService.update({...version, ...$version }, <any>version._id) as any;
        }
        //Retourner l'objet "version" passer en paramètre
        $version =  results(response);
        return $version;
    }
    
    //Enregistrer les objets LANGUAGE_VERSIONS(5)
    public initialize = async () => {

        // Indicateurs
        let nSuccess:number = 0;
        let nError:number = 0;
        let nTotal:number = LANGUAGE_VERSIONS.length;
        let fatalError: boolean = false;
        for(var i = 0; i <= nTotal - 1; i++){   
            try{
                const { label,versions } = LANGUAGE_VERSIONS[i];
                const language: Languages = await this.saveLanguage(<Languages> { label,versions });
                for (var j = 0; j <= versions.length - 1; j++) {
                    const { label, description,index}  = versions[j];
                    const version: Versions = await this.saveVersion(<Versions> {
                        label, description, index, language
                    });
                } 
                nSuccess++;
            }
            catch(e){
                console.log(e)
                nError++;
            }
        }
        return { nTotal, nSuccess, nError, fatalError } ;
    }
}
