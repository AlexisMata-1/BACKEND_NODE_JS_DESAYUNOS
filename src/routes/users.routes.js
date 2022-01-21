import {Router} from 'express'

import {createNewUser, getUsers, getUserById, deleteUserById, getTotalUsers,updateUserById} from '../controllers/users.controller.js'

const router = Router()

//CONSULTAR TODOS LOS USUARIOS
router.get('/Users', getUsers)

//CREAR NUEVO USUARIO
router.post('/Users', createNewUser)

//CONTAR TOTAL DE USUARIOS REGISTRADOS EN BASE DE DATOS
router.get('/Users/count', getTotalUsers)

//CONSULTAR USUARIO POR ID
router.get("/Users/:id", getUserById)

//ELIMINAR USUARIO POR ID 
router.delete("/Users/:id", deleteUserById)

//MODIFICAR USUARIO POR ID
router.put("/Users/:id", updateUserById)


export default router