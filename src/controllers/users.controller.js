import { json } from 'express';
import { getConnection, sql } from '../database/conection.js';

/////////////////////////////////////GET USUARIO////////////////////////////////////////////

export const getUsers = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Users');
    res.json(result.recordset);

};

/////////////////////////////////////NUEVO USUARIO////////////////////////////////////////////
export const createNewUser = async (req, res) => {
    const {
        id_user_type,
        first_name,
        last_name,
        dob,
        email,
        pass,
        is_active
    } = req.body
    if (first_name == null || last_name == null || email == null || pass == null) {
        return res.status(400).json({ msg: 'BadRequest. Llena los campos faltantes' })
    } else {
        const pool = await getConnection();
        let result1 = await pool
            .request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM  Users WHERE email=@email');

        if (result1.recordset[0] != null) {

            res.json({ msg: 'Correo existente' })

        } else {
            const pool = await getConnection();
            await pool.request()
                .input("id_user_type", sql.Int, id_user_type)
                .input("first_name", sql.VarChar, first_name)
                .input("last_name", sql.VarChar, last_name)
                .input("dob", sql.Date, dob)
                .input("email", sql.VarChar, email)
                .input("pass", sql.VarChar, pass)
                .input("is_active", sql.Bit, is_active)
                .query('INSERT INTO Users (id_user_type, first_name, last_name, dob, email, pass, is_active) VALUES (@id_user_type, @first_name, @last_name, @dob, @email, @pass, @is_active)');
            
                return res.status(200).json({msg:'Usuario registrado exitosamente'})

        }
    }

};

/////////////////////////////////////GET USER BY ID////////////////////////////////////////////

export const getUserById = async (req, res) => {


    const { id } = req.params;


    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', id)
            .query('SELECT * FROM Users WHERE id_user = @id');
        res.send(result.recordset[0]);

    } catch (error) {
        console.log(error)

    }
};

/////////////////////////////////////DETELE////////////////////////////////////////////

export const deleteUserById = async (req, res) => {


    const { id } = req.params;


    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', id)
            .query('DELETE FROM Users WHERE id_user = @id');
        res.sendStatus(204);

    } catch (error) {
        console.log(error)

    }
};

/////////////////////////////////////CONTAR TOTAL USUARIOS ////////////////////////////////////////////

export const getTotalUsers = async (req, res) => {

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query('SELECT COUNT(*) FROM Users');

        res.json(result.recordset[0][''])
        res.sendStatus(204);

    } catch (error) {
        console.log(error)

    }
};

/////////////////////////////////////ACTUALIZAR USUARIOS////////////////////////////////////////////
export const updateUserById = async (req, res) => {
    const { id_user_type,
        first_name,
        last_name,
        dob,
        email,
        pass,
        is_active } = req.body;
    const { id } = req.params;

    if ((first_name == null || email == null)) {
        return res.status(400).json({ msg: "Bad Request. LLena los campos faltantes" });
    }
    const pool = await getConnection();
    await pool
        .request()
        .input('id', sql.Int, id)
        .input("id_user_type", sql.Int, id_user_type)
        .input("first_name", sql.VarChar, first_name)
        .input("last_name", sql.VarChar, last_name)
        .input("dob", sql.Date, dob)
        .input("email", sql.VarChar, email)
        .input("pass", sql.VarChar, pass)
        .input("is_active", sql.Bit, is_active)
        .query('UPDATE Users SET id_user_type= @id_user_type, first_name = @first_name, last_name= @last_name, is_active= @is_active ,dob=@dob WHERE id_user= @id');

   return res.status(200).json({msg: 'Usuario Cambiado con éxito'})
};