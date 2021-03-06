import { Router } from "express";

import { getRegister, createNewRegister, getRegisterByDate,getRegisterByDate2, updateRegisterById } from '../controllers/register.controller.js'

const router = Router()

//CONSULTAR TODOS LOS REGISTROS
router.get('/Registers', getRegister)

//CREAR NUEVO REGISTRO
router.post('/Registers', createNewRegister)

//CONSULTAR REGISTR POR FECHA EN CALENDARIO
router.post("/Register/", getRegisterByDate)

//CONSULTAR REGISTR POR FECHA EN REPORTES
router.post("/Registerr/", getRegisterByDate2)

// //CONTAR TOTAL DE REGISTROS REGISTRADOS EN BASE DE DATOS
// router.get('/Registers/count', getTotalRegister)


// //ELIMINAR REGISTRO POR ID 
// router.delete("/Registers/:id", deleteRegisterById)

//MODIFICAR REGISTRO POR ID
router.put("/Registers/:id", updateRegisterById)


export default router