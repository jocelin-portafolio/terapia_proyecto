# Tierra de Encuentro · Sitio web institucional

Sitio web responsive para una fundación de **terapias infantiles asistidas en la naturaleza** (equinoterapia, fonoaudiología, terapia ocupacional y talleres grupales). Su objetivo es comunicar la propuesta terapéutica, captar donaciones, atraer alianzas de Responsabilidad Social Empresarial (RSE) y canalizar consultas de las familias.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5.3-7952B3?logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Secciones

Inicio · Filosofía · Terapias · Donaciones · Alianzas RSE · Testimonios · Contacto · Newsletter

## Aspectos técnicos destacados

- **Bootstrap 5.3** con grid responsive, navbar colapsable y Bootstrap Icons; recursos de CDN cargados con **Subresource Integrity (SRI)**.
- **Sistema de diseño propio** sobre Bootstrap mediante **variables CSS** (paleta, tonos sutiles y oscuros por color).
- **Header dinámico** que cambia de estilo al hacer scroll y **scroll spy** que resalta la sección activa en la navegación.
- **Módulo de donaciones** con slider de monto y botones de montos predefinidos sincronizados.
- **Validación de formularios en tiempo real** (donación, contacto y newsletter) con una función genérica `validateField(input, regla)` que reutiliza la misma lógica para cada campo: longitud mínima, formato de correo, selección obligatoria y aceptación de política de privacidad.
- **SEO on-page:** `meta description`, `keywords`, `robots` y jerarquía de encabezados semántica.
- **Accesibilidad:** `aria-label` en la navegación y controles, y textos alternativos en imágenes.

## Ejecución

Proyecto estático: abre `index.html` en el navegador o sírvelo con un servidor estático.

## Estructura

```
├── index.html          # Marcado semántico de todas las secciones
├── styles.css          # Variables de diseño y estilos personalizados
├── app.js              # Scroll spy, header dinámico, donaciones y validaciones
└── assets/images/      # Imágenes de las terapias
```
