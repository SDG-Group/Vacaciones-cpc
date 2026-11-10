[🏠 Inicio](../README.md) · [🛠️ Instalación](INSTALACION.md) · [📖 Guía de uso](GUIA-DE-USO.md) · [❓ Preguntas frecuentes](FAQ.md)

# 🛠️ Instalación y puesta en marcha

Todo se hace **desde el navegador**: no hace falta instalar nada.

> [!IMPORTANT]
> El repositorio es **público**. No subas datos de personas: el fichero `seed.json` se guarda aparte y se carga desde tu ordenador (paso 6).

## 📦 Contenido del repositorio

| Fichero | Para qué |
|---|---|
| `src/index.html` | La app |
| `src/firebase-config.js` | **Aquí pegas tu configuración de Firebase** (paso 3) |
| `src/guia.html` | Guía de uso para el equipo (se publica en `…/guia.html`) |
| `src/shim.js`, `src/seed.html` | Conexión con Firebase y página de carga inicial (no los toques) |
| `festivos/` | Aquí se suben los festivos de cada año (`2028.xlsx` o `2028.csv`) |
| `plantilla/Festivos_plantilla.xlsx` | Plantilla para los festivos |
| `build.mjs`, `package.json`, `.github/workflows/pages.yml` | Validan y publican solos (no los toques) |
| `extras/gitlab-ci.yml` | Solo si algún día pasas a GitLab (ver el final) |
| `firestore.rules` | Reglas de seguridad para pegar en Firebase (paso 1) |
| **`seed.json`** (aparte, fuera de la carpeta) | Tus 34 personas, pendientes y días marcados. **No lo subas a GitHub** |

## 1️⃣ Crear la base de datos

