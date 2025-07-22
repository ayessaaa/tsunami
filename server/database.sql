CREATE DATABASE tsunami;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE letters (
    id SERIAL PRIMARY KEY,
    from_user_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    music_title VARCHAR(255) NOT NULL,
    music_artist VARCHAR(255) NOT NULL,
    music_img VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_letter_user FOREIGN KEY (from_user_id) REFERENCES users(id)
);

CREATE TABLE replies (
    id SERIAL PRIMARY KEY,
    letter_id INT NOT NULL,
    from_user_id INT NOT NULL,
    reply_number INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    music_title VARCHAR(255) NOT NULL,
    music_artist VARCHAR(255) NOT NULL,
    music_img VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reply_letter FOREIGN KEY (letter_id) REFERENCES letters(id),
    CONSTRAINT fk_reply_user FOREIGN KEY (from_user_id) REFERENCES users(id)
);