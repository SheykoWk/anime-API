const uuid = require("uuid");

const programsDB = [
    {
        id: "88ebed0b-8095-4190-adde-d1165ca48815",
        title: "Boku no hero academia",
        description:
            "Las personas no nacen igual. El protagonista de esta historia es uno de esos casos raros que nacen sin superpoderes, pero esto no le impedirá perseguir su sueño: ser un gran héroe como el legendario All-Might. Para convertirse en el héroe que quiere ser, se apuntará a una de las academias de héroes más prestigiosas del país: Yueiko. Con la ayuda de su ídolo, All-Might, ¿podrá convertirse en un verdadero héroe?",
        seasons: 4,
        cover: "localhost:8000/media/covers/bnha-cover-1.jpg",
        categories: [
            "Acción",
            "Comedia",
            "Escolares",
            "Shounen",
            "Superpoderes",
        ],
    },
    {
        id: "3e699fce-bfaa-419f-a0f3-3d73e1442a8b",
        title: "Kureimoa (Claymore)",
        description:
            "Claymore nos sitúa en un mundo medieval acosado por una raza de demonios conocidos como Yoma. Estos demonios tienen la habilidad de cambiar de forma y se han disfrazados como humanos para infiltrarse en las aldeas y poder alimentarse de sus entrañas. Para hacerles frente nace una organización que busca crear guerreros con habilidades especiales mezclando piel y sangre de Yoma con humanos. Como resultado, estos guerreros, llamados Claymore, ganan fuerza sobrenatural, habilidad para cambiar de forma y rápida sanación. Por otra parte, cuentan con espadas que les permiten identificar a los Yoma de aldeanos comunes y silvestres. Debido a su naturaleza, los Claymore son usualmente temidos por los propios aldeanos que logran salvar... ",
        seasons: 1,
        cover: "localhost:8000/media/covers/claymore-cover-1.jpg",
        categories: ["Acción", "Aventuras", "Fantasía medieval", "Drama"],
    },
];

const getAllPrograms = () => {
    return programsDB;
};

const getProgramById = id => {
    const data = programsDB.filter(program => program.id === id);
    return data.length ? data.at(0) : false;
};

const createProgram = data => {
    const newProgram = {
        id: uuid.v4(),
        title: data.title,
        description: data.description,
        seasons: data.seasons,
        cover: data.cover,
        categories: data.categories,
    };
    programsDB.push(newProgram);
    return newProgram;
};

const deleteProgram = id => {
    const index = programsDB.findIndex(program => program.id === id);
    if (index !== -1) {
        programsDB.splice(index, 1);
        return true;
    }
    return false;
};

const editProgram = (id, data) => {
    const index = programsDB.findIndex(program => program.id === id);

    if (index !== -1) {
        const editedProgram = {
            id: id,
            title: data.title ? data.title : programsDB[index].title,
            description: data.description
                ? data.description
                : programsDB[index].description,
            seasons: data.seasons ? data.seasons : programsDB[index].seasons,
            cover: data.cover ? data.cover : programsDB[index].cover,
            categories: data.categories
                ? data.categories
                : programsDB[index].categories,
        };
        programsDB[index] = editedProgram;
        return programsDB[index];
    }
    return false;
};

const editProgramCover = (programID, coverUrl) => {
    const index = programsDB.findIndex(program => program.id === programID);
    if (index !== -1) {
        programsDB[index].cover = coverUrl;
        return programsDB[index];
    }
    return false;
};

module.exports = {
    getAllPrograms,
    getProgramById,
    createProgram,
    deleteProgram,
    editProgram,
    editProgramCover,
};
