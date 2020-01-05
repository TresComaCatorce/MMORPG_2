# MMORPG_2

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Environment Variables](#environment-variables)

## General info
This project is an MMORPG for learning purposes.
	
## Technologies
Project is created with:
* NodeJS version: 9.4.0
* NodePackageManager version: 5.6.0
* MongoDB version: 4.2
* http-server version: 0.12.0
* Phaser version: 3.21.0

	
## Environment Variables
It is necessary to create the following environment variables:
* **SERVER_PORT**: Port on which the server will run.
* **CORS_ORIGIN**: Cors origin URL's of the server.
* **MONGO_CONNECTION_URL**: Connection URL of MongoDB server.
* **MONGO_USER_NAME**: User of MongoDB server.
* **MONGO_PASSWORD**: Password of MongoDB server.
* **JWT_SECRET**: Secret string used to generate the Json Web Token.
* **JWT_SECRET_EXPIRES**: Json Web Token expiration time.
* **JWT_REFRESH_SECRET**: Secret String used to generate the refresh Json Web Token.
* **JWT_REFRESH_SECRET_EXPIRES**: Refresh Json Web Token expiration time.
