# Web ODS - Estructura del Proyecto

## 📁 Estructura de Carpetas

```
web-ods/
│
├── public/                 # Frontend - Archivos estáticos servidos al cliente
│   ├── index.html         # Página principal
│   ├── pages/             # Otras páginas HTML
│   ├── assets/            # Recursos estáticos
│   │   ├── images/        # Imágenes
│   │   ├── icons/         # Iconos
│   │   ├── fonts/         # Fuentes personalizadas
│   │   └── videos/        # Videos (si aplica)
│   ├── css/               # Estilos CSS
│   │   ├── main.css       # Estilos principales
│   │   ├── components/    # Estilos de componentes
│   │   └── utilities/     # Utilidades CSS
│   └── js/                # JavaScript del cliente
│       ├── main.js        # JavaScript principal
│       ├── components/    # Componentes JS
│       ├── utils/         # Utilidades JS
│       └── api/           # Llamadas a API 
│
├── src/                   # Backend - Código del servidor
│   ├── server.js          # Servidor principal (Node.js)
│   ├── routes/            # Rutas de la API
│   │   ├── index.js
│   │   └── payments.js    # Rutas de Stripe 
│   ├── controllers/       # Controladores
│   ├── models/            # Modelos de datos
│   ├── middleware/        # Middleware personalizado
│   ├── config/            # Configuración
│   │   └── stripe.js      # Configuración de Stripe 
│   └── utils/             # Utilidades del backend
│
├── .env                   # Variables de entorno 
├── .gitignore             # Archivos a ignorar en git
├── package.json           # Dependencias del proyecto
└── README.md              # Este archivo
```

