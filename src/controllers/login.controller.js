import { getConnection, sql } from '../database/conection.js';


/////////////////////////////////////LOGIN USUARIOS////////////////////////////////////////////
export const loginByEmail = async (req, res) => {
    const { email, pass, } = req.body

    if (email == null || pass == null) {

        return res.status(400).json({ msg: 'BadRequest. Llena los campos faltantes' })
    }
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("email", sql.VarChar, email)
            .input("pass", sql.VarChar, pass)
            .query('SELECT * FROM Users WHERE email=@email and pass=@pass');
            res.json(result.recordset[0])

    } catch (error) {
        console.log(error)
        res.json(error)
    }

};
