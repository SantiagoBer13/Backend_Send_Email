# Descripción del Repositorio

Este repositorio contiene una REST API simple diseñada para recibir ciertos parámetros y enviar correos electrónicos tanto al desarrollador como a la persona que envió el correo. La API está escrita en [node] y utiliza [express].

## Características Principales:

- Recepción de parámetros por el body para envío de correos electrónicos.
- Funcionalidad para enviar correos electrónicos tanto al desarrollador como al remitente.

## Uso:

Para utilizar esta API, sigue los pasos detallados en la documentación incluida en el repositorio. Asegúrate de configurar correctamente las credenciales de correo electrónico y cualquier otro parámetro necesario antes de utilizarla en tu proyecto.

POST /api/send_email

{
    "to": "destinatario@example.com",
    "subject": "Asunto del Correo Electrónico",
    "text": "Contenido del mensaje"
}

