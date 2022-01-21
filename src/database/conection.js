import sql from 'mssql'


const dbsettings={
    "server": "66.175.236.212",
    "port": 1433,
    "database": "DbCalendar", //you should always save these values in environment variables
    "user": "sa",  //only for testing purposes you can also define the values here
    "password": "R0bertStrife",
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}

export async function getConnection(){
  try {
    const pool = await sql.connect(dbsettings);
   return pool;
  } catch (error) {
      console.log(error);
      
  }
}


export {sql};
