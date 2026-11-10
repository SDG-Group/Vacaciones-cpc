[🏠 Inicio](../README.md) · [🛠️ Instalación](INSTALACION.md) · [📖 Guía de uso](GUIA-DE-USO.md) · [❓ Preguntas frecuentes](FAQ.md)

# 📖 Guía de uso

> 💡 También está como [**guía web con pestañas**](https://sdg-group.github.io/Vacaciones-cpc/guia.html), dentro de la propia app.

## 👥 Para todo el equipo

### Entrar y elegir quién eres

1. Abre el enlace de la app y escribe la contraseña del equipo.
2. Arriba, en **¿Quién eres?**, elige tu nombre. Se recuerda en ese dispositivo; si cambias de móvil u ordenador, vuelve a elegirlo.
3. Tu fila y tu tarjeta salen marcadas con «· tú».

### Marcar y quitar días

1. En la pestaña **Calendario**, elige en «Marcar como» el tipo: Vacaciones, Asunto propio (AP), Vacaciones tentativo (T), Baja laboral (B) o Teletrabajo extranjero (TT).
2. Haz clic en el día de tu fila (en «Por meses», toca el día). Un segundo clic igual lo quita.
3. Para medio día, activa antes el botón «½ Medio día».

- Solo **Vacaciones** y **AP** descuentan saldo; tentativo, baja y teletrabajo se ven pero no descuentan.
- No se pueden marcar fines de semana, festivos de tu ubicación ni días antes de tu alta o después de tu salida (salen rayados).

### Cómo se descuentan los días

Cada año da 22 días base (configurable por año) más los extra de cada persona. Los de un año se pueden disfrutar hasta el 30 de abril del siguiente.
Siempre se gastan primero los que caducan antes (los pendientes del año anterior). Solo cuentan días laborables según tu ubicación.
Si entras o sales a mitad de año, ese año se calcula proporcional, redondeado a medio día.
«Tu saldo» y las tarjetas muestran cuánto queda, en verde, ámbar (3 o menos) o rojo (te pasas).

### Ver quién está fuera y solapamientos

- El filtro de arriba («Toda la empresa», «Por equipos», «Por personas») cambia lo que ves en toda la página.
- La banda resumen muestra quién está fuera hoy, esta semana y las próximas ausencias.
- «Solapamientos dentro de cada equipo» lista los días en que 2 o más personas del mismo equipo están fuera.

### Descargar o copiar el resumen

En Calendario, **Descargar Excel** genera un fichero con las hojas «Resumen» y «Calendario» (respeta el filtro y el periodo). **Copiar resumen** lo copia como texto.

### Usarla en el móvil

Abre el enlace en el móvil y añádela a la pantalla de inicio:

- **iPhone:** Safari → Compartir → «Añadir a pantalla de inicio».
- **Android:** Chrome → menú ⋮ → «Añadir a pantalla de inicio» o «Instalar app».

## 🧑‍💼 Para quien administra

### Dar de alta a una persona

1. Pestaña **Equipos y saldos → Añadir persona**.
2. Rellena nombre, equipo, ubicación y los pendientes del año anterior.
3. La **fecha de alta** déjala **vacía** para quien ya estaba en la empresa (tiene los 22 días completos). Rellénala solo para incorporaciones nuevas: así se calcula la parte proporcional.

### Dar de baja a una persona

1. En **Equipos y saldos**, pon su **fecha de salida**. Desde ese día no cuenta ni se puede marcar, y su historial se conserva.
2. Para borrarla del todo, usa «Quitar persona» (pide confirmar con un segundo clic: «¿Seguro? Pulsa otra vez»).
3. Marca «Mostrar también a quien ya no está en la empresa» para verla de nuevo.

### Cambiar equipo, ubicación, extras o pendientes

Todo se edita en **Equipos y saldos** (tabla o tarjetas). Los días extra (hasta 3) se ponen por año solo a quien los tenga. También puedes renombrar, quitar o añadir equipos arriba.

### Añadir un año nuevo (p. ej. 2028)

1. Pestaña **Años y festivos → Añadir 2028**. Se crean los derechos de ese año para todos, y queda como «Provisional».
2. Carga los festivos (ver el apartado siguiente).
3. Cuando salgan los oficiales, corrígelos y cambia el año a «Oficial». Ahí también puedes ajustar los días base del año y la regla del 24 y 31 de diciembre.

### Cargar festivos: tres formas

**A. Rellenar provisionales.** En «Años y festivos», pulsa **Rellenar provisionales (fijos + Semana Santa)**: añade los nacionales de fecha fija y el Viernes Santo del año abierto. Faltan los autonómicos y locales.

**B. Importar un fichero desde la app.** Pulsa **Importar festivos (.ics, .csv, .xlsx)**, elige el fichero (columnas: fecha, nombre, ubicación; usa la plantilla), revisa la vista previa y pulsa «Importar». El año debe existir antes. Si algún festivo cae en un día ya marcado, avisa.

**C. Subir el fichero al repositorio (GitHub).** Sube `2028.xlsx` o `2028.csv` a la carpeta `festivos` (Add file → Upload files → Commit). Al terminar la ejecución en «Actions», recarga la app. Si hay un error de formato, la ejecución sale en rojo y dice la fila.

> **Para quitar** un festivo, bórralo del fichero (si viene de ahí) **y** de «Años y festivos».

Los festivos locales de cada ayuntamiento hay que comprobarlos siempre en su boletín o web oficial.

### Añadir una ubicación nueva

En «Años y festivos», en el apartado de ubicaciones, añade la nueva y cárgale sus festivos. Después asígnasela a las personas en «Equipos y saldos».
Para que los ficheros de festivos la reconozcan, hay que añadirla también en `build.mjs` (lista `LOCS`).

### Asuntos propios y 24/31 de diciembre

- En «Años y festivos», el interruptor «La empresa usa asuntos propios» los activa o los quita de toda la app.
- La casilla de cada año hace que el 24 y el 31 de diciembre cuenten medio día cada uno.

### Cambiar la contraseña del equipo

1. Firebase → Authentication → Usuarios → ⋮ de la cuenta → **Eliminar cuenta**.
2. **Agregar usuario** con el mismo correo y la contraseña nueva, y avisa al equipo.

Los datos no se pierden: están en la base de datos, no en la cuenta.

---
¿Algo no encaja? Mira las [❓ Preguntas frecuentes](FAQ.md).
