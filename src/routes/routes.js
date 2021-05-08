const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.contoller');
const routesController = require('../controllers/routes.controller');
const geofenceController = require('../controllers/geofences.controller');
const subroutesController = require('../controllers/subroutes.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');
// const { createGeofenceSchema, updateGeofenceSchema } = require('../middleware/validators/geofences.validators');
const { createGeofenceSchema, updateGeofenceSchema } = require('../middleware/validators/geofences.validators');



// router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users
// router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1
// router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia
// router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami
// router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users
// router.patch('/id/:id', auth(), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
// router.delete('/id/:id', auth(), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1

router.get("/getCurrentUser", auth(), awaitHandlerFactory(userController.getCurrentUser));
router.post("/getUsers", auth(), awaitHandlerFactory(userController.getUserByuserName));
router.get("/getAllUser", auth(), awaitHandlerFactory(userController.getAllUsers));
router.post("/getRoute", awaitHandlerFactory(routesController.getRouteById));
router.post("/updateUser/:id", auth(), updateUserSchema, awaitHandlerFactory(userController.updateUser));
router.post('/createUser', auth(), createUserSchema, awaitHandlerFactory(userController.createUser));
router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login

router.post('/newGeofence', /*auth(),*/ createGeofenceSchema, awaitHandlerFactory(geofenceController.createGeofences));
router.post('/getAllGeofences', /*auth(),*/ awaitHandlerFactory(geofenceController.findAllGeofences));

router.post('/newRoute', /*auth(),*/ awaitHandlerFactory(routesController.createNewRoute));

router.post('/newSubRoute/:id', /*auth(),*/ awaitHandlerFactory(subroutesController.createSubroute));
router.get('/getAllSubroutes/:id', /*auth(),*/ awaitHandlerFactory(subroutesController.findAllSoubrouteEdit));
router.get('/getRoute/:id', /*auth()*/ awaitHandlerFactory(routesController.getRoutesByUser));

module.exports = router;