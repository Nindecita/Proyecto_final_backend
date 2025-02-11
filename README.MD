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

   ```

2. Instala las dependencias

   ```bash
   npm install

   ```

3. Crea la base de datos ver archivo data_base.sql

4. Crea archivo .env en la raiz del proyecto y agrega variables de entorno para conectar la db y secretos

   ```yaml
   DB_HOST=
   USER_DB=
   PASSWORD_DB=
   NAME_DATABASE=
   PORT=
   JWT_SECRET=
   ```

5. Crea datos de prueba ejecuta:

   ```bash
   npm run seed

   ```

6. Para ejecutar test se debe tener la db creada y cargados los datos de prueba, para ejecutar:
   ```bash
   npm run test
   ```

## Rutas API

## Publications

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
    ```

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
    ```
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
    ```

- GET /api/find_publication_by_id/:publication_id
  - Descripcion: Busca una Publicación por su id
  - requiere autenticacion: true
  - Respuesta:
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
    ```
- GET /api/publication_user_by_id/:user_id
  - Descripcion: Busca una Publicación por el user_id
  - requiere autenticacion: true
  - respuesta:
    ```json
    {
      "publication_id": 7,
      "user_id": "10",
      "price": 100,
      "category_id": "7",
      "description": "Descripción de la publicación 1",
      "image": "image1.jpg",
      "state": true,
      "title": "Publicación 1",
      "created_at": "2025-02-06T18:29:16.200Z"
    }
    ```
- DELETE /api/delete_publication/:publication_id
  - Descripcion: Elimina una Publicación por su id
  - requiere autenticacion: true
  - respuesta:
- Responde con un 204 No content

- PUT /api/update_publication/:publication_id
  - Descripcion: Modifica una publicación
  - requiere autenticacion: true
  - payload:
    ```json
    {
      "user_id": 12,
      "price": 200,
      "category_id": 9,
      "description": "esta es una descripcion",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH0H2fQQ6DJjOB95PxNEfu--LG9ljXEwGT5w&s",
      "state": true,
      "title": "zapatos bebe numero 25"
    }
    ```
  - respuesta:
    ```json
    {
      "publication_id": 10,
      "user_id": "13",
      "price": 100,
      "category_id": "9",
      "description": "esta es una descripcion",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH0H2fQQ6DJjOB95PxNEfu--LG9ljXEwGT5w&s",
      "state": true,
      "title": "zapatos gateadores numero 25",
      "created_at": "2025-02-06T19:14:54.719Z"
    }
    ```

## Orders

- POST /api/create_order

  - Descripcion: Crea una orden
  - requiere autenticacion: true
  - payload:
    ```json
    {
      "user_id": "15",
      "state": true
    }
    ```
  - respuesta:
    ```json
    {
      "order_id": 4,
      "user_id": "15",
      "state": true,
      "created_at": "2025-02-11T14:52:28.300Z"
    }
    ```

- GET /api/find_order_by_id/:order_id

  - Descripcion: Busca una orden por order_id
  - requiere autenticacion: true
  - respuesta:
    ```json
    {
      "order_id": 4,
      "user_id": "15",
      "state": true,
      "created_at": "2025-02-11T14:52:28.300Z"
    }
    ```

- DELETE /api/delete_order/:order_id

  - Descripcion: Elimina una Publicación por su order_id
  - requiere autenticacion: true
  - respuesta:

- Responde con un 204 No content

- PUT /api/update_order/:order_id

  - Descripcion: Modifica el estado de una orden
  - requiere autenticacion: true
  - respuesta:
    ```json
    {
      "order_id": 5,
      "user_id": "15",
      "state": false,
      "created_at": "2025-02-11T14:59:41.046Z"
    }
    ```

## Order_details

- POST /api/create_order_detail

- Descripcion: Crea una orden de detalle

  - requiere autenticacion: true
  - payload:
    ```json
    {
      "order_id": 4,
      "publication_id": 10,
      "price": 10,
      "quantity": 3
    }
    ```
  - respuesta:
    ```json
    {
      "order_detail_id": 3,
      "order_id": "4",
      "publication_id": "10",
      "price": 10,
      "quantity": 3,
      "created_at": "2025-02-11T15:28:56.338Z"
    }
    ```

- GET /api/find_order_detail_by_id/:order_detail_id

  - Descripcion: Busca la orden de detalle por order_detail_id
  - requiere autenticacion: true
  - respuesta:
    ```json
    {
      "order_detail_id": 3,
      "order_id": "4",
      "publication_id": "10",
      "price": 10,
      "quantity": 3,
      "created_at": "2025-02-11T15:28:56.338Z"
    }
    ```

- DELETE /api/delete_order_detail/:order_detail_id

  - Descripcion: Elimina la orden de detalle por su order_detail_id
  - requiere autenticacion: true
  - respuesta:

- Responde con un 204 No content

- PUT /api/update_order_detail/:order_detail_id

  - Descripcion: Modifica la orden de detalle
  - requiere autenticacion: true
  - payload:
    ```json
    {
      "publication_id": 3,
      "price": 200,
      "quantity": 4
    }
    ```

- respuesta:
  ```json
  {
    "order_detail_id": 5,
    "order_id": "4",
    "publication_id": "10",
    "price": 200,
    "quantity": 10,
    "created_at": "2025-02-11T15:38:40.171Z"
  }
  ```

## Comments

- POST /api/create_comment

- Descripcion: Crea un comentario

  - requiere autenticacion: true
  - payload:
    ```json
    {
      "publication_id": 10,
      "user_id": 14,
      "comment": "este es un comentario"
    }
    ```

- respuesta:
  ```json
  {
    "comment_id": 12,
    "publication_id": "10",
    "user_id": "14",
    "comment": "este es un comentario",
    "created_at": "2025-02-11T15:45:48.216Z"
  }
  ```
- GET /api/find_comment_by_id/:comment_id

  - Descripcion: Busca un comentario por su comment_id
  - requiere autenticacion: true
  - respuesta:

    ```json
    {
      "comment_id": 9,
      "publication_id": "10",
      "user_id": "12",
      "comment": "Comentario de Juan sobre la publicación de Ana",
      "created_at": "2025-02-06T19:14:54.719Z"
    }
    ```

  - DELETE /api/delete_comment/:comment_id

  - Descripcion: Elimina un comentario por su comment_id
  - requiere autenticacion: true
  - respuesta:

- Responde con un 204 No content

- PUT /api/update_comment/:comment_id

  - Descripcion: Modifica la orden de detalle
  - requiere autenticacion: true
  - payload:
    ```json
    {
      "publication_id": 10,
      "user_id": 14,
      "comment": "modifico este comentario por 3era vez"
    }
    ```
    -respuesta:
    ```json
    {
      "message": "Comentario actualizado con éxito",
      "data": {
        "comment_id": 12,
        "publication_id": "10",
        "user_id": "14",
        "comment": "modifico este comentario por 4ta vez",
        "created_at": "2025-02-11T15:45:48.216Z"
      }
    }
    ```

## Users

- POST /api/create_user

- Descripcion: Crea un usuario

  - requiere autenticacion: false
  - payload:
    ```json
    {
      "email": "pacita@text.com",
      "password": "papaya30",
      "name": "Pacita",
      "lastName": "Arancibia",
      "nick_name": "Nindecita",
      "image": "esto es una imagen"
    }
    ```
    -respuesta:
    ```json
    {
      "user_id": 21,
      "email": "pacita@text.com",
      "password": "$2a$10$9h/3k1jh07OKHuwpujN5weFAO/QWWldO3bELKXBgIT1xGnBrIW5/C",
      "name": "Pacita",
      "last_name": "Arancibia",
      "nick_name": "Nindecita",
      "image": "esto es una imagen",
      "created_at": "2025-02-11T16:07:30.256Z"
    }
    ```

- GET /api/find_user_by_id/:user_id

- Descripcion: Busca un usuario por su user_id
- requiere autenticacion: true
  - respuesta:
  ```json
  {
    "user_id": 14,
    "email": "paran@text.com",
    "password": "$2a$10$TVW28uxxE2FujTSeHSUU.eqUWW3/xhc3QGNO6vr97.nmB7DYoQlOC",
    "name": "paz",
    "last_name": "arancibia",
    "nick_name": "ninde",
    "image": "https://logowik.com/content/uploads/images/nodejs.jpg",
    "created_at": "2025-02-06T19:28:40.969Z"
  }
  ```
- DELETE /api/delete_user/:user_id

- Descripcion: Elimina un usuario por su user_id
- requiere autenticacion: true

  - respuesta:
  - Responde con un 204 No content

- PUT /api/update_user/:user_id

  - Descripcion: Modifica datos del usuario por su user_id
  - requiere autenticacion: true
  - payload:
    ```json
    {
      "email": "paran@text.com",
      "name": "paz",
      "last_name": "arancibia",
      "nick_name": "ninde",
      "image": "http de la imagen"
    }
    ```
  - respuesta:
    ```json
    {
      "user_id": 14,
      "email": "paran@text.com",
      "password": "$2a$10$TVW28uxxE2FujTSeHSUU.eqUWW3/xhc3QGNO6vr97.nmB7DYoQlOC",
      "name": "Pazita",
      "last_name": "Cabello",
      "nick_name": "Nindecitaa",
      "image": "foto de perfil",
      "created_at": "2025-02-06T19:28:40.969Z"
    }
    ```

## Tecnologías utilizadas

- node v20
- postgresql
- express
- jest

## Contribuciones

- Tomás Corvalan
- Maria Pilar Jerez
- Paz Arancibia
````
