const btnHabilidadesRight = document.querySelector("#btnHabilidadesRight");
const btnHabilidadesLeft = document.querySelector("#btnHabilidadesLeft");
const habilidades = document.querySelectorAll("[data-habilidades]");

let habilidadesIndice = 0;

btnHabilidadesRight.addEventListener("click", () => {
    if(habilidadesIndice == habilidades.length - 1){
        habilidadesIndice = 0;
    } else {
        habilidadesIndice++
    }

    habilidades.forEach(diferencial => {
        diferencial.classList.remove("habilidades_lista-item--active");
    })
    
    habilidades[habilidadesIndice].classList.add("habilidades_lista-item--active")
})

btnHabilidadesLeft.addEventListener("click", () => {
    if(habilidadesIndice === 0){
        habilidadesIndice = habilidades.length - 1
    } else {
        habilidadesIndice--
    }

    habilidades.forEach(diferencial => {
        diferencial.classList.remove("habilidades_lista-item--active");
    })

    habilidades[habilidadesIndice].classList.add("habilidades_lista-item--active");
})