# 📘 Pangeo - Documentación del Proyecto

**Pangeo Advisors** es una empresa especializada en brindar servicios geotécnicos, geológicos, geofísicos y sismológicos, con el objetivo de garantizar la seguridad y eficiencia de proyectos de ingeniería civil.

---

## 📌 Índice

- [Descripción General](#descripción-general)
- [Servicios Ofrecidos](#servicios-ofrecidos)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Despliegue y Hosting](#despliegue-y-hosting)
- [Configuración Local](#configuración-local)
- [Contribuciones](#contribuciones)

---

## 📖 Descripción General

Este repositorio contiene el código fuente de la **landing page** de Pangeo Advisors, diseñado para ofrecer información detallada sobre los servicios profesionales en geotecnia, geofísica y capacitación técnica especializada.

El sitio web es **multilingüe (ES/EN)**, incluye una sección de contacto, slider de servicios, y una experiencia adaptable a dispositivos móviles.

---

## 🛠 Servicios Ofrecidos

1. **Geotecnia**
   - Ensayos de suelos
   - Análisis geotécnicos
   - Consultoría técnica

2. **Geofísica y Sismología**
   - Ensayos MASW, Refracción Sísmica, Microtremores
   - Procesamiento de datos sísmicos

3. **Capacitaciones In-House**
   - Cursos operativos de equipos geofísicos
   - Formación técnica aplicada a campo

---

## 💻 Tecnologías Utilizadas

- **Frontend:**
  - HTML5 / CSS3
  - **Tailwind CSS** (CDN)
  - JavaScript ES6
  - Librerías: EmailJS (para formularios)

- **Multilingüe:**
  - Implementación con `data-i18n` para textos dinámicos.
  - Archivos JSON de traducción.

- **PWA y SEO:**
  - Favicon y manifest.json
  - Meta tags de SEO básico

---

## 🗂 Estructura del Proyecto

<pre>
/assets/
  ├── geotecnia/                     # Imágenes del slider de Geotecnia
  ├── geofisica/                     # Imágenes del slider Geofísico
  ├── geologia/                     # Imágenes del slider Geologia
  ├── sismologia/                     # Imágenes del slider Sismología
  ├── capacitaciones in-house/      # Imágenes del slider de Capacitaciones
  ├── favicon.ico                    # Favicon principal
  ├── favicon-96x96.png              # Favicon alternativo (96x96 px)
  ├── apple-touch-icon.png           # Ícono Apple (180x180 px)
  ├── web-app-manifest-192x192.png   # Ícono para Android (192x192 px)
  └── web-app-manifest-512x512.png   # Ícono para Android (512x512 px)

/css/
  └── style.css                      # Estilos personalizados y ajustes de Tailwind

/js/
  ├── main.js                        # Funciones generales: modo oscuro, header dinámico
  ├── geotecnia.js                   # Carrusel de imágenes para Geotecnia
  ├── capacitaciones.js              # Carrusel de imágenes para Capacitaciones
  └── geofisica.js                   # Carrusel de imágenes para Geofísica

index.html                           # Página principal
service-geotecnia.html               # Página específica de Geotecnia
service-geofisica.html               # Página específica de Geofísica y Sismología
service-capacitaciones.html         # Página específica de Capacitaciones In-House
site.webmanifest                     # Manifest para Progressive Web App (PWA)
favicon.ico                          # Favicon principal
</pre>


---

## 🚀 Despliegue y Hosting

- **Hosting:** GitHub Pages con dominio personalizado.
- **Dominio:** [https://pangeoadvisors.com](https://pangeoadvisors.com)
- **SSL:** Certificado HTTPS activo.
- **Repositorio:** Público o privado según configuración GitHub Pro.

---

## ⚙️ Configuración Local

1. Clonar el repositorio:
   \```bash
   git clone https://github.com/usuario/pangeo-landing-page.git
   cd pangeo-landing-page
   \```

2. Abrir `index.html` en el navegador.

3. Personalización de estilos:
   - Editar `/css/style.css`.
   - Configurar Tailwind si deseas usarlo localmente.

4. Iconos y Favicon:
   - Asegúrate de colocar los íconos en `/assets/`.
   - Revisa las rutas en `<head>` dentro de `index.html`.
   - Modifica `site.webmanifest` para cambios de PWA.

---

## 📦 Funcionalidades Clave

- **Modo Oscuro / Claro** con transición suave.
- **Header Dinámico**: Se oculta/mostrará según scroll y contexto.
- **Carruseles** en servicios (Geotecnia, Geofísica, Capacitaciones) con reinicio de auto-slide al interactuar.
- **EmailJS** para formulario de contacto.
- **SEO Optimizado** con meta-etiquetas y favicon multiformato.
- **Responsive Design** mediante Tailwind CSS.

---

## ✍️ Contribuciones

1. Haz Fork del repositorio.
2. Crea una rama: `git checkout -b feature-nueva`.
3. Realiza Commit: `git commit -m 'Descripción de la mejora'`.
4. Haz Push: `git push origin feature-nueva`.
5. Abre un Pull Request.

---

## 📬 Contacto

- **Email:** clientes@pangeoadvisors.com
- **Sitio Web:** [https://pangeoadvisors.com](https://pangeoadvisors.com)


