const query = require('../db/db-connection');
const MysqlException = require('../utils/MysqlException.utils');

class SpecialModel {

    wordsNoAuthorized = [
        "INSERT",
        "DELETE",
        "UPDATE",
        "DROP",
        "TRUNCATE",
        "ALTER",
        "TABLE"
    ];

    rowQuery = async({ sql = "" }) => {
        if (sql.length == 0)
            throw new MysqlException(500, "Error al obtener la información deseada", "ERROR: INCORRECT COMMAND SQL");

        this.wordsNoAuthorized.forEach(peticion => {
            if (sql.includes(peticion))
                throw new MysqlException(401, "Sentencia invalida", "ERROR: INVALID COMMAND SQL, PLEASE TRY AGAIN");
        });

        return await query(sql);
    }

}

module.exports = new SpecialModel;