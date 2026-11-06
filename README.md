# Ex-Libris 📚

**Ex-Libris** es una plataforma web orientada a la comunidad lectora, diseñada para descubrir libros, compartir opiniones y conectar con otros lectores a través de reseñas y comentarios.

El proyecto propone un espacio digital para el intercambio de experiencias literarias, combinando un catálogo de libros con funcionalidades sociales y herramientas para organizar las lecturas personales.

## ✨ Características principales

- **Catálogo literario:** exploración de libros, autores, editoriales y géneros.
- **Reseñas:** publicación y consulta de opiniones y valoraciones sobre libros.
- **Interacción social:** comentarios y likes en las reseñas.
- **Lista de lectura:** organización de libros según el estado de lectura.
- **Autenticación:** registro e inicio de sesión mediante JWT.
- **Perfiles de usuario:** consulta de información y actividad de los lectores.

## 🛠️ Tecnologías utilizadas

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Lucide React](https://lucide.dev/)

## 🔗 API Backend

El frontend consume una API REST desarrollada con **Django REST Framework**, correspondiente al proyecto de Ingeniería de Software.

La API proporciona los servicios necesarios para la autenticación, consulta del catálogo literario y gestión de reseñas, comentarios e interacciones entre usuarios.

- **Repositorio:** [Ex-Libris API](https://github.com/gblengino/ex-libris_api)

## 🚀 Instalación y ejecución local

### Requisitos previos

- [Node.js](https://nodejs.org/)
- npm
- Una instancia en ejecución de la API Backend.

### 1. Clonar el repositorio

```bash
git clone https://github.com/gblengino/ex-libris_frontend.git
cd ex-libris_frontend
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto, tomando como referencia el archivo `.env.example`.

```env
API_URL=http://localhost:8000
```

**Variables disponibles:**

| Variable | Descripción |
|---|---|
| `API_URL` | URL base de la API Backend. |

La dirección configurada debe corresponder a una instancia accesible del backend.

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

http://localhost:3000

### Otros comandos disponibles

```bash
npm run build  # Generar la versión de producción
npm run start  # Ejecutar la versión de producción
npm run lint   # Analizar el código con ESLint
```

## 🧪 Testing

La configuración del entorno de pruebas automatizadas se encuentra pendiente de implementación.

Por el momento, el proyecto no dispone de un comando `npm run test`.

## 🖼️ Capturas de pantalla

Una vez finalizado el desarrollo se incluirán capturas de pantalla.

## 📌 Demo y planificación

- **Aplicación desplegada:** Pendiente de despliegue.
- **Tablero Kanban:** No utilizado. El proyecto fue desarrollado individualmente.

## 📖 Estado del proyecto

Ex-Libris se encuentra actualmente en desarrollo. Esta versión representa el estado actual del frontend y sus funcionalidades implementadas hasta la fecha de entrega.

El desarrollo continúa, por lo que algunas funcionalidades, componentes y aspectos de la interfaz pueden encontrarse sujetos a modificaciones y mejoras.

## 👨‍💻 Autor

**Giuliano Blengino**

