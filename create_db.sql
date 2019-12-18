CREATE TABLE book (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(250) NOT NULL,
    author VARCHAR (100),
    googleid VARCHAR(20) UNIQUE
);

CREATE TABLE user_info (
	id SERIAL NOT NULL primary key,
	username varchar(80) NOT NULL UNIQUE,
    password varchar(120) NOT NULL
);

CREATE TABLE book_user (
	user_id int NOT NULL REFERENCES user_info(id),
	book_id VARCHAR(20) NOT NULL REFERENCES book(googleid),
	PRIMARY KEY (user_id, book_id),
	is_owned BOOLEAN,
	is_read BOOLEAN,
	is_wishlist BOOLEAN,
	date_read DATE
);

CREATE USER bookcataloguser WITH PASSWORD 'read';
GRANT SELECT, INSERT, UPDATE ON book TO bookcataloguser;
GRANT USAGE, SELECT ON SEQUENCE book_id_seq TO bookcataloguser;

GRANT SELECT, INSERT, UPDATE ON user_info TO bookcataloguser;
GRANT USAGE, SELECT ON SEQUENCE user_info_id_seq TO bookcataloguser;

GRANT SELECT, INSERT, UPDATE ON book_user TO bookcataloguser;


SELECT book.id AS id, book.title AS title,
book.author AS author, book.googleID AS googleID,
book_user.is_read AS read, book_user.is_owned AS owned,
book_user.is_wishlist AS wishlist, book_user.date_read AS dateread
FROM book_user
INNER JOIN book ON book_user.book_id = book.googleid
INNER JOIN user_info ON book_user.user_id = user_info.id;



