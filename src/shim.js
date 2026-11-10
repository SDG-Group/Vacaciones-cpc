// Sustituye la plataforma de Claude por Firebase: misma API (db, user) que usa la app.
(function(){
  var cfg = window.FIREBASE_CONFIG || {};
  var ov = null, resolveReady, ready = new Promise(function(r){ resolveReady = r; });
  window.REPO_HOLS = {};
  firebase.initializeApp(cfg);
  var auth = firebase.auth(), fdb = firebase.firestore();

  function overlay(){
    if (ov) return ov;
    ov = document.createElement("div");
    ov.style.cssText = "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:Canvas;color:CanvasText;font-family:system-ui,sans-serif;padding:16px";
    ov.innerHTML = '<div style="width:100%;max-width:340px;display:grid;gap:10px"><h2 style="margin:0">Vacaciones del equipo</h2>' +
      '<input id="lg-mail" type="email" placeholder="Correo" autocomplete="username" style="padding:10px;font-size:1rem">' +
      '<input id="lg-pass" type="password" placeholder="Contraseña" autocomplete="current-password" style="padding:10px;font-size:1rem">' +
      '<button id="lg-go" style="padding:10px;font-size:1rem;cursor:pointer">Entrar</button>' +
      '<a id="lg-reset" href="#" style="font-size:.85rem">He olvidado la contraseña</a><div id="lg-err" style="color:#c0392b;min-height:1.2em;font-size:.9rem"></div></div>';
    document.body.appendChild(ov);
    var err = ov.querySelector("#lg-err");
    function go(){ err.textContent = ""; auth.signInWithEmailAndPassword(ov.querySelector("#lg-mail").value.trim(), ov.querySelector("#lg-pass").value).catch(function(){ err.textContent = "Correo o contraseña incorrectos."; }); }
    ov.querySelector("#lg-go").onclick = go;
    ov.querySelector("#lg-pass").onkeydown = function(e){ if (e.key === "Enter") go(); };
    ov.querySelector("#lg-reset").onclick = function(e){ e.preventDefault(); var m = ov.querySelector("#lg-mail").value.trim(); if (!m){ err.textContent = "Escribe tu correo primero."; return; } auth.sendPasswordResetEmail(m).then(function(){ err.style.color = "inherit"; err.textContent = "Te hemos enviado un correo para cambiarla."; }).catch(function(){ err.textContent = "No se pudo enviar el correo."; }); };
    return ov;
  }
  function showLogin(){ if (document.body) overlay().style.display = "flex"; else document.addEventListener("DOMContentLoaded", function(){ overlay().style.display = "flex"; }); }
  var done = false;
  auth.onAuthStateChanged(function(u){
    if (!u){ showLogin(); return; }
    if (ov) ov.style.display = "none";
    if (done) return; done = true;
    var name = u.displayName || (u.email || "").split("@")[0];
    var me = u.uid;
    if (window.CUENTA_COMPARTIDA !== false){
      try { me = localStorage.getItem("vac-dispositivo"); if (!me){ me = "d" + Math.random().toString(36).slice(2, 12); localStorage.setItem("vac-dispositivo", me); } }
      catch (e) { me = "d" + Math.random().toString(36).slice(2, 12); }
    }
    window.__me = me;
    fdb.collection("perfiles").doc(me).set({ name: name }).catch(function(){});
    fetch("festivos.json?v=" + Date.now()).then(function(r){ return r.ok ? r.json() : {}; }).catch(function(){ return {}; })
      .then(function(j){ window.REPO_HOLS = j || {}; resolveReady(u); });
  });

  var userApi = {
    id: function(){ return Promise.resolve(window.__me); },
    can: function(){ return Promise.resolve(true); },
    canEdit: function(){ return Promise.resolve(true); },
    profiles: function(ids){
      var out = {};
      return Promise.all(ids.map(function(id){ return fdb.collection("perfiles").doc(id).get().then(function(s){ if (s.exists) out[id] = { name: (s.data() || {}).name || "" }; }).catch(function(){}); })).then(function(){ return out; });
    }
  };
  window.claude = { use: function(name){
    if (name === "db") return ready.then(function(){ return fdb; });
    if (name === "user") return ready.then(function(){ return userApi; });
    return Promise.reject(new Error("no disponible"));   // downloads y mcp: la app usa su alternativa
  } };
})();
