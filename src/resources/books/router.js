const express = require("express");

const router = express.Router();

const { createBook, getAllBooks, getBookbyAuthor, getBookbyType, getBookById, } = require("./controller");

router.post("/", createBook);

router.get("/", getAllBooks);

router.get('/author/:author', getBookbyAuthor)

router.get('/fiction', getBookbyType)

router.get("/non-fiction", getBookbyType)

router.get("/:id", getBookById);


module.exports = router;