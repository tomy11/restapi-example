const db = require('../config/database');

const getAll = async (req, res) => {
    try {
        res.status(200).json({data:"hello data"})
    } catch (err) {
        console.log(err)
    }
}

module.exports = {getAll}