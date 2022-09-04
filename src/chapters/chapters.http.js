const chaptersControllers = require('./chapters.controllers');
const programsControllers =require('../programs/programs.controller');

const getAllChaptersByProgram=(req,res)=>{
  const programId = req.params.programId;
  const response = chaptersControllers.getChaptersByProgram(programId);

  if(response.length)
    res.status(200).json({items:response.length,response})
  
  res.status(404).json({message:`The program with id ${programId} doesn't exist`})
  
}

// const create=(req,res)=>{
//   const programId = req.params.programId;
//   const program = programsControllers.getProgramById(programId);

//   if(program.length){
//     const data =req.body
//     const response =chaptersControllers.createChapter(program[0].id);
//   }
// }

module.exports={
  getAllChaptersByProgram,
  
}
