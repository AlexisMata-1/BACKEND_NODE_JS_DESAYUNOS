import { Router } from "express";

import { loginByEmail} from '../controllers/login.controller.js'

const router = Router()

router.post('/Login', loginByEmail)

export default router