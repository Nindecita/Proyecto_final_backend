psql -U postgres;

CREATE DATABASE babiesmarket;

\c babiesmarket

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    name VARCHAR(100),
    last_name VARCHAR(100),
    nick_name VARCHAR(50),
    image VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    name_category VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE publications(
    publication_id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
    price INTEGER,
    category_id BIGINT REFERENCES categories(category_id),
    description TEXT,
    image VARCHAR(255), 
    state BOOLEAN,
    title VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    publication_id BIGINT REFERENCES publications(publication_id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
    comment VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
    state BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_details(
    order_detail_id SERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(order_id) ON DELETE CASCADE,
    publication_id BIGINT REFERENCES publications(publication_id) ON DELETE CASCADE,
    price INTEGER,
    quantity INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
