import Express from "express";
import cors from 'cors';
import {EMAIL,PASS} from '../config.js'

const app = Express();
const router = Express.Router(); // Modificado: Debes usar Express.Router() en lugar de importarlo de Express

/* NodeMailer */

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: `${EMAIL}`,
      pass: `${PASS}`,
    },
});

transporter.verify().then(()=>{
    console.log("Ready for send emails")
})

/* Configuration */

app.use(Express.json());
app.use(cors()); // Utiliza el middleware cors aquí

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

/* Controller */

const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    // Configuración del correo electrónico
    const mailOptions = {
        from: `"Saludos 👻" <${to}>`, // Dirección del remitente
        to: `${EMAIL}`, // Lista de destinatarios
        subject: `${subject} ✔`, // Línea de asunto
        html: `
        <html>
        <head>
            <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333;
                font-size: 24px;
                margin-bottom: 20px;
                text-align: center;
            }
            p {
                color: #666;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .img-container {
                width: 100%;
                height: auto;
                display: flex;
                justify-content: center;
                margin-bottom: 20px;
            }
            .img-container img {
                max-width: 100%;
                height: auto;
            }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="img-container">
                    <img src="https://img.freepik.com/vector-premium/envie-nuevo-correo-electronico-icono-mensaje-pantalla-computadora-portatil-vector-o-mensaje-carta-no-leido-bandeja-entrada-buzon-correo-recibido-computadora-aviso-rojo-sobre-grafico-moderno-imagen-diseno-servicio-recordatorio-alerta_101884-1937.jpg" alt="Correo electrónico">
                </div>
                <h1>${subject}</h1>
                <p>${text}</p>
            </div>
        </body>
        </html>
        `, // Cuerpo del correo electrónico en formato HTML
    };
    

    const mailOptions2 = {
        from: `"Contactando" <${EMAIL}>`, // Dirección del remitente
        to: `${to}`, // Lista de destinatarios
        subject: `Saludos ✔`, // Línea de asunto
        html: `
        <html>
        <head>
            <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333;
                font-size: 24px;
                margin-bottom: 20px;
                text-align: center;
            }
            p {
                color: #666;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .img-container {
                width: 100%;
                height: 250px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .img-container img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="img-container">
                    <img src="https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-person-waving-vector-png-image_6893930.png" alt="Persona saludando">
                </div>  
                <h1>Confirmación de recepción</h1>
                <p>Estimado(a),</p>
                <p>Gracias por ponerse en contacto. He recibido su mensaje y me comunicare con usted a la brevedad posible.</p>
                <p>Atentamente,</p>
                <p>Santiago Bernal.</p>
            </div>
        </body>
        </html>
        `, // Cuerpo del correo electrónico en formato HTML
    };
    

    try {
        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptions2);
        return res.json({
            message: "Correo electrónico enviado con éxito"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al enviar el correo electrónico"
        });
    }
};

/* Routes */

router.post("/send", sendEmail);

app.use("/api", router);
app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});

app.listen(4321, () => {
    console.log("Escuchando en el puerto 2700");
});
