# Template Emprendimientos (Landing + i18n + Dark Mode)

Template frontend para páginas de emprendimientos/marcas: landing simple, secciones dinámicas (oferta, destacados, FAQ), links de redes, contacto y soporte de **ES/EN** con **modo claro/oscuro**.

> Proyecto pensado para compartirse por QR (por ejemplo en llaveritos/recuerdos impresos en 3D).

## Features
- **Responsive** (desktop + mobile)
- **Modo claro/oscuro** (toggle)
- **i18n ES/EN** (toggle)
- **Header sticky** + menú móvil (drawer)
- Secciones listas:
  - Hero (título + descripción)
  - Redes (links dinámicos)
  - ¿Qué ofrecemos? (cards)
  - Destacados (cards)
  - Catálogo embebido (opcional, por iframe)
  - FAQ (acordeón)
  - Contacto (form + link rápido)
  - Footer (puntos de venta + envíos + legal)
- Datos configurables (por `config.js`) y texto traducible (por `i18n.js` / diccionarios)

## Stack
- HTML + CSS + JavaScript (vanilla)
- Sin frameworks (ideal para Cloudflare Pages / GitHub Pages)

## Estructura sugerida
├─ index.html
├─ css/
│ └─ styles.css
├─ js/
│ ├─ config.js
│ ├─ theme.js
│ ├─ i18n.js
│ └─ main.js
└─ assets/
└─ img/
├─ logo.png
└─ og.jpg


## Cómo correrlo
Opción A (recomendado): con VS Code + Live Server  
1. Abre la carpeta del proyecto
2. Click derecho en `index.html` → **Open with Live Server**

Opción B: servidor simple (Python)
```bash
python -m http.server 5500
Luego abre http://localhost:5500