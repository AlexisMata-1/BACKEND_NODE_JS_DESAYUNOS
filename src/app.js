import express from 'express'
import config from './config.js'
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import registerRoutes from "./routes/register.routes.js";
import loginRoutes from "./routes/login.routes.js";

const app = express()


//////setings
app.set('port', config.port)


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use(usersRoutes);
app.use(registerRoutes);
app.use(loginRoutes);


export default app


