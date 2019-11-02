// Update with your config settings.
module.exports = {
  development:{
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : process.env.DB_PASSWORD,
      database : 'semnome'
    }
  }
  
};
