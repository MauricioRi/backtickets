const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class RoutesModel {
    tableName = "routes";

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if(!Object.keys(params).length){
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }
    findbyId = async ({id_user}) => {
        //const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName} as rt inner join users_routes as usr
         on rt.idroutes	=usr.id_route	
        WHERE id_user=?`;
        console.log(sql);
        const result = await query(sql, [id_user]);

        // return back the first row (user)
        return result;
    }

    create = async ({ Name_route, description }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( Name_route, description) VALUES (?,?)`;
console.log(sql);
        const result = await query(sql, [Name_route, description]);
        const affectedRows = result ? result.insertId : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }
}

module.exports = new RoutesModel;