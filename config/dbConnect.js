const { connect } = require('mongoose');
const { CONFIG } = require('./config');
const colors = require('colors');

const InitDBConnection = async () => {
    const DB = CONFIG.db;
    try {
        await connect(DB);
        console.log(`${colors.yellow('Database connected')}`);
    }
    catch (err) {
        throw err;
    }
}

module.exports = InitDBConnection;