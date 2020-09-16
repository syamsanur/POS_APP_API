require('dotenv').config()

const env = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_DATABASE: process.env.DB_DATABASE,
  JWTSECRETKEY: process.env.JWTSECRETKEY,
  JWTSECRETKEYREFRESH: process.env.JWTSECRETKEYREFRESH
}

module.exports = env