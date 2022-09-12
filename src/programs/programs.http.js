const programControllers = require("./programs.controller");

//D.1_A:OBTENER TODOS LOS PROGRAMAS
const getAll = (req, res) => {
  {
    const data = programControllers.getAllPrograms();
    res.status(200).json({ items: data.length, programs: data });
  }
};

//D.1_B:CREAR PROGRAMAS
// {
//     "title": "DRAGON BALL",
//     "description":
//       "Goku y sus historias",
//     "seasons": 4,
//     "cover": "url_to_img",
//     "categories": ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"]
// }
const create = (req, res) => {
  const data = req.body;
  if (!data) {
    return res
      .status(400)
      .json({ message: "Falta data para registrar tu programa" });
  } else if (
    !data.title ||
    !data.description ||
    !data.seasons ||
    !data.cover ||
    !data.categories
  ) {
    return res.status(400).json({
      message: "Todos los campos deben de estar llenos ",
      fields: {
        title: "string",
        description: "string",
        seasons: "number",
        cover: "url_to_img",
        categories: "array",
      },
    });
  } else {
    const response = programControllers.createProgram(data);
    return res.status(201).json({
      message: `Programa creado con el id: ${response.id}`,
      program: response,
    });
  }
};

//D.2_A:OBTENER UN PRORAMA EN ESPECIFICO
const getById = (req, res) => {
  const id = req.params.id;
  const data = programControllers.getProgramById(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "No existe el id ingresado" });
  }
};

//D.2_B:EDITAR UN PROGRAMA
const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;


  const response = programControllers.editProgram(id, data);
  if(response){
      return res.status(200).json({
          message: "Programa editado correctamente",
          prorama_edited: response,
        });
  }else{
      return res.status(400).json({
         message:'Id ingresado no existe'
      })
  }
 
//    if (
//     !data.title ||
//     !data.description ||
//     !data.seasons ||
//     !data.cover ||
//     !data.categories
//   ) {
//     return res.status(400).json({
//       message: "Todos los campos deben de estar llenos ",
//       fields: {
//         title: "string",
//         description: "string",
//         seasons: "number",
//         cover: "url_to_img",
//         categories: "array",
//       },
//     });
//   } else {
//     const response = programControllers.editProgram(id, data);

// if(response){
//     return res.status(200).json({
//         message: "Programa editado correctamente",
//         prorama_edited: response,
//       });
// }else{
//     return res.status(400).json({
//         message:'Id ingresado no existe'
//     })
// }
  
//   }

};

//C.2_C:ELIMINAR UN PROGRAMA
const remove=(req,res)=>{
    const id=req.params.id
    const data=programControllers.deleteProgram(id)

    if (data) {
        return res.status(204).json();
      } else {
        return res.status(400).json({ message: "Id del prorama invalido" });
      }
}




module.exports = {
  getAll,
  create,
  getById,
  edit,
  remove
  
  
};
