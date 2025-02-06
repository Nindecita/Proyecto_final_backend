# Backend Node.js - Documentación

## Índice
- [Descripción](#descripción)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Rutas API](#rutas-api)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Contribuciones](#contribuciones)


## Descripción
Este es un backend desarrollado en Node.js para gestionar el marketplace de servicios. Permite manejar usuarios, publicaciones, categorías, comentarios y pedidos, todo a través de una API RESTful. El servidor está construido utilizando **Express.js** y se conecta a una base de datos PostgreSQL.

## Requisitos
- **Node.js** (versión 20 o superior)
- **npm** (o **yarn** como alternativa)
- **PostgreSQL** para la base de datos
- **Postman** o cualquier otra herramienta para probar las rutas API

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Nindecita/Proyecto_final_backend.git

2. Instala las dependencias
   ```bash
   npm install 

3. Crea la base de datos ver archivo data_base.sql

4. Agrega variables de entorno para conectar la db y secretos
    ```yaml
    DB_HOST=
    USER_DB=
    PASSWORD_DB=
    NAME_DATABASE=
    PORT=
    JWT_SECRET=

5. Crea datos de prueba ejecuta:
    ```bash
    npm run seed

6. Para ejecutar test se debe tener la db creada y cargados los datos de prueba, para ejecutar:
    ```bash
    npm run test
## Rutas API

## Publicaciones
- GET /api/publication_all
    - Descripcion: Obtiene todas las publicaciones
    - requiere autenticacion: false
    - Respuesta:
        ```json
        [
            {
                "publication_id": 1,
                "user_id": "4",
                "price": 100,
                "category_id": "1",
                "description": "Descripción de la publicación 1",
                "image": "image1.jpg",
                "state": true,
                "title": "Publicación 1",
                "created_at": "2025-02-06T00:51:16.622Z"
            },
            {
                "publication_id": 2,
                "user_id": "5",
                "price": 200,
                "category_id": "2",
                "description": "Descripción de la publicación 2",
                "image": "image2.jpg",
                "state": true,
                "title": "Publicación 2",
                "created_at": "2025-02-06T00:51:16.625Z"
            }
        ]

- POST /api/create_publication
    - Descripcion: Crea una Publicacion
    - requiere autenticacion: true
    - payload:
        ```json
        {
            "user_id": "5",
            "price": 200,
            "category_id": "2",
            "description": "Descripción de la publicación 2",
            "image": "image2.jpg",
            "state": true,
            "title": "Publicación 2"
        }
    - respuesta:
        ```json
        {
            "publication_id": 2,
            "user_id": "5",
            "price": 200,
            "category_id": "2",
            "description": "Descripción de la publicación 2",
            "image": "image2.jpg",
            "state": true,
            "title": "Publicación 2",
            "created_at": "2025-02-06T00:51:16.625Z"
        }
## Tecnologías utilizadas

- node v20
- postgresql
- express
- jest

## Contribuciones
- Tomás Corvalan
- Maria Pilar Jerez
- Paz Arancibia