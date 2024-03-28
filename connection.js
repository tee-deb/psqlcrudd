const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "teeman_4u",
    database: "tydemo"
})

module.exports =  client;