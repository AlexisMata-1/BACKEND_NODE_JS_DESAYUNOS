import { Router } from "express";

import { createNewDomain ,getDomains2, updateDomainById,updateDomainById2, getDomains , getDomainByName} from '../controllers/domain.controller.js'

const router = Router()

router.get('/Domain', getDomains)

router.get('/Domains', getDomains2)

router.post('/Domain', createNewDomain)

router.put('/Domain/:id', updateDomainById)

router.put('/Domains/:id', updateDomainById2)

router.post('/Domains', getDomainByName)


export default router