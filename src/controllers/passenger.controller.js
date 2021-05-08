const PassengerModel = require('../models/passenger.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class PassengerController {

    findAllPassanger = async (req, res, next) => {
        let passengerList = await PassengerModel.find();
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        res.send(passengerList);
    };

    findAllPassengerByDate = async (req, res, next) => {
        let passengerList = await PassengerModel.find(req.body);
        if (!passengerList.length) {
            throw new HttpException(404, 'Users not found');
        }

        res.send(passengerList);
    }

    createPassenger = async (req, res, next) => {
        req.date_travel = Date();
        req.id_usersystem = req.currentUser.user_id;
        const result = await PassengerModel.create(req.body);
console.log(result);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({
            status: true,
            message: 'Passanger was created!'
        });
    }

    updatePassenger = async (req, res, next) => {
        const result = await PassengerModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Passenger not found' :
            affectedRows && changedRows ? 'Passenger updated successfully' : 'Updated faild';

        res.send({ message, info });
    }

    deletePassenger = async (req, res, next) => {
        const result = await PassengerModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Passenger not found');
        }
        res.send('Passenger has been deleted');
    }

}

module.exports = PassengerController;