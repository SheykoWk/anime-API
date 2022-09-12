const fs = require('fs').promises
const path = require("path")

const removeFile = async (pathFile) => {
    try {
        await fs.unlink(path.resolve(`uploads/${pathFile.split("uploads/")[1]}`))
        return true
    } catch(err) {
        console.log(`Something wrong happened removing the file ${pathFile} and err: ${err}`)
        return false
    }
}

module.exports = removeFile