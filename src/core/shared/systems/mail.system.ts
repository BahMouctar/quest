import configuration from 'src/config/configuration';
import * as nodemailer from 'nodemailer';
import { dirname } from 'path';

export class Mail{

    private static async transporter() {
        /**
            { code:"SMTP-HOST", nom:"Serveur", description: "Nom du serveur SMTP (smtp.domaine.ci)", $datatype:"TYPD-STRING" },
            { code:"SMTP-PORT", nom:"Port", description: "Port utilisé par le serveur (587)", $datatype:"TYPD-NUMBER" },
            { code:"SMTP-SECURE", nom:"sécuriser la connexion", description: "Sécuriser la connexion par un certifica SSL ou TLS", $datatype:"TYPD-BOOLEAN" },
            { code:"SMTP-USER", nom:"Utilisateur", description: "Compte utilisateur qui enverra le mail", $datatype:"TYPD-STRING" },
            { code:"SMTP-PASS", nom:"Mot de passe", description: "Mot de passe du compte utilisateur", $datatype:"TYPD-STRING" },

         */
        
        // const hostA: string = await (await paramRepository.findOne({ code: 'SMTP-HOST'})).stringValue;
        // const portA: number = await (await paramRepository.findOne({ code: 'SMTP-PORT'})).numberValue;
        // const secureA: boolean = await (await paramRepository.findOne({ code: 'SMTP-SECURE'})).booleanValue;
        // const userA: string = await (await paramRepository.findOne({ code: 'SMTP-USER'})).stringValue;
        // const passA: string = await (await paramRepository.findOne({ code: 'SMTP-PASS'})).stringValue;


       // const paramRepository = getRepository(parametreEntity); // you can also get it via getConnection().getRepository() or getManager().getRepository()
        const host        =configuration().mail.host;
        const port        =configuration().mail.port.ssl;
        const secure      =configuration().mail.secure.oui;
        const user        =configuration().mail.auth.user;
        const pass        =configuration().mail.auth.pass;
    

        return nodemailer.createTransport({
            host: host,
            port: port,
            secure: secure, // true for 465, false for other ports
            requiresAuth: true,
            domains: ["gmail.com", "googlemail.com",'https://api-gentech.herokuapp.com'],
            auth: {
                user: user, // generated ethereal user
                pass: pass // generated ethereal password 
            }, 
    //         tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false
    // }
        });
    // const oauth2Client = new google.auth.OAuth2(
    //         configuration().googleSendMaileApi.CLIENT_ID,
    //         configuration().googleSendMaileApi.CLIENT_SECRET,
    //         configuration().googleSendMaileApi.REDIRECT_URL,
    //     );
    //     oauth2Client.setCredentials({
    //         refresh_token : configuration().googleSendMaileApi.REFRESH_TOKEN
    //     });
    //     const accessToken = oauth2Client.getAccessToken()

        // return nodemailer.createTransport({
        //     service :  "gmail", 
        //     auth :  { 
        //         type :  "OAuth2", 
        //         user :  "dev.gentech2021@gmail.com", 
        //         clientId : configuration().googleSendMaileApi.CLIENT_ID, 
        //         clientSecret :  configuration().googleSendMaileApi.CLIENT_SECRET, 
        //         refreshToken :  configuration().googleSendMaileApi.REFRESH_TOKEN, 
        //         accessToken : accessToken 
        //     }
        // });
    }

    public static async send(email: string, subject: string, content:string) {
        const transporter = await this.transporter();
        const  info = await transporter.sendMail({
            from: configuration().mail.from, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: content, // plain text body
            html: content
        });
        return info;
    }

    public static async sendMailIntervention(from:string,email: string, subject: string, content:string, attachments:object[]) {
        const transporter = await this.transporter();
        const  info = await transporter.sendMail({
            from: from, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: content, // plain text body
            attachments:  attachments
        });
        return info;
    }
    
}