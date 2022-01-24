const Pet = require('./model');

const createPet = async (req, res) => {
    const petToCreate = {
        ...req.body,
    };
    const response = await Pet().createPet(petToCreate);
    return res.json(response);
};

const getPets = async (req, res) => {
    const query = req.query;
    let response;
    Object.keys(query).length === 0
        ? (response = await Pet().getAllPets())
        : (response = await Pet().getFilteredPets(query));
    return res.json(response);
};

const getPetsbyType = async (req, res) => {
    let type = req.path.slice(1);
    const query = req.query;
    let response;
    Object.keys(query).length === 0
        ? (response = await Pet().getPetsbyType(type))
        : (response = await Pet().getFilteredPetsbyType(type, query));
    return res.json(response);
};

const getPetsTypeList = async (req, res) => {
    const response = await Pet().getPetsTypeList();
    return res.json(response);
};

const getPetById = async (req, res) => {
    const id = req.params.id;
    const response = await Pet().getPetById(id);
    return res.json(response);
};

const updateOneById = async (req, res) => {
    const pettoUpdate = {
        ...req.body
    };
    const id = parseInt(req.params.id);
    if (booktoUpdate.name) await Pet().updateOneById({"name": pettoUpdate.title}, id)
    if (booktoUpdate.age) await Pet().updateOneById({"age": pettoUpdate.type}, id)
    if (booktoUpdate.type) await Pet().updateOneById({"type": pettoUpdate.author}, id)
    if (booktoUpdate.breed) await Pet().updateOneById({"breed":pettoUpdate.topic}, id)
    if (booktoUpdate.microchip) await Pet().updateOneById({"microchip": pettoUpdate.publicationDate}, id)
    const response = await Pet().getPetById(id);
    return res.json(response);
}

const updateOneByName = async (req, res) => {
    const pettoUpdate = {
        ...req.body
    };
    const name = (req.params);
    if (booktoUpdate.name) await Pet().updateOneByName({"name": pettoUpdate.title}, name)
    if (booktoUpdate.age) await Pet().updateOneByName({"age": pettoUpdate.type}, name)
    if (booktoUpdate.type) await Pet().updateOneByName({"type": pettoUpdate.author}, name)
    if (booktoUpdate.breed) await Pet().updateOneByName({"breed":pettoUpdate.topic}, name)
    if (booktoUpdate.microchip) await Pet().updateOneByName({"microchip": pettoUpdate.publicationDate}, name)
    //const response = await Pet().getBookById(id);
    return res.json(response);
}


module.exports = {
    createPet,
    getPets,
    getPetsbyType,
    getPetsTypeList,
    getPetById,
};
