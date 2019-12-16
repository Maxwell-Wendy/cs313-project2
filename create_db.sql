CREATE TABLE book (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(250) NOT NULL,
    author VARCHAR (100)
);

INSERT INTO book (title, author)
    VALUES ('Fablehaven', 'Brandon Mull');

INSERT INTO book (title, author)
    VALUES ('The Selection', 'Kiera Cass');

INSERT INTO book (title, author)
    VALUES ('Harry Potter and the Sorcerer&#039;s Stone', 'J. K. Rowling');

CREATE USER bookcataloguser WITH PASSWORD 'read';
GRANT SELECT, INSERT, UPDATE ON book TO bookcataloguser;
GRANT USAGE, SELECT ON SEQUENCE book_id_seq TO bookcataloguser;

ALTER TABLE book
    ADD COLUMN googleid VARCHAR(20) UNIQUE,
    ADD COLUMN isread BOOLEAN,
    ADD COLUMN isowed BOOLEAN,
    ADD COLUMN iswishlist BOOLEAN,
    ADD COLUMN dateread DATE;
