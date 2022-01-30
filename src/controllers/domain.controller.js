import { getConnection, sql } from '../database/conection.js';

////////////////////////////////////////////////////////////////////////////////////////////

export const getDomains = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Domains WHERE is_active=1');
    res.json(result.recordset)
}

////////////////////////////////////////////////////////////////////////////////////////////



export const createNewDomain = async (req, res) => {

    const {
        domain,
        is_active
    } = req.body



    const pool = await getConnection();
    const result = await pool.request()
        .input('domain', sql.VarChar, domain)
        .input('is_active', sql.Bit, is_active)
        .query('INSERT INTO Domains (domain,is_active) VALUES (@domain, @is_active)');

    return res.status(200).json({ msg: 'Dominio registrado exitosamente' })
}





////////////////////////////////////////////////////////////////////////////////////////////

export const updateDomainById = async (req, res) => {


    const {
        domain,
        is_active
    } = req.body
    const { id } = req.params;


    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('domain', sql.VarChar, domain)
        .input('is_active', sql.Bit, is_active)
        .query('UPDATE Domains set is_active=0 WHERE id_domain=@id');

    return res.status(200).json({ msg: 'Dominio eliminado con éxito' })

}

////////////////////////////////////////////////////////////////////////////////////////////


export const getDomainByName = async (req, res) => {

    const { domain } = req.body

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('domain', sql.VarChar, domain)
            .query('SELECT * FROM Domains WHERE domain=@domain');

        res.json(result.recordset);

    } catch (error) {
        console.log(error)
    }
}