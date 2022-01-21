import { getConnection, sql } from "../database/conection.js";

/////////////////////////////////////GET REGISTRO////////////////////////////////////////////

export const getRegister = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM RegisterDay');
    res.json(result.recordset);

};



/////////////////////////////////////NUEVO REGISTRO////////////////////////////////////////////
export const createNewRegister = async (req, res) => {

    const { id_user, confirmed_assist, date } = req.body

    if (id_user == null || confirmed_assist == null || date == null) {

        return res.status(400).json({ msg: 'BadRequest. Llena los campos faltantes' })

    } else if (registerExists(req, res)) {

        const pool = await getConnection();
       const result =  await pool
            .request()
            .input('id_user', sql.Int, id_user)
            .input('date', sql.Date, date)
            .query('SELECT * FROM  RegisterDay WHERE cast(date as date) = @date and id_user=@id_user and (confirmed_assist=0 OR confirmed_assist=1)');

        res.result
        console.log('este es el result' + result.recordset)

        if (result !=null ) {
            const pool = await getConnection();
            await pool
                .request()
                .input('confirmed_assist', sql.Bit, confirmed_assist)
                .input('id_user', sql.Int, id_user)
                .input('date', sql.Date, date)
                .query('UPDATE RegisterDay SET confirmed_assist= 1 WHERE id_user =@id_user and date=@date');

            return res.status(200).json({ msg: "registrado exitosamente" });
        }
        return res.status(200).json({ msg: "Ya estas registrado en este dia" });

    } else {
        const pool = await getConnection();
        await pool.request()
            .input("id_user", sql.Int, id_user)
            .input("confirmed_assist", sql.Bit, confirmed_assist)
            .input("date", sql.Date, date)
            .query('INSERT INTO RegisterDay (id_user, confirmed_assist, date) VALUES (@id_user, @confirmed_assist, @date)');

            return res.status(200).json({ msg: "Registrad exitosamente por priemra vez" });
    }
};

/////////////////////////////////////GET REGISTRO BY DATE////////////////////////////////////////////

export const getRegisterByDate = async (req, res) => {


    const { date } = req.body;


    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('date', sql.Date, date)
            .query(" SELECT  first_name, last_name, confirmed_assist FROM Users FULL OUTER JOIN RegisterDay ON Users.id_user= RegisterDay.id_user WHERE cast(date as date) = @date and confirmed_assist=1");
        res.json(result.recordset);

    } catch (error) {
        console.log(error)

    }
};








// /////////////////////////////////////DELETE////////////////////////////////////////////

// export const deleteRegisterById = async (req, res) => {


//     const { id } = req.params;


//     try {
//         const pool = await getConnection();
//         const result = await pool
//             .request()
//             .input('id', id)
//             .query('DELETE FROM Users WHERE id_user = @id');
//         res.sendStatus(204);

//     } catch (error) {
//         console.log(error)

//     }
// };

// /////////////////////////////////////CONTAR TOTAL REGISTROS ////////////////////////////////////////////

// export const getTotalRegister = async (req, res) => {

//     try {
//         const pool = await getConnection();
//         const result = await pool
//             .request()
//             .query('SELECT COUNT(*) FROM Users');

//         res.json(result.recordset[0][''])
//         res.sendStatus(204);

//     } catch (error) {
//         console.log(error)

//     }
// };

/////////////////////////////////////ACTUALIZAR REGISTROS////////////////////////////////////////////
export const updateRegisterById = async (req, res) => {
    const { id_user, confirmed_assist, date } = req.body

    const { id } = req.params;

    if ((id_user == null || date == null)) {
        return res.status(400).json({ msg: "Bad Request. LLena los campos faltantes" });
    }
    const pool = await getConnection();
    await pool
        .request()
        .input('confirmed_assist', sql.Bit, confirmed_assist)
        .input('id_user', sql.Int, id)
        .input('date', sql.Date, date)
        .query('UPDATE RegisterDay SET confirmed_assist= @confirmed_assist WHERE id_user =@id_user and date=@date');

    return res.status(200).json({ msg: "Ok. Confirmacion cancelada a este dia " });
};

/////////////////////////////////////////////////////////////////////////////////

const registerExists = async (req, res) => {

    const { id_user, date } = req.body

    const pool = await getConnection();
    await pool
        .request()
        .input('id_user', sql.Int, id_user)
        .input('date', sql.Date, date)
        .query('SELECT * FROM  RegisterDay WHERE cast(date as date) = @date and id_user=@id_user and (confirmed_assist=0 OR confirmed_assist=1)');

    return res = true

}