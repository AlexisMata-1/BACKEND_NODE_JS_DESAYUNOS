import app from './app.js'

import usersRoutes from './routes/users.routes.js'
import registerRoutes from './routes/register.routes.js'
import loginRoutes from './routes/login.routes.js'


app.listen(app.get('port'))

app.use(usersRoutes)
app.use(registerRoutes)
app.use(loginRoutes)


console.log('server Corriendo en el puerto ', app.get('port'))


// const result = await pool.request().query('SELECT  * from UsersType');
// console.log(result)