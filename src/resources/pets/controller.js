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
    const idToGet = req.params.id;
    const response = await Pet().getPetById(idToGet);
    return res.json(response);
};

module.exports = {
    createPet,
    getPets,
    getPetsbyType,
    getPetsTypeList,
    getPetById,
};
