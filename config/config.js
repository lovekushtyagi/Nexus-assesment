const path = require("path")
require("dotenv").config({ path: path.join(process.cwd(), ".env") })
const {
    DEV_DB,
} = process.env;

const CONFIG = {
    db: DEV_DB
};

module.exports = { CONFIG };