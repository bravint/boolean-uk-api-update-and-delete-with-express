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
    const idToGet = req.params.id;
    const response = await Book().getBookById(idToGet);
    return res.json(response);
};

const getBookbyType = async (req, res) => {
    let type = req.path.slice(1);
    type = type.replace(/\b\w/g, (l) => l.toUpperCase())

    const query = req.query;
    let response;
    Object.keys(query).length === 0 
        ? response = await Book().getBookbyType(type)
        : response = await Book().getFilteredBookbyType(type, query)
    return res.json(response);
};

const getBookbyAuthor = async (req, res) => {
    console.log(req)
    const author = req.params
    const response = await Book().getBookbyAuthor(author);
    return res.json(response);
}

module.exports = {
    createBook,
    getAllBooks,
    getBookbyAuthor,
    getBookById,
    getBookbyType
};
