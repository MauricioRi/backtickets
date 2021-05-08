const RoutesModel = require('../models/routes.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class routeController {
    getAllRoutes = async(req, res, next) => {
        let routeList = await RoutesModel.find();
        if (!routeList.length) {
            throw new HttpException(404, 'Users not found');
        }

        res.send(routeList);
    };

    getRouteByName = async(req, res, next) => {
        const routes = await RoutesModel.findOne({
            Name_route: req.body.Name_route
        });
        if (!routes) {
            throw new HttpException(404, 'User not found');
        }

        res.send(routes);
    };
    getRouteById = async(req, res, next) => {
        console.log(req.body);
        const routes = await RoutesModel.findbyId(req.body);
        if (!routes) {
            throw new HttpException(404, 'Route not found');
        }

        res.send(routes);
    };
    getRoutesByUser = async(req, res, next) => {
        const routes = await RoutesModel.findOne({
            "idroutes": req.params.id
        });
        if (!routes) {
            throw new HttpException(404, 'User not found');
        }

        res.send({ "data": routes });
    };
    createNewRoute = async(req, res, next) => {
        const result = await RoutesModel.create(req.body);
console.log(result);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({
            status: 200,
            message: "Ruta creada con éxito",
            id: result
        });
    }

    updateRoute = async(req, res, next) => {
        const result = await RoutesModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Ruta no encontrada' :
            affectedRows && changedRows ? 'Ruta actualizada con éxito' : 'Error al actualizar la ruta';

        res.send({ message, info });
    }
}

module.exports = new routeController;