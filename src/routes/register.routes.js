import { Router } from "express";

import { getRegister, createNewRegister, getRegisterByDate, updateRegisterById } from '../controllers/register.controller.js'

const router = Router()

//CONSULTAR TODOS LOS REGISTROS
router.get('/Registers', getRegister)

//CREAR NUEVO REGISTRO
router.post('/Registers', createNewRegister)

//CONSULTAR REGISTR POR FECHA
router.post("/Register/", getRegisterByDate)


// //CONTAR TOTAL DE REGISTROS REGISTRADOS EN BASE DE DATOS
// router.get('/Registers/count', getTotalRegister)


// //ELIMINAR REGISTRO POR ID 
// router.delete("/Registers/:id", deleteRegisterById)

//MODIFICAR REGISTRO POR ID
router.put("/Registers/:id", updateRegisterById)


export default router