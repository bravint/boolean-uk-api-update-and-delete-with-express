const express = require('express');

const router = express.Router();

const {
    createPet,
    getPets,
    getPetsbyType,
    getPetsTypeList,
    getPetById,
} = require('./controller');

router.post('/', createPet);

router.get('/', getPets);

router.get('/dog', getPetsbyType);

router.get('/cat', getPetsbyType);

router.get('/snake', getPetsbyType);

router.get('/horse', getPetsbyType);

router.get('/bird', getPetsbyType);

router.get('/rabbit', getPetsbyType);

router.get('/types', getPetsTypeList);

router.get('/:id', getPetById);

module.exports = router;
