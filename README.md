# xccUI

Frontend para TechPeople SaaS desarrollado por **DL21hex**.

Este proyecto está construido con [SolidStart](https://start.solidjs.com/) y diseñado específicamente para ser desplegado y ejecutado en el **Edge** (Cloudflare Workers/Pages), garantizando baja latencia y alta disponibilidad.

## 🚀 Descripción

xccUI funciona como una interfaz moderna y reactiva que implementa un patrón de **Server-Driven UI**. La aplicación renderiza dinámicamente componentes basados en la configuración recibida desde el backend, permitiendo una gran flexibilidad en la gestión de contenidos y estructuras de página sin necesidad de reconstruir el frontend constantemente.

La arquitectura aprovecha la capacidad de renderizado híbrido y el enrutamiento dinámico para ofrecer una experiencia de usuario fluida y extremadamente rápida.

## ✨ Características Principales

- **Edge-First Design**: Optimizado para ejecutarse en Cloudflare Workers, llevando el cómputo lo más cerca posible del usuario.
- **Renderizado Dinámico (Server-Driven UI)**:
  - Las páginas se construyen en tiempo real basándose en respuestas del backend.
  - Mapeo dinámico de componentes (`CTA`, `Card`, `Nav`) según la ruta solicitada.
- **Gestión de Rutas Global**: Utiliza una ruta "catch-all" para manejar dinámicamente cualquier URL y solicitar el contenido correspondiente.
- **Autenticación Integrada**: Manejo automático de redirecciones de inicio de sesión interceptando respuestas del backend.
- **Estilizado Moderno**: Utiliza **Tailwind CSS v4** para un diseño rápido, responsive y ligero.
- **Iconos Optimizados**: Integración con `unplugin-icons` y `@iconify` para carga bajo demanda.

## 🛠️ Stack Tecnológico

- **Framework**: [SolidJS](https://www.solidjs.com/) + [SolidStart](https://start.solidjs.com/)
- **Build Tool**: [Vinxi](https://vinxi.vercel.app/)
- **Estilos**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Enrutamiento**: @solidjs/router
- **Despliegue**: Cloudflare Workers (Wrangler)

## 📦 Instalación y Desarrollo

1. **Clonar el repositorio e instalar dependencias:**

   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`.

## 🚀 Despliegue

Para desplegar en Cloudflare Workers:

```bash
npm run deploy
```

O para previsualizar el build de producción localmente:

```bash
npm run preview
```

## 📂 Estructura del Proyecto

- `src/routes/[[...slug]].tsx`: Controlador principal que gestiona el renderizado dinámico de páginas.
- `src/components/`: Colección de componentes UI reutilizables (Nav, Card, CTA).
- `src/utils/request.ts`: Utilidad de petición HTTP con manejo global de errores y autenticación.
- `wrangler.jsonc`: Configuración de despliegue para Cloudflare.

---
Creado con [Solid CLI](https://github.com/solidjs-community/solid-cli) por DL21hex.
