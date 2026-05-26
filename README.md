# Web ODS — On Demand Solutions

Sitio web corporativo con formularios conectados a **Google Sheets** y checkout con **Stripe**. El frontend se sirve en **Hostinger** y la API en **Render**.

- **Sitio:** [ondemand.com.ar](https://ondemand.com.ar)
- **API:** `https://web-ods-api.onrender.com`

---

## Arquitectura

| Capa | Dónde | Qué incluye |
|------|--------|-------------|
| Frontend | Hostinger (`public/`) | HTML, CSS, JS estático |
| Backend | Render (`src/`) | Express, rutas API, integración Sheets/Stripe |

Los formularios del frontend llaman a la API de Render (mismo patrón que contacto), no a rutas relativas del dominio estático.

---

## Estructura del proyecto

```
web-ods/
├── public/                      # Frontend (subir a Hostinger)
│   ├── index.html
│   ├── pages/
│   │   ├── contacto.html
│   │   ├── checkout.html
│   │   ├── aplication-form.html # Landing campañas (Instagram, etc.)
│   │   └── ...
│   ├── assets/
│   ├── css/
│   └── js/
│       ├── components/          # navigation, footer, slider
│       ├── pages/               # Lógica por página
│       └── api/
│
├── src/                         # Backend (deploy en Render vía GitHub)
│   ├── server.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── contact.js
│   │   ├── checkout.js
│   │   └── aplication-form.js
│   └── controllers/
│       ├── contactController.js
│       ├── checkoutController.js
│       └── aplicationController.js
│
├── .env                         # Variables locales (no commitear)
├── package.json
└── README.md
```

---

## Requisitos

- Node.js 18+
- Cuenta en [Render](https://render.com) (API)
- Hosting estático en Hostinger
- Google Apps Script desplegado como **aplicación web** (URL `/exec`)
- Cuenta Stripe (checkout de planes)

---

## Instalación y desarrollo local

```bash
npm install
# Crea .env en la raíz (ver tabla de variables más abajo)
npm run dev            # nodemon en http://localhost:3000
```

> En local, los formularios de `public/js/pages/` apuntan a la API de **producción en Render** (igual que en el sitio publicado). Para probar cambios del backend antes de desplegar, usa temporalmente `http://localhost:3000` en el `fetch` o despliega en Render.

Si el puerto 3000 está ocupado:

```powershell
netstat -ano | findstr :3000
taskkill /PID <pid> /F
```

---

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/health` | Estado del servidor |
| `POST` | `/api/contact` | Formulario de contacto → Google Sheets |
| `POST` | `/api/checkout` | Checkout → Sheets + sesión Stripe |
| `POST` | `/api/aplication` | Formulario de aplicación → Google Sheets |

### Formulario de aplicación (campañas)

Landing pensada para enlaces directos (p. ej. publicidad en Instagram). No está en el menú principal.

- **URL pública:** `https://ondemand.com.ar/pages/aplication-form.html`
- **Campos:** `fullName`, `company`, `rubric`, `email`, `phone`, `rrss`, `website`, `location`
- En Google Sheets, la pestaña debe llamarse **`aplication_form`** (o ajustar `getSheetByName` en el Apps Script).

---

## Variables de entorno

Crear `.env` en la raíz (y replicar las mismas claves en el panel de **Render**):

| Variable | Uso |
|----------|-----|
| `PORT` | Puerto local (por defecto 3000) |
| `BASE_URL` | URL del sitio (redirects Stripe) |
| `GOOGLE_SCRIPT_URL` | Apps Script — contacto |
| `GOOGLE_SCRIPT_CHECKOUT_URL` | Apps Script — checkout |
| `GOOGLE_SCRIPT_APPLICATION_FORM_URL` | Apps Script — formulario aplicación |
| `STRIPE_SECRET_KEY` | Clave secreta Stripe |
| `STRIPE_PRICE_*` | IDs de precios por plan |

---

## Despliegue

### 1. Backend (GitHub → Render)

1. Push a la rama conectada con Render.
2. En Render → **Environment**, configurar todas las variables de `.env`.
3. Verificar: `GET https://web-ods-api.onrender.com/api/health`

### 2. Frontend (Hostinger)

1. Subir el contenido de `public/` (o sincronizar vía FTP/Git si lo usas).
2. Asegurarse de subir los JS actualizados en `public/js/pages/`.

### Checklist rápido

- [ ] Ruta `/api/aplication` desplegada en Render
- [ ] `GOOGLE_SCRIPT_APPLICATION_FORM_URL` en Render
- [ ] Pestaña `aplication_form` en el spreadsheet
- [ ] Apps Script: acceso **Cualquier persona**, URL `/exec`
- [ ] CORS en `server.js` incluye `https://ondemand.com.ar` (y `www` si aplica)

---

## Scripts npm

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor en producción local |
| `npm run dev` | Servidor con recarga (nodemon) |

---

## Licencia

ISC
