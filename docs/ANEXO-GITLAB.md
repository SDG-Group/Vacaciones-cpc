[🏠 Inicio](../README.md) · [🛠️ Instalación](INSTALACION.md) · [📖 Guía de uso](GUIA-DE-USO.md) · [❓ Preguntas frecuentes](FAQ.md)

# 🦊 Anexo: pasar a GitLab corporativo

El proyecto sirve igual. Cambian la subida y la publicación; Firebase, `seed.html` y los festivos funcionan igual.
Antes, pregunta a IT: ¿está activado **GitLab Pages**?, ¿hay **runners** (CI/CD) disponibles?, ¿quién puede abrir la página publicada?
1. **Nuevo proyecto → Crear proyecto en blanco** (privado o interno).
2. Sube los ficheros con el **Web IDE** (botón Editar → Web IDE, o pulsa `.` en el proyecto). Fichero de la raíz: clic derecho → **Upload file**.
   Carpetas (`src`, `festivos`, `plantilla`): clic derecho → **New folder**, y luego clic derecho en la carpeta → **Upload file**.
   No hace falta la carpeta `.github`.
3. Crea el fichero **`.gitlab-ci.yml`** en la raíz (Nuevo fichero) y pega el contenido de `extras/gitlab-ci.yml`.
4. Pega tu configuración de Firebase en `src/firebase-config.js` (paso 3.4) y haz **Commit to main**.
5. **Build → Pipelines**: el trabajo `pages` debe quedar en verde. La dirección está en **Deploy → Pages**.
6. En Firebase → Authentication → Dominios autorizados, añade el dominio de Pages (solo el dominio). Si ya usabas GitHub, la base de datos y la cuenta del equipo no cambian.
7. Para los festivos: carpeta `festivos` → **+ → Upload file**. Los errores de formato aparecen en el pipeline (en rojo).
Aunque el GitLab sea privado, sigue siendo mejor no subir `seed.json`: la carga inicial se hace desde tu ordenador con `seed.html`.
