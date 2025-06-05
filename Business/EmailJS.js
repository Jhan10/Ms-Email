import { SMTPClient } from 'emailjs';
//const SMTPClient =require('emailjs');
import dotenv from 'dotenv';
dotenv.config();

const { GMAIL_HOST, GMAIL_USER, GMAIL_PASS, GMAIL_PORT_SEC } = process.env;
let config = {
    GMAIL_HOST: GMAIL_HOST
    ,GMAIL_USER:GMAIL_USER
    ,GMAIL_PASS:GMAIL_PASS
    ,GMAIL_PORT_SEC:GMAIL_PORT_SEC
};


   export const EmailServer= {
    MAILTRAP: 'MAILTRAP',
    GMAIL: 'GMAIL'
    }

 export const sendEmailJsTest=async(eserver, destinatario,  res)=>{
        let emailConfig = new EmailConfig(eserver);
        console.log("eserver: ",eserver|| "nulo");

        const client = new SMTPClient({
            user:emailConfig.USER,
            password:emailConfig.PASS,
            host:emailConfig.HOST,
            port:emailConfig.PORT,
            ssl:true,
            timeout:15000
        });

        const message = {
            text: 'i hope this works',
            from: '"Berry Company\'s" <oficial@berrycompanys.com>',
            to: destinatario,
            subject: 'testing emailjs',
            attachment:
                { data: emailConfig.FakeContent(),  alternative: true}
        };
        
        try {
            client.send(message, async function (err, message) {
             console.log("Result ", err || message);
                if(err){
                    res.send({
                        "status":"Houve um erro na confirmação do envio do email"
                        ,"erro": err
                    });
                    
                }else{
                    res.send({
                    "status":"Email Enviado com Sucesso"
                    ,dataEnvio: message.header.date
                    ,messageId: message.header['message-id']
                    });
                }
         });
        } catch (err) {
         console.log("Email não enviado: ", err);
        }

    }

 export const sendEmailJs=async(eserver, destinatario, htmlContent, res)=>{
        let emailConfig = new EmailConfig(eserver);
        const client = new SMTPClient({
            user:emailConfig.USER,
            password:emailConfig.PASS,
            host:emailConfig.HOST,
            port:emailConfig.PORT,
            ssl:true,
            timeout:15000
        });

        const message = {
            text: 'i hope this works',
            from: '"Berry Company\'s" <oficial@berrycompanys.com>',
            to: destinatario,
            subject: 'testing emailjs',
            attachment:
                { data: htmlContent,  alternative: true}
        };
        
        client.send(message, function (err, message) {
            console.log("Result ",err || message);
            if(err){
                res.send({
                    "status":"Houve um erro na confirmação do envio do email"
                    ,"erro": err
                });
                
                }else{
                    res.send({
                    "status":"Email Enviado com Sucesso"
                    ,dataEnvio: message.header.date
                    ,messageId: message.header['message-id']
                    });
                }

        });

    }

 export const sendEmailJsPlan = (eserver, destinatario, htmlContent, res)=>{
        let emailConfig = new EmailConfig(eserver);
        console.log("emailConfig: ",emailConfig|| "nulo");
        const client = new SMTPClient({
            user:emailConfig.USER,
            password:emailConfig.PASS,
            host:emailConfig.HOST,
            port:emailConfig.PORT,
            ssl:true,
            timeout:15000
        });

        const message = {
            text: 'Seu plano de dieta',
            from: '"Berry Company\'s" <oficial@berrycompanys.com>',
            to: destinatario,
            subject: 'Plano de Dieta',
            attachment:
                { data: htmlContent,  alternative: true}
        };

        try{
            client.send(message, function (err, message) {
            console.log("Result ",err || message);
                if (err) {
                    res.send({
                        "status": "Houve um erro na confirmação do envio do email"
                        , "erro": err
                    });

                } else {
                    res.send({
                        "status": "Email Enviado com Sucesso"
                        , dataEnvio: message.header.date
                        , messageId: message.header['message-id']
                    });
                }
            });
        }catch(err){
            console.log("Email não enviado: ",err);
        }
    }

class EmailConfig{
    constructor(prefixServer){
        this.HOST= config[`${prefixServer}_HOST`];
        this.PORT= config[`${prefixServer}_PORT_SEC`];
        this.USER= config[`${prefixServer}_USER`];
        this.PASS= config[`${prefixServer}_PASS`];
    }

carregarConfig(pfixServer){
    let serverconfig = new EmailConfig(pfixServer);
    return serverconfig;
    }

FakeContent(){
        return "<div>  <ul><li>Ovos</li><li>Aveia em flocos</li><li>Frutas vermelhas (morango, framboesa, amora)</li><li>Pasta de amendoim integral</li><li>Iogurte integral natural</li>        <li>Castanhas do Pará (ou mix de oleaginosas)</li>        <li>Peito de frango</li>        <li>Arroz integral</li>        <li>Feijão</li>        <li>Salada verde (alface, rúcula, tomate, pepino)</li>        <li>Azeite extra virgem</li>        <li>Banana</li>        <li>Farinha de trigo integral</li><li>Óleo de coco</li>        <li>Fermento em pó</li>        <li>Canela</li>        <li>Salmão</li>        <li>Batata doce</li>        <li>Brócolis</li>        <li>Whey protein (opcional)</li>    </ul></div>";
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  //sleep(2000).then(() => { console.log('World!'); });
}