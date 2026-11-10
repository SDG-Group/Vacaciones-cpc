// PEGA AQUÍ el bloque que te da Firebase tal cual (empieza por «const firebaseConfig = {» y acaba en «};»).
// Sustituye el bloque de ejemplo de abajo (el de PEGA_AQUI). No pegues las líneas «import ...» ni «initializeApp(...)».
// Esta configuración no es secreta: la seguridad la dan las reglas de Firestore y el inicio de sesión.
const firebaseConfig = {
  apiKey: "PEGA_AQUI",
  authDomain: "PEGA_AQUI",
  projectId: "PEGA_AQUI",
  appId: "PEGA_AQUI"
};

// No toques lo de abajo.
window.FIREBASE_CONFIG = firebaseConfig;
// true  = todo el equipo entra con UNA cuenta compartida (cada persona elige su nombre en «¿Quién eres?» en su dispositivo).
// false = una cuenta por persona.
window.CUENTA_COMPARTIDA = true;
