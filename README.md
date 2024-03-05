# Car Track Server
Car Track offers seamless control over company vehicle usage, facilitating registration, monitoring, and basic reporting functionalities. 

## Requirements
1. Node 16.0 or superior
2. Docker

## How to run
1. Clone this repository
2. Run `npm install` to install the dependencies
3. Configure the .env file using the .env.example file
3. Run `docker compose up postgres` to spin up postgres instance
4. Run `createdb -h localhost -p 5432 -U user -W car_track` and type the password `password` to create the database
5. Run `npx prisma migrate dev` to migrate the database
6. Run `npm run dev` to start the server
