module.exports = {
  "name": "default",
   "type": "postgres",
   "host": process.env.TYPEORM_HOST,
   "port": Number(process.env.TYPEORM_PORT),
   "username": process.env.TYPEORM_USERNAME,
   "password": process.env.TYPEORM_PASSWORD,
   "database": process.env.TYPEORM_DATABASE,
   "synchronize": true,
   "migrationsRun": true,
   "logging": false,
   "extra": {
     "ssl": {
       "require": true,
       "rejectUnauthorized": false
     }
   },
   "entities": [
      "src/db/entity/*.ts"
   ],
   "migrations": [
      "src/db/migration/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/db/entity",
      "migrationsDir": "src/db/migration"
   },
   "seeds": ["src/db/seeds/*{.ts,.js}"],
  "factories": ["src/db/factories/*{.ts,.js}"]
}