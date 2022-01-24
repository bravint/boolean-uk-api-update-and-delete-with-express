const db = require('../../utils/database');
const { buildBooksDatabase } = require('../../utils/mockData');

function Book() {
    function createTable() {
        const sql = `
            DROP TABLE IF EXISTS books;
            
            CREATE TABLE IF NOT EXISTS books (
                id              SERIAL        PRIMARY KEY,
                title           VARCHAR(255)   NOT NULL,
                type            VARCHAR(255)   NOT NULL,
                author          VARCHAR(255)   NOT NULL,
                topic           VARCHAR(255)   NOT NULL,
                publicationDate DATE           NOT NULL
            );
        `;
        return db
            .query(sql)
            .then(() => console.log('[DB] Book table ready.'))
            .catch(console.error);
    }

    function mockData() {
        const createBook = `
            INSERT INTO books
                (title, type, author, topic, publicationDate)
            VALUES
                ($1, $2, $3, $4, $5)
        `;

        const books = buildBooksDatabase();

        books.forEach((book) => {
            db.query(createBook, Object.values(book)).catch(console.error);
        });
    }

    const createBook = (book) => {
        const createBook = `
            INSERT INTO books 
                (title, type, author, topic, publicationDate) 
            VALUES 
                ($1, $2, $3, $4, $5) RETURNING *
        `;
        return db
            .query(createBook, Object.values(book))
            .then((result) => result.rows[0])
            .catch(console.error);
    };

    const getBookById = (id) => {
        const getOneById = `
            SELECT *
            FROM books
            WHERE id = $1;
        `;
        return db
            .query(getOneById, [id])
            .then((result) => result.rows[0])
            .catch(console.error);
    };

    const getAllBooks = () => {
        const getAll = `
            SELECT *
            FROM books;
        `;
        return db
            .query(getAll)
            .then((result) => result.rows)
            .catch(console.error);
    };

    const getBookbyType = (type) => {
        const getBookbyType = `
            SELECT * 
            FROM books 
            WHERE type 
            LIKE $1;
        `;
        return db
            .query(getBookbyType, [type])
            .then((result) => result.rows)
            .catch(console.error);
    };

    const getFilteredBookbyType = (type, query) => {
        const columnName = Object.keys(query)[0];
        const columnValue = Object.values(query)[0];
        const getFilteredBookbyType = `
            SELECT * 
            FROM books 
            WHERE type = $1 
            AND ${columnName} = $2;
        `;
        return db
            .query(getFilteredBookbyType, [type, columnValue])
            .then((result) => result.rows)
            .catch(console.error);
    };

    const init = () => {
        createTable().then(() => {
            console.log(`\nCreating mock data for Books...\n`);
            mockData();
        });
    };

    const getBookbyAuthor = (author) => {
        const getBookbyAuthor = `
            SELECT * 
            FROM books 
            WHERE author = $1 
            ORDER BY publicationDate DESC; 
        `;
        return db
            .query(getBookbyAuthor, [author.author])
            .then((result) => result.rows)
            .catch(console.error);
    };

    const updateOneById = (columnName, columnValue, id) => {
        const updateOneById =  `
            UPDATE books 
            SET ${columnName} = $1        
            WHERE id = ${id};
        `;
    return db
        .query(updateOneById, [columnValue])
        .then((result) => result.rows[0])
        .catch(console.error);
    }

    
    const updateOneByTitle = (columnName, columnValue, title) => {
        const updateOneByTitle =  `
            UPDATE books 
            SET ${columnName} = $1        
            WHERE title = ${title};
        `;
    return db
        .query(updateOneByTitle, [columnValue])
        .then((result) => result.rows[0])
        .catch(console.error);
    }

    return {
        init,
        createBook,
        getBookById,
        getAllBooks,
        getBookbyType,
        getFilteredBookbyType,
        getBookbyAuthor,
        updateOneById,
        updateOneByTitle
    };
}

module.exports = Book;
