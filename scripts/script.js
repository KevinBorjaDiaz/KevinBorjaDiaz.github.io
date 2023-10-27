const codigo =`Hola wenos diaaas

    aqui va una pequenia intro que ahorita no se me ocurre, bla bla bla bla bla bla bla bla bla bla bla bla bla bla. bla bla bla bla bla bla bla bla Lorem impum dolore algo bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla.
    
    ONCE de cora, enamorao de la made in japan y dela que se enoja los sabados
    
    Sin nada mas que decir, gracias`

const hackertext = document.getElementById("hackertext");
const flecha = document.getElementById("flecha");
const fotoBinario = document.getElementById("binario");
const container = document.getElementById("container");

const n = codigo.length;
let terminado=false;
let fijado=false;
let exceso=0;
let diff = 0;
let binarioTop = 0;
let scrollPos = 0;
let newContainerH=0;

//coordenadas de hackertext
let hackertextCoords = hackertext.getBoundingClientRect();

function fijar(){
    hackertext.style.position = "fixed";
    hackertext.style.top = 10 + 'vh';
    fijado = true;
    diff = hackertextCoords.top - 100;
    binarioTop = fotoBinario.getBoundingClientRect().top;
}

window.addEventListener("scroll", () => {
    //cuanto scroll llevas 
    let scrollDiff = window.scrollY -scrollPos;
    scrollPos = window.scrollY;
    
    //flecha aparece o desaparece
    flecha.style.display = scrollPos === 0 ? "block" : "none";
    
    //hackertext escrito
    hackertext.textContent = codigo.substring(0, fijado ? scrollPos/2 : scrollPos/1.8);
    terminado = scrollPos/2 > n ? true : false;

    //actualizar coordenadas y fijar texto
    hackertextCoords = hackertext.getBoundingClientRect();
    if (hackertextCoords.top <= 100 && !fijado && !terminado && scrollPos-window.innerHeight<hackertextCoords.height*.8){
        exceso=0;
        fijar();
    }

    //que texto siga subiendo para que no cubra la pantalla
    if ( (terminado && fijado) || scrollPos-window.innerHeight>=hackertextCoords.height*.8){
        hackertext.style.position = "absolute";
        if(exceso==0) {
            hackertext.style.top = `${scrollPos+window.innerHeight*0.1}px`;
            exceso=scrollPos;
        }else{
            hackertext.style.top = `${exceso}px`;
        }
        fijado=false;
    }

    // Que se vuelva a mover el texto cuando subes
    if (fijado && (fotoBinario.getBoundingClientRect().top + diff > binarioTop)  ) {
        fijado = false;
        hackertext.style.position = "absolute";
    }

    //aumentar o disminuir container
    if(!terminado){
        newContainerH = container.offsetHeight + (scrollDiff*1.2);
        container.style.height = newContainerH + "px";
    }
});