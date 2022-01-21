const db = require('../../utils/database');
const { buildAnimalDatabase } = require('../../utils/mockData');

function Pet() {
    function createTable() {
        const sql = `
      DROP TABLE IF EXISTS pets;

      CREATE TABLE IF NOT EXISTS pets (
        id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL
      );
    `;

        return db
            .query(sql)
            .then(() => console.log('[DB] Pet table ready.'))
            .catch(console.error);
    }

    function mockData() {
        const createPet = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

        const pets = buildAnimalDatabase();

        pets.forEach((pet) => {
            db.query(createPet, Object.values(pet));
        });
    }

    const createPet = (pet) => {
        const createPet = `
    INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

        return db
            .query(createPet, Object.values(pet))
            .then((result) => result.rows[0])
            .catch(console.error);
    };

    const getPetById = (id) => {
        const getOneById = `
    SELECT * FROM pets WHERE id = $1;
    `;

        return db
            .query(getOneById, [id])
            .then((result) => result.rows[0])
            .catch(console.error);
    };

    const getAllPets = () => {
        const getAll = `
    SELECT * FROM pets;
    `;

        return db
            .query(getAll)
            .then((result) => result.rows)
            .catch(console.error);
    };

    const getFilteredPets = (query) => {
        const columnName = Object.keys(query)[0];
        const getFilteredPets = `
    SELECT * FROM pets WHERE ${columnName} = $1;
        `;
        return db
            .query(getFilteredPets, Object.values(query))
            .then((result) => result.rows)
            .catch(console.error);
    };

    const init = () => {
        createTable().then(() => {
            console.log('\nCreating mock data for Pets...\n');
            mockData();
        });
    };

    const getPetsbyType = (type) => {
        const getPetsbyType = `
    SELECT * FROM pets WHERE type = $1;
        `;
        return db
            .query(getPetsbyType, [type])
            .then((result) => result.rows)
            .catch(console.error);
    };

    const getFilteredPetsbyType = (type, query) => {
        const columnName = Object.keys(query)[0];
        const columnValue = Object.values(query)[0];
        const getFilteredPetsbyType = `
    SELECT * FROM pets WHERE type = $1 AND ${columnName} = $2;
            `;
        return db
            .query(getFilteredPetsbyType, [type, columnValue])
            .then((result) => result.rows)
            .catch(console.error);
    };

    const getPetsTypeList = () => {
        const getPetsTypeList = `
    SELECT DISTINCT type FROM pets ;
        `;
        return db
            .query(getPetsTypeList)
            .then((result) => result.rows)
            .catch(console.error);
    };

    return {
        init,
        createPet,
        getPetById,
        getAllPets,
        getFilteredPets,
        getPetsbyType,
        getFilteredPetsbyType,
        getPetsTypeList,
    };
}

module.exports = Pet;
