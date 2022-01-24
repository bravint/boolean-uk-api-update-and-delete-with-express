const express = require("express");

const router = express.Router();

const { createBook, getAllBooks, getBookbyAuthor, getBookbyType, getBookById, updateOneById, updateOneByTitle } = require("./controller");

router.put("/:id", updateOneById)

router.put("/title/:title", updateOneByTitle)

router.post("/", createBook);

router.get("/", getAllBooks);

router.get('/author/:author', getBookbyAuthor)

router.get('/fiction', getBookbyType)

router.get("/non-fiction", getBookbyType)

router.get("/:id", getBookById);


module.exports = router;