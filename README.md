![OceanLux Banner](public/banner_readme.png)

# OceanLux - Frontend

OceanLux es una aplicación web que permite a los usuarios explorar y comprar tickets para viajes o paseos en barco. Los datos de los viajes se obtienen de una base de datos en PostgreSQL alojada localmente y gestionada por un backend desarrollado en PHP con Symfony.

## 📌 Tecnologías utilizadas

- **🖥️ Framework:** Angular
- **📦 Administrador de paquetes:** npm
- **🎨 Framework de estilos:** Bootstrap
- **⚙️ Backend:** PHP con Symfony
- **🗄️ Base de datos:** PostgreSQL

## 🔧 Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) y npm
- [Angular CLI](https://angular.io/cli)
- Un servidor corriendo el backend de OceanLux con Symfony y PostgreSQL

## 🚀 Instalación y ejecución

### 1️⃣ Clona este repositorio:
```sh
git clone https://github.com/tu-usuario/oceanlux-frontend.git
cd oceanlux-frontend
```

### 2️⃣ Instala las dependencias:
```sh
npm install
```

### 3️⃣ Configura el proxy para conectar con el backend local:
Asegúrate de que el archivo `proxy.conf.json` contiene la siguiente configuración:

```json
{
  "/api": {
    "target": "http://localhost:8000",
    "secure": false,
    "changeOrigin": true
  }
}
```
El backend debe estar corriendo en `http://localhost:8000`.

### 4️⃣ Ejecuta la aplicación en modo desarrollo:
```sh
ng serve --proxy-config proxy.conf.json
```

### 5️⃣ Abre en tu navegador: [http://localhost:4200](http://localhost:4200)

## 📂 Estructura del proyecto

```plaintext
/oceanlux-frontend
│── src
│   ├── app
│   │   ├── features       # Funcionalidades principales
│   │   ├── Interceptors   # Interceptores HTTP
│   │   ├── model          # Modelos de datos
│   │   ├── services       # Servicios para comunicación con la API
│   │   ├── app.component.html  # Plantilla principal
│   │   ├── app.component.ts    # Componente principal
│   │   ├── app.config.ts       # Configuración de la aplicación
│   │   ├── app.routes.ts       # Configuración de rutas
│   │   ├── mytheme.ts          # Configuración de temas
│   ├── component       # Componentes reutilizables
│   ├── index.html      # Archivo principal HTML
│   ├── main.ts         # Punto de entrada de la aplicación
│   ├── styles.css      # Estilos globales
│── angular.json       # Configuración de Angular
│── package.json       # Dependencias y scripts
│── proxy.conf.json    # Configuración del proxy para la API
```

## 👨‍💻 Autores

- [mricofer](https://github.com/mricofer)
- [jorgeariasmartin](https://github.com/jorgeariasmartin)
- [raulcruzadodelgado1](https://github.com/raulcruzadodelgado1)


