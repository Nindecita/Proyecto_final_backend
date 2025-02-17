import bcrypt from "bcryptjs";
import { pool } from "./conection.db.js";
import { faker } from '@faker-js/faker';

async function seed() {
  try {
    console.log("Limpiando db");
    await pool.query(`DELETE FROM order_details;`);
    await pool.query(`DELETE FROM orders;`);
    await pool.query(`DELETE FROM comments;`);
    await pool.query(`DELETE FROM publications;`);
    await pool.query(`DELETE FROM categories;`);
    await pool.query(`DELETE FROM users;`);

    console.log("Cargando data de prueba");

    const hashedPassword1 = await bcrypt.hashSync("password1");
    const hashedPassword2 = await bcrypt.hashSync("password2");

    const user1 = await pool.query(
      `INSERT INTO users (email, password, name, last_name, nick_name)
       VALUES ('usuario1@example.com', $1, 'Juan', 'Pérez', 'juanp')
       RETURNING user_id;`,
      [hashedPassword1]
    );

    const user2 = await pool.query(
      `INSERT INTO users (email, password, name, last_name, nick_name)
       VALUES ('usuario2@example.com', $1, 'Ana', 'González', 'anag')
       RETURNING user_id;`,
      [hashedPassword2]
    );

    const user1Id = user1.rows[0].user_id;
    const user2Id = user2.rows[0].user_id;

    const category1 = await pool.query(
      `INSERT INTO categories (name_category)
       VALUES ('Calzado')
       ON CONFLICT (name_category) DO NOTHING
       RETURNING category_id;`
    );

    const category2 = await pool.query(
      `INSERT INTO categories (name_category)
       VALUES ('Ropa')
       ON CONFLICT (name_category) DO NOTHING
       RETURNING category_id;`
    );
    const category3 = await pool.query(
      `INSERT INTO categories (name_category)
       VALUES ('Juguetes')
       ON CONFLICT (name_category) DO NOTHING
       RETURNING category_id;`
    );
    const category4 = await pool.query(
      `INSERT INTO categories (name_category)
       VALUES ('Accesorios')
       ON CONFLICT (name_category) DO NOTHING
       RETURNING category_id;`
    );
    const category5 = await pool.query(
      `INSERT INTO categories (name_category)
       VALUES ('Muebles')
       ON CONFLICT (name_category) DO NOTHING
       RETURNING category_id;`
    );


    const category1Id = category1.rows[0].category_id;
    const category2Id = category2.rows[0].category_id;
    const category3Id = category2.rows[0].category_id;
    const category4Id = category2.rows[0].category_id;
    const category5Id = category2.rows[0].category_id;

    const publication1 = await pool.query(
      `INSERT INTO publications (user_id, price, category_id, description, image, state, title)
       VALUES ($1, 100, $2, $3, $4, $5, $6)
       RETURNING publication_id;`,
      [user1Id, category1Id, 'Descripción de la publicación 1', faker.image.url(), true, 'Publicación 1']
    );
    

    const publication2 = await pool.query(
      `INSERT INTO publications (user_id, price, category_id, description, image, state, title)
       VALUES ($1, 100, $2, $3, $4, $5, $6)
       RETURNING publication_id;`,
      [user2Id, category2Id, 'Descripción de la publicación 1', faker.image.url(), true, 'Publicación 1']
    );
    

    const publication1Id = publication1.rows[0].publication_id;
    const publication2Id = publication2.rows[0].publication_id;

    await pool.query(
      `INSERT INTO comments (publication_id, user_id, comment)
       VALUES ($1, $2, 'Comentario de Juan sobre la publicación de Ana');`,
      [publication2Id, user1Id]
    );

    await pool.query(
      `INSERT INTO comments (publication_id, user_id, comment)
       VALUES ($1, $2, 'Comentario de Ana sobre la publicación de Juan');`,
      [publication1Id, user2Id]
    );

    console.log("Datos insertados correctamente.");
  } catch (err) {
    console.error("Error al insertar datos:", err);
  }
}

seed();
