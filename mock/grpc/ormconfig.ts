import config from "config"

interface DBConfig {
  host: string
  name: string
  user: string
  password: string
}

const dbConfig = config.get<DBConfig>('database')

module.exports = {
  "type": "postgres",
  "host": dbConfig.host,
  "port": 5432,
  "username": dbConfig.user,
  "password": dbConfig.password,
  "database": dbConfig.name,
  "entities": ["lib/**/*.entity{.ts,.js}"],
  "synchronize": true
}
