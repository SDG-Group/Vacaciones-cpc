// PEGA AQUÍ el bloque que te da Firebase tal cual (empieza por «const firebaseConfig = {» y acaba en «};»).
// Sustituye el bloque de ejemplo de abajo (el de PEGA_AQUI). No pegues las líneas «import ...» ni «initializeApp(...)».
// Esta configuración no es secreta: la seguridad la dan las reglas de Firestore y el inicio de sesión.
const firebaseConfig = {
  apiKey: "AIzaSyD9NDnXq2Iqs_QZozVWbeiG26tFJIXp-Uc",
  authDomain: "vacaciones-cpc.firebaseapp.com",
  projectId: "vacaciones-cpc",
  storageBucket: "vacaciones-cpc.firebasestorage.app",
  messagingSenderId: "177940139589",
  appId: "1:177940139589:web:0003ae447f8642b654dd2c",
  measurementId: "G-1BY38MDP27"
};

// No toques lo de abajo.
window.FIREBASE_CONFIG = firebaseConfig;
// true  = todo el equipo entra con UNA cuenta compartida (cada persona elige su nombre en «¿Quién eres?» en su dispositivo).
// false = una cuenta por persona.
window.CUENTA_COMPARTIDA = true;
window.CUENTA_EMAIL = "vacaciones_cpc@sdggroup.com";
