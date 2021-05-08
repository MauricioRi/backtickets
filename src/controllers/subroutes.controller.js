const SubrouteModel = require('../models/subroute.model');
const SpecialModel = require("../models/special.model");
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class SubrouteController {

    findAllSubroutes = async(req, res, next) => {
        let subrouteList = await SubrouteModel.find({
            id_route: req.params.id
        });
        if (!subrouteList.length) {
            throw new HttpException(404, 'Users not found');
        }

        res.send(subrouteList);
    };

    findAllSoubrouteEdit = async(req, res, next) => {
        // let subrouteList = await SubrouteModel.find({
        //     id_route: req.params.id
        // });
console.log(`
SELECT 
    sr.name_subroutes, 
    sr.minimum_rate, 
    sr.amoun_subroutine,
    sr.geofence_origin,
    sr.geofence_destination
    gfo.name,
    gfd.name as nameGfd
FROM subroutes sr
INNER JOIN geofences gfo
ON gfo.id_geofence = sr.geofence_origin
INNER JOIN geofences gfd
ON gfd.id_geofence = sr.geofence_destination
WHERE sr.id_route = ${req.params.id}
`);
        let subrouteList = await SpecialModel.rowQuery(`
            SELECT 
                sr.name_subroutes, 
                sr.minimum_rate, 
                sr.amoun_subroutine,
                sr.geofence_origin,
                sr.geofence_destination
                gfo.name,
                gfd.name as nameGfd
            FROM subroutes sr
            INNER JOIN geofences gfo
            ON gfo.id_geofence = sr.geofence_origin
            INNER JOIN geofences gfd
            ON gfd.id_geofence = sr.geofence_destination
            WHERE sr.id_route = ${req.params.id}
        `);

        if (!subrouteList.length) {
            throw new HttpException(404, 'Users not found');
        }

        let arrSubroute = [];

        subrouteList.forEach((element, index) => {

            arrSubroute.push([
                element.name_subroutes,
                element.geofence_origin,
                element.name,
                element.geofence_destination,
                element.nameGfd,
                element.minimum_rate,
                element.amoun_subroutine
            ]);

            if (index == (subrouteList.length - 1)) {

                res.status(200).send({
                    "status": true,
                    "data": arrSubroute
                });

            }
        });

    };

    createSubroute = async(req, res, next) => {

        let data = JSON.parse(req.body.subroutes);
        let id = req.params.id;
        let success = 0;
console.log( data );
        let resultDelete = await SubrouteModel.delete(id);

        data.forEach(async (element, index) =>  {

            const result = await SubrouteModel.create(id, element[0], element[1], element[2], element[3], element[4]);
            if (result) {
                success++;
            }
            if (index == (data.length - 1)) {
                console.log("index",index, data.length);
                if (success >= (data.length)) {
                    console.log("Success",success);
                    return res.status(201).send({
                        "status": true,
                        "message": "Registro exitoso"
                    });
                } else {
                    console.log("Success",success);

                    return res.sendStatus(201).send({
                        "status": false,
                        "message": "Registrado con errores"
                    });
                }
            }
        });

        // if (!result) {
        //     throw new HttpException(500, 'Something went wrong');
        // }

        // res.status(201).send('Subruta creada con éxito');
    };

    updateSubroute = async(req, res, next) => {
        const result = await SubrouteModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Subruta no encontrada' :
            affectedRows && changedRows ? 'Subruta actualizada con éxito' : 'Error al actualizar la subruta';

        res.send({ message, info });
    };

}

module.exports = new SubrouteController;