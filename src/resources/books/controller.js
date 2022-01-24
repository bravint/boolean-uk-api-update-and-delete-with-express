const Book = require('./model');

const createBook = async (req, res) => {
    const bookToCreate = {
        ...req.body,
    };
    const response = await Book().createBook(bookToCreate, res);
    return res.json(response);
};

const getAllBooks = async (req, res) => {
    const response = await Book().getAllBooks(res);
    return res.json(response);
};

const getBookById = async (req, res) => {
    const idToGet = parseInt(req.params.id);
    if (isNaN(idToGet)) return res.status(404).send('ERROR: Endpoint does not exist');
    const response = await Book().getBookById(idToGet);
    return res.json(response);
};

const getBookbyType = async (req, res) => {
    let type = req.path.slice(1);
    type = type.replace(/\b\w/g, (l) => l.toUpperCase()) //capitalise each word in string

    const query = req.query;
    let response;
    Object.keys(query).length === 0 
        ? response = await Book().getBookbyType(type)
        : response = await Book().getFilteredBookbyType(type, query)
    return res.json(response);
};

const getBookbyAuthor = async (req, res) => {
    const author = req.params
    const response = await Book().getBookbyAuthor(author);
    return res.json(response);
}

const updateOneById = async (req, res) => {
    const booktoUpdate = {
        ...req.body
    };
    const id = parseInt(req.params.id);
    if (booktoUpdate.title) await Book().updateOneById("title", booktoUpdate.title, id)
    if (booktoUpdate.type) await Book().updateOneById("type", booktoUpdate.type, id)
    if (booktoUpdate.author) await Book().updateOneById("author", booktoUpdate.author, id)
    if (booktoUpdate.topic) await Book().updateOneById("topic", booktoUpdate.topic, id)
    if (booktoUpdate.publicationDate) await Book().updateOneById("publicationDate", booktoUpdate.publicationDate, id)
    const response = await Book().getBookById(id);
    return res.json(response);
}

const updateOneByTitle = async (req, res) => {
    const booktoUpdate = {
        ...req.body
    };
    const title = (req.params);
    if (booktoUpdate.title) await Book().updateOneByTitle("title", booktoUpdate.title, title)
    if (booktoUpdate.type) await Book().updateOneByTitle("type", booktoUpdate.type, title)
    if (booktoUpdate.author) await Book().updateOneByTitle("author", booktoUpdate.author, title)
    if (booktoUpdate.topic) await Book().updateOneByTitle("topic", booktoUpdate.topic, title)
    if (booktoUpdate.publicationDate) await Book().updateOneByTitle("publicationDate", booktoUpdate.publicationDate, title)
    //const response = await Book().getBookByTitle(title);
    return res.json(response);
}

module.exports = {
    createBook,
    getAllBooks,
    getBookbyAuthor,
    getBookById,
    getBookbyType,
    updateOneById,
    updateOneByTitle
};
