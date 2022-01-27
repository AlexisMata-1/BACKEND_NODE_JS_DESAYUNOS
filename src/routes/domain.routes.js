import { Router } from "express";

import { createNewDomain , updateDomainById, getDomains , getDomainByName} from '../controllers/domain.controller.js'

const router = Router()

router.get('/Domain', getDomains)

router.post('/Domain', createNewDomain)

router.put('/Domain/:id', updateDomainById)

router.post('/Domains', getDomainByName)


export default router