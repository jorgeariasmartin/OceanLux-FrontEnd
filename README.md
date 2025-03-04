![OceanLux Banner](public/banner_readme.png)

# OceanLux - Frontend

OceanLux es una aplicación web que permite a los usuarios explorar y comprar tickets para viajes o paseos en barco. Los datos de los viajes se obtienen de una base de datos en PostgreSQL alojada localmente y gestionada por un backend desarrollado en PHP con Symfony.

## 📌 Tecnologías utilizadas

- **🖥️ Framework:** Angular
- **📦 Administrador de paquetes:** npm
- **🎨 Framework de estilos:** Tailwind
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
git clone https://github.com/raulcruzadodelgado1/OceanLux-FrontEnd.git
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

## 📚 Documentación con Compodoc

**Compodoc** es una herramienta para generar documentación automática de código Angular. Esta documentación incluye detalles sobre los componentes, servicios, modelos, módulos, etc.

### Para generar y visualizar la documentación:

1. **Generar la documentación**: Ejecuta el siguiente comando en la raíz del proyecto para generar los archivos de documentación:

```sh
npx compodoc -d docs
```

Este comando creará una carpeta `docs/` con toda la documentación generada.

2. **Iniciar el servidor de documentación**: Para ver la documentación en el navegador, ejecuta:

```sh
npx compodoc -s
```

La documentación estará disponible en: [http://localhost:8080](http://localhost:8080).

### Estructura de la documentación generada:

- **Componentes**: Incluye detalles sobre los componentes, sus métodos, propiedades, y eventos.
- **Servicios**: Se documentan los servicios y las interacciones con la API.
- **Modelos y Interfaces**: Muestra la estructura de los datos manejados en la aplicación.
- **Módulos**: Información sobre los módulos y sus dependencias.


## 👨‍💻 Autores

- [mricofer](https://github.com/mricofer)
- [jorgeariasmartin](https://github.com/jorgeariasmartin)
- [raulcruzadodelgado1](https://github.com/raulcruzadodelgado1)


