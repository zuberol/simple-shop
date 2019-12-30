const rootDir = require('../util/path');
const path = require('path')
const { Pool } = require('pg')
require('dotenv').config({path:path.join(rootDir, 'Model','.env')})

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
console.log(connectionString)

const pool = new Pool( {connectionString : connectionString} )


module.exports = { pool }