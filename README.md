# 🎬 MaidaVision – Tu app para seguir películas, series (y libros)

MaidaVision es una plataforma moderna construida con Next.js 15 y TypeScript que te permite **buscar, guardar, seguir y descubrir** películas y series en todas tus plataformas favoritas. ¡Y próximamente también libros!

---

## ✨ Características principales

- **Explorá contenido en tendencia** (películas y series).
- **Buscador potente** para encontrar tu próxima maratón.
- **Listas personalizadas**: Por ver, Visto, Favoritos.
- **Página de detalles** con sinopsis, reparto, tráilers y más.
- **Autenticación segura** con Google.
- **Disponibilidad por país y plataforma** (Netflix, Prime Video, Disney+...).
- **Filtros inteligentes** por género, año, idioma, etc.
- **Interfaz moderna y responsive** con Tailwind + shadcn/ui.
- **Integración con IA** para sugerencias personalizadas (en desarrollo).
- **Modo claro/oscuro** y animaciones suaves.
- **Próximamente**: sección de libros, perfil público y recomendaciones sociales.

---

## 🧱 Tecnologías utilizadas

- **Next.js 15** (App Router + Server Actions)
- **TypeScript** (100% tipado)
- **TailwindCSS** + **shadcn/ui**
- **Prisma ORM** + SQLite (en desarrollo: PostgreSQL)
- **Zustand** (manejo de estado global)
- **Auth.js** (Google OAuth)
- **React Hook Form**
- **TMDB API** (The Movie Database)
- **OpenAI API** (para búsquedas inteligentes - en desarrollo)

---

## 🗂️ Estructura del proyecto

```
/public
/src
  /app
    /api
    /(auth)
      /login
      /register
    /layout.tsx
    /page.tsx
  /components
  /hooks
  /layouts
  /lib
    auth.ts
    prisma.ts
    utils.ts
    tmdb.ts
    openai.ts
  /types
/prisma
  schema.prisma
```

---

## 🚀 Cómo levantar el proyecto

1. Cloná este repo:
```bash
git clone https://github.com/maidana0/MaidaVision.git
cd maidavision
```

2. Instalá las dependencias:
```bash
npm install
```

3. Configurá las variables de entorno:
```
NODE_ENV=""
DATABASE_URL=""
NEXTAUTH_SECRET=""
TMDB_API_KEY=""
OPENAI_API_KEY=""
AUTH_SECRET=""
```

4. Corremos las migraciones:
```bash
npx prisma migrate dev --name init
```

5. Levantamos el servidor:
```bash
npm run dev
```

---

## 🌎 Créditos y APIs

- [TMDB API](https://www.themoviedb.org/documentation/api)
- [OpenAI API](https://platform.openai.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma ORM](https://www.prisma.io/)

---

## ✨ ¿Querés colaborar?

Cualquier sugerencia o mejora es bienvenida. Abrí un issue o un PR con gusto.

---

## 📚 Próximamente...

- **Sección de libros** con filtros y favoritos.
- **Recomendaciones por IA** personalizadas.
- **Sistema de comunidad**: seguir usuarios, compartir listas.

---

Made with **Next.js & café** by [@Maidana0](https://github.com/maidana0)

---