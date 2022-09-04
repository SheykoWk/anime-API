require("dotenv").config();

module.exports = {
    port: process.env.PORT || 8000,
    host: process.env.HOST || "localhost",
    phrase: process.env.TOKEN_PHRASE,
};
