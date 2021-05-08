const GeofencesModel = require('../models/geofences.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class GeofencesController {

    findAllGeofences = async(req, res, next) => {
        let geofencesList = await GeofencesModel.find();
        if (!geofencesList.length) {
            throw new HttpException(404, 'Users not found');
        }

        let geofSelect = [];

        geofencesList.forEach((element, index) => {

            geofSelect.push({
                "value": element.id_geofence.toString(),
                "label": element.name
            });

            if (index == geofencesList.length - 1) {

                // geofencesList.selects = geofSelect;
                // // geofencesList.push(geofSelect);

                res.send({
                    "geoFences": geofencesList,
                    "selectG": geofSelect
                });
            }
        });


    };

    findAllGeofencesArea = async(req, res, next) => {
        let geofencesList = await GeofencesModel.find(req.body);
        if (!geofencesList.length) {
            throw new HttpException(404, 'Users not found');
        }

        res.send(geofencesList);
    };

    createGeofences = async(req, res, next) => {
        const result = await GeofencesModel.create(req.body);
        console.log(result);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({
            status: true,
            message: 'Geofence was created!'
        });
    };

    updateGeofences = async(req, res, next) => {
        const result = await GeofencesModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Geofence not found' :
            affectedRows && changedRows ? 'Geofence updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

}

module.exports = new GeofencesController;