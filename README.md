# SimpleTwitch (En desarrollo)

<p align="center">
<img style="padding: 2px;" src="images/react1.png" alt="Image 1"
	title="Preview" width="500"/>
</p>
<p align="center">
<img style="padding: 2px;" src="images/react2.png" alt="Image 2  "
	title="Preview" width="500"/>
</p>

**Descripción:** Plataforma basaba en canales para mostrar videos y modelos 3D.

**Características**:
* Discover: Lista de recomendaciones (Categorias y canales)
* Browse: Lista de categorias y canales
* Canal: 
    * Contenido: Video de Youtube o modelo 3D
    * Chat: Comentarios
* Backend: 
    * Github: https://github.com/oscarjcg/simple-twitch-backend-laravel

**Entorno de desarrollo**:
* **Sistema operativo:** Windows 10 64 bits
* **React:**  16.12.0
* **Redux:** 7.1.3

**Docker**:
* Run container with shell
    * `docker compose run --rm -p 3001:3000 st-react bash`
* Inside container install packages and exit
	* `npm install`
	* `exit`
* Run docker compose and it will start npm start (http://localhost:3001)
    * `docker compose up`
* Delete container (not image and node_modules)
    * `docker compose down`