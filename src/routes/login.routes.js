import { Router } from "express";

import { loginByEmail, loginByEmails} from '../controllers/login.controller.js'

const router = Router()

router.post('/Login', loginByEmail)

router.post('/Logins', loginByEmails)


export default router