# SimpleTwitch (En desarrollo)


**Descripción:** Versión simplificada de [Twitch](https://www.twitch.tv/directory) (Plataforma de live streaming centrada en juegos)

**Características**:
* Browse: Lista de categorias y canales
* Backend: 
    * Github: https://github.com/oscarjcg/backend-simple-twitch

**Entorno de desarrollo**:
* **Sistema operativo:** Windows 10 64 bits
* **React:**  16.12.0
* **Redux:** 7.1.3

**Docker**
* Run container with shell
    * docker compose run --rm -p 3001:3000 st-react bash
* Inside container install packages and exit
	* npm install
	* exit
* Run docker compose and it will start npm start (http://localhost:3001)
    * docker compose up
* Delete container (not image and node_modules)
    * docker compose down