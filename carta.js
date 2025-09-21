// carta.js
const qs = new URLSearchParams(location.search);
const nombre = qs.get("nombre") || "Liz ♥️";
const de = qs.get("de") || "Héctor";

document.getElementById("nombre").textContent = nombre;
document.getElementById("remitente").textContent = de;
document.getElementById("dest").textContent = nombre;
document.getElementById("firma").textContent = de;
document.getElementById("fecha").textContent = new Date().toLocaleDateString("es-MX",{day:"numeric",month:"long",year:"numeric"});

const env = document.getElementById("envelope");
env.setAttribute("aria-expanded","false");
const toggleEnv = (e) => { if(e){ e.preventDefault(); } const open = env.classList.toggle("open"); env.setAttribute("aria-expanded", open ? "true" : "false"); };
env.addEventListener("click", toggleEnv);
env.addEventListener("keypress", e => { if(e.key==="Enter"||e.key===" "){ toggleEnv(e); }});

/* corazones fondo */
const cvs = document.getElementById("bg-hearts");
const ctx = cvs.getContext("2d");
let W=0,H=0,hearts=[];
function resize(){ W=cvs.width=innerWidth; H=cvs.height=innerHeight; }
addEventListener("resize", resize, {passive:true}); resize();
function rand(a,b){ return Math.random()*(b-a)+a }
function spawn(n=34){ hearts=[]; for(let i=0;i<n;i++) hearts.push({ x:rand(0,W), y:rand(0,H), s:rand(8,18), a:rand(.08,.20), t:rand(0,Math.PI*2), v:rand(.3,.8) }); }
function heartPath(x,y,s){
  ctx.moveTo(x,y);
  ctx.bezierCurveTo(x,y-s*.6,x-s,y-s*.1,x-s,y+s*.4);
  ctx.bezierCurveTo(x-s,y+s,x-s*.2,y+s*1.2,x,y+s*1.5);
  ctx.bezierCurveTo(x+s*.2,y+s*1.2,x+s,y+s,x+s,y+s*.4);
  ctx.bezierCurveTo(x+s,y-s*.1,x,y-s*.6,x,y);
}
function tick(){
  ctx.clearRect(0,0,W,H);
  for(const h of hearts){
    h.t=(h.t||0)+0.01; h.y-=h.v*0.6; if(h.y<-30){ h.y=H+30; h.x=rand(0,W); }
    ctx.save(); ctx.globalAlpha=h.a; ctx.beginPath(); heartPath(h.x+Math.sin(h.t)*6,h.y,h.s);
    ctx.fillStyle="rgba(255,106,166,.85)"; ctx.fill(); ctx.restore();
  }
  requestAnimationFrame(tick);
}
spawn(); tick();

/* razones */
const RAZONES = [
  ["Tu risa","Siempre me alegra el día."],
  ["Tu paciencia","Me hace sentir tranquilo contigo."],
  ["Tu creatividad","Siempre me sorprendes de forma bonita."],
  ["Tu lealtad","Siempre estás cuando importa."],
  ["Tu mirada","Me encanta perderme en ella."],
  ["Tu voz","Me gusta mucho escucharte."],
  ["Tu valentía","Admiro tu forma de enfrentar todo."],
  ["Tu humor","Siempre sabes cómo hacerme reír."],
  ["Tu ternura","La siento en cada gesto bonito."],
  ["Tu presencia","Hace que mis días sean mejores."]
];
const contRaz = document.getElementById("razones");
RAZONES.forEach(([front, back])=>{
  const el = document.createElement("div");
  el.className = "flip";
  el.innerHTML = `
    <div class="flip-inner">
      <div class="face front"><strong>${front}</strong></div>
      <div class="face back">${back}</div>
    </div>`;
  el.tabIndex = 0;

  const toggle = (e) => { if(e) e.preventDefault(); el.classList.toggle("is-flipped"); };
  el.addEventListener("click", toggle);
  el.addEventListener("touchend", toggle, {passive:false});
  el.addEventListener("pointerup", toggle);
  el.addEventListener("keypress", e => { if(e.key==="Enter"||e.key===" "){ toggle(e); }});

  contRaz.appendChild(el);
});