1. Entra en [console.firebase.google.com](https://console.firebase.google.com) con tu cuenta de Google → **Crear proyecto** (puedes desactivar Analytics).
2. Menú izquierdo → **Firestore** (en «Accesos directos a proyectos»). Si no responde, abre **Bases de datos y almacenamiento** y elige Firestore.
3. **Crear base de datos**. Deja el ID `(default)`, elige una ubicación de Europa (por ejemplo `eur3` o `europe-west`) y sigue.
4. Cuando pregunte por las reglas, elige **modo de producción** y pulsa **Crear**.
5. Pestaña **Reglas**: borra lo que haya, pega el contenido de `firestore.rules` y pulsa **Publicar**.
## 2️⃣ Activar el inicio de sesión y crear la cuenta del equipo

1. **Authentication → Comenzar → Método de acceso → Correo electrónico/contraseña → Habilitar → Guardar**.
2. Pestaña **Usuarios → Agregar usuario**: un correo cualquiera (puede ser inventado, p. ej. `equipo@vacaciones.app`) y una contraseña.
   **Esa cuenta la compartes con todo el equipo.** Para que al entrar solo pidan la contraseña, escribe ese correo en la última línea de `src/firebase-config.js` (`window.CUENTA_EMAIL = "equipo@vacaciones.app";`; paso 4.4).
   **Para cambiar la contraseña:** Firebase → Authentication → Usuarios → ⋮ del usuario → **Eliminar cuenta**, y luego **Agregar usuario** con el **mismo correo** y la contraseña nueva; se la dices al equipo.
   (No uses «Restablecer contraseña» si el correo es inventado: el aviso se envía a ese correo y no llegaría a nadie.) Los datos no se pierden: están en la base de datos, no en la cuenta. Cada persona elige luego su nombre en «¿Quién eres?» (se recuerda en su dispositivo).
3. En **Authentication → Configuración**, si ves «Acciones del usuario», desmarca **«Habilitar crear (registro)»**. Es importante: con el registro abierto,
   quien conozca la configuración (que no es secreta) podría crearse una cuenta y editar datos. Si no ves la opción, avísame.

> ¿Una cuenta por persona? Créalas a mano en **Usuarios → Agregar usuario** y pon `window.CUENTA_COMPARTIDA = false;` en `src/firebase-config.js`.
## 3️⃣ Sacar la configuración de la app

1. **Descripción general → «+ Agregar app»** → icono **`</>` (Web)**.
2. Nombre (p. ej. «vacaciones») y **deja sin marcar «Firebase Hosting»** → Registrar app.
3. Si ofrece varias opciones (npm / `<script>`), elige **`<script>`**. Copia **solo** el bloque que empieza en `const firebaseConfig = {` y acaba en `};`
   (con todos sus campos). **No copies** las líneas `import ...` ni `initializeApp(...)`.
4. En GitHub (paso 4.4) abre `src/firebase-config.js`, **borra el bloque de ejemplo** (el de `PEGA_AQUI`) y pega el tuyo. No toques las líneas de debajo.
   La configuración siempre se puede volver a ver en Firebase → ⚙ **Configuración del proyecto → Tus apps**.
## 4️⃣ Subir el código a GitHub

1. Crea una cuenta en [github.com](https://github.com) si no tienes. Para que **tu nombre no salga en la dirección de la app**, crea una **organización gratuita**:
   tu foto (arriba a la derecha) → **Your organizations → New organization** → plan **gratuito**, con un nombre neutro (p. ej. `equipo-vacaciones`; debe estar libre).
   Dentro de la organización pulsa **New repository** (p. ej. `vacaciones`) y márcalo **público** (GitHub Pages gratuito lo requiere).
   Como será público, **no subas datos de personas**: por eso `seed.json` queda fuera.
   *(Si ya lo creaste en tu cuenta personal: en el repositorio, Settings → General → Danger Zone → **Transfer ownership** → la organización.
   La dirección antigua dejará de funcionar.)*
2. Descomprime el zip. En el repositorio: **Add file → Upload files** y arrastra **el contenido de la carpeta** (`src`, `festivos`, `plantilla`,
   `build.mjs`, `package.json`, `firestore.rules`, `README.md`). GitHub respeta las carpetas. **Commit changes**.
3. La carpeta `.github` empieza por punto y puede no verse al arrastrar. Créala así: **Add file → Create new file**, en el nombre escribe
   `.github/workflows/pages.yml` (al escribir `/` se crean las carpetas) y pega este contenido; luego **Commit**:
   ```
   name: Publicar en GitHub Pages
   on:
     push:
       branches: [main]
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   concurrency:
     group: pages
     cancel-in-progress: true
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm install --no-audit --no-fund
         - run: node build.mjs
         - uses: actions/configure-pages@v5
         - uses: actions/upload-pages-artifact@v3
           with:
             path: public
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```
4. Abre `src/firebase-config.js` en GitHub → lápiz (editar) → pega tu configuración (paso 3.4) → **Commit changes**.
5. **Settings → Pages → Build and deployment → Source: «GitHub Actions»**.
6. Pestaña **Actions**: debe aparecer «Publicar en GitHub Pages» en verde (1-2 min). Si falló por haberse ejecutado antes de activar Pages,
   ábrelo y pulsa **Re-run all jobs**. La dirección será `https://sdg-group.github.io/Vacaciones-cpc/` También la ves en **Settings → Pages** («Your site is live at…»).
## 5️⃣ Autorizar la web en Firebase

**Authentication → Configuración → Dominios autorizados → Agregar dominio**: `sdg-group.github.io` (solo el dominio). Sin esto el inicio de sesión falla.
## 6️⃣ Cargar los datos iniciales (una vez)

1. Abre `https://sdg-group.github.io/Vacaciones-cpc/seed.html`.
2. Entra con la cuenta del equipo, elige el fichero **`seed.json`** de tu ordenador y pulsa **Cargar datos iniciales**. Verás una línea ✓ por persona (34).
   Si ya hay datos, no toca nada.
3. Después borra `src/seed.html` del repositorio (clic en el fichero → ⋯ → Delete file → Commit).
## 7️⃣ Compartirla

Mándales el enlace, el correo y la contraseña de la cuenta del equipo. Cada uno entra, elige su nombre en «¿Quién eres?» y ve y edita lo mismo en tiempo real.
- **iPhone:** Safari → Compartir → **«Añadir a pantalla de inicio»**.
- **Android:** Chrome → menú ⋮ → **«Añadir a pantalla de inicio»** o **«Instalar app»**.
## 8️⃣ Comprobar que funciona

Abre la app → entra → deberías ver las 34 personas. Marca un día desde otro navegador y comprueba que aparece al momento.
Si no entra o dice «Sin conexión con el almacén»: revisa `firebase-config.js`, las reglas (1.5), el acceso por correo (2.1) y el dominio autorizado (paso 5).

## ⚠️ Diferencias con la versión de Claude

- **Botón «Fuera de la oficina» en Google Calendar**: no existe aquí; quedan los enlaces de evento normal para Google/Outlook, el CSV y el texto de respuesta automática.
- **Permiso de Colaborador**: cualquiera con la cuenta puede editar.
- **«¿Quién eres?»** se guarda por dispositivo.
- **Repositorio público**: el código y los festivos son visibles; los datos de personas y vacaciones están solo en Firebase.
- **Coste**: Firebase (plan Spark) y GitHub Pages suelen tener uso gratuito suficiente para 30-50 personas; verifica las condiciones actuales.

---
¿Pasarlo a GitLab corporativo? Ver el [anexo de GitLab](ANEXO-GITLAB.md).
