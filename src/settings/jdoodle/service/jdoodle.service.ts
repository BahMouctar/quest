import { Injectable } from '@nestjs/common';
import { isArray, isNull } from 'util';
import { LANGUAGE_VERSIONS } from '../../../../app.constant';


@Injectable()
export class JdoodleService {
    public operation: any = null;

    constructor(
    ) {}

    async create(){
            let request = require('request');

    let program = {
        script : "",
        language: "php",
        versionIndex: "0",
        clientId: "YourClientID",
        clientSecret:"YourClientSecret"
    };
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    },
    function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
});
    }
}
