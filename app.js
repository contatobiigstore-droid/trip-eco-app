const contacts={1:"5575981385005",2:"5575982738522"};
document.querySelector("#menu").onclick=()=>document.querySelector("#nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.querySelector("#nav").classList.remove("open"));
document.querySelectorAll("[data-wa]").forEach(a=>{a.href="https://wa.me/"+contacts[a.dataset.wa]+"?text="+encodeURIComponent(a.dataset.msg||"Olá! Vim pelo app da Trip Eco.")});
document.querySelectorAll(".lead").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const d=Object.fromEntries(new FormData(form));const msg=`Olá! Quero agendar uma conversa com a Trip Eco.\n\nTipo: ${form.dataset.type}\nPessoas: ${d.pessoas}\nCidade de saída: ${d.saida}\nDestino: ${d.destino}\nPeríodo: ${d.periodo}\nPerfil do grupo: ${d.perfil||"Não informado"}\nTelefone: ${d.telefone}`;const pick=confirm("OK: falar pelo (75) 98138-5005.\nCancelar: usar (75) 98273-8522.");location.href="https://wa.me/"+(pick?contacts[1]:contacts[2])+"?text="+encodeURIComponent(msg)}));
const installBtn=document.getElementById("installApp"),installHelp=document.getElementById("installHelp");
const isiOS=/iPad|iPhone|iPod/.test(navigator.userAgent||"");
const standalone=window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
let deferredPrompt=null;
if("serviceWorker" in navigator){window.addEventListener("load",async()=>{try{await navigator.serviceWorker.register("/trip-eco-sw.js?v=12",{scope:"/"});}catch(e){console.error(e);}});}
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;if(installHelp)installHelp.textContent="Trip Eco pronto para instalar.";});
if(installBtn)installBtn.addEventListener("click",async()=>{
 if(standalone){installHelp.textContent="Trip Eco já está instalado neste aparelho.";return;}
 if(isiOS){installHelp.textContent="No iPhone: Safari → Compartilhar → Adicionar à Tela de Início.";return;}
 if(deferredPrompt){deferredPrompt.prompt();const c=await deferredPrompt.userChoice;deferredPrompt=null;installHelp.textContent=c.outcome==="accepted"?"Instalação iniciada.":"Instalação cancelada.";return;}
 installHelp.textContent="No Chrome, toque em ⋮ e escolha Adicionar à tela inicial ou Instalar aplicativo.";
});
window.addEventListener("appinstalled",()=>{deferredPrompt=null;if(installHelp)installHelp.textContent="Trip Eco instalado com sucesso.";});
