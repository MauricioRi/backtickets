const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class SubRouteModel {
    tableName = "subroutes";

    find = async(params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async(params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async(idRoute, nameSR, geofOrgn, geofDest, miniumRate, amountSubroutine) => {
        const sql = `INSERT INTO ${this.tableName}
        (id_route, name_subroutes, geofence_origin, geofence_destination, minimum_rate, amoun_subroutine) VALUES (?,?,?,?,?,?)`;
console.log(sql);
        const result = await query(sql, [idRoute, nameSR, geofOrgn, geofDest, miniumRate, amountSubroutine]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async(params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async(id) => {
        const sql = `DELETE FROM subroutes WHERE id_subroute = ?`;

        const result = await query(sql, [id]);

        return result;
    }
}

module.exports = new SubRouteModel;