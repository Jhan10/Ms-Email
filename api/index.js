import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import {EmailServer, sendEmailJsTest, sendEmailJs, sendEmailJsPlan} from '../Business/EmailJS.js';
import htmlTest from '../Utils/htmls.js';

const app = express();
app.use(express.json());

const { PORT } = process.env;
const corsOptions = {
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.post("/teste", async (req, res) => {
    console.log("chegou");
        res.send({
            "status":"(teste) Sucesso"
            ,"request":req.body
        });
});

app.post("/sendEmailTest", async (req, res) => {
    console.log("chegou");
    console.log(req.body);
    
    if(req.body.email){
        try{
        //return(res.send) inside method
        await sendEmailJsTest(
        EmailServer.GMAIL
        ,req.body.email
        ,res //
        );
    }catch(e){
        console.log("Erro route method /sendEmailTest: ", e);
    }
    }else{
        res.send({
            "status":"Está faltando um dos campos necessários. Verifique os obrigatórios: "
            +"'email'"
        });
    }
});

app.post("/sendEmail", async (req, res) => {
    console.log("chegou");
    console.log(req.body);

    if(req.body.email){
        try{
        //return(res.send) inside method
        sendEmailJs(
            EmailServer.GMAIL
            ,req.body.email
            ,req.body.htmlContent
            ,res //
        );

    }catch(e){
        console.log("Erro route method /sendEmail: ", e);
    }
    }else{
        res.send({
            "status":"Está faltando um dos campos necessários. Verifique os obrigatórios: "
            +"'email', 'htmlContent'"
        });
    }
});

app.post("/sendEmailPlan", async (req, res) => {
    console.log("chegou");
    console.log(req.body);



    if (req.body.email
        && req.body.EmailServer
        && req.body.htmlContent
    ) {
        //para testes
        let htmlContent =req.body.htmlContent;
        if(req.body.teste){
            htmlContent=htmlTest;
        }

        try {
            //return(res.send) inside method
            sendEmailJsPlan(
                req.body.EmailServer
                ,req.body.email
                ,htmlContent
                ,res  //
            );
        } catch (e) {
            console.log("Erro route method /sendEmailPlan: ", e);
        }
    } else {
        res.send({
            "status": "Está faltando um dos campos necessários. Verifique os obrigatórios: "
            +"'EmailServer', 'email', 'htmlContent'"
        });
    }

});      

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`Full Link: http://localhost:${PORT}/`);

});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  //sleep(2000).then(() => { console.log('World!'); });
}