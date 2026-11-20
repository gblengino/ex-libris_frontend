# Ex-Libris 📚

**Ex-Libris** es una plataforma web orientada a la comunidad lectora, diseñada para descubrir libros, compartir opiniones y conectar con otros lectores a través de reseñas, comentarios e interacciones sociales.

El proyecto propone un espacio digital para el intercambio de experiencias literarias, combinando un catálogo de libros con funcionalidades sociales y herramientas para organizar las lecturas personales.

## ✨ Características principales

- **Catálogo literario:** exploración de libros, autores, editoriales y géneros.
- **Búsqueda y filtros:** búsqueda de libros y filtrado por género y autor.
- **Ordenamiento y paginación:** organización de los resultados según distintos criterios.
- **Detalle de libros:** consulta de información y reseñas asociadas a cada obra.
- **Reseñas:** publicación y consulta de opiniones y valoraciones sobre libros.
- **Comentarios:** creación, edición y eliminación de comentarios en las reseñas.
- **Interacción social:** likes en reseñas y comentarios.
- **Lista de lectura:** organización de libros según el estado de lectura.
- **Autenticación:** registro e inicio de sesión mediante JWT.
- **Perfiles de usuario:** consulta de información y actividad de los lectores.

## 🛠️ Tecnologías utilizadas

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Lucide React](https://lucide.dev/)

## 🔗 API Backend

El frontend consume una API REST desarrollada con **Django REST Framework**, correspondiente al proyecto de Ingeniería de Software.

La API proporciona los servicios necesarios para la autenticación, consulta y filtrado del catálogo literario, gestión de reseñas y comentarios, interacciones entre usuarios y listas de lectura.

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

Crear un archivo `.env.local` en la raíz del proyecto, tomando como referencia `.env.example`.

```env
API_URL=http://localhost:8000
```

**Variables de entorno:**

| Variable | Descripción |
|---|---|
| `API_URL` | URL base de la API Backend. |

La dirección configurada debe corresponder a una instancia accesible del backend.

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

[http://localhost:3000](http://localhost:3000)

### Otros comandos disponibles

```bash
npm run build  # Generar la versión de producción
npm run start  # Ejecutar la versión de producción
npm run lint   # Analizar el código con ESLint
```

## 🧪 Testing

La implementación de pruebas unitarias automatizadas correspondiente al requisito R7 quedó pendiente.

Por este motivo, el proyecto no dispone actualmente de una suite de pruebas unitarias ni de un comando `npm run test`.

## 🌐 Demo

La aplicación cuenta con un despliegue en Vercel:

**[Ex-Libris - Aplicación web](https://ex-libris-neon.vercel.app/)**

## 👨‍💻 Autor

**Giuliano Blengino**

Proyecto desarrollado individualmente en el marco de la Tecnicatura en Desarrollo de Software.

## 📌 Estado del proyecto

Ex-Libris corresponde a la entrega final del frontend, con las funcionalidades principales implementadas e integradas con la API Backend.

El desarrollo contempla la experiencia de navegación, gestión de usuarios, catálogo literario e interacciones sociales, quedando pendiente la implementación de las pruebas unitarias correspondientes al requisito R7.