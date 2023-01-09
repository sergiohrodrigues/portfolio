const btnRight = document.querySelector("#btnRight");
const btnLeft = document.querySelector("#btnLeft");
const projetos = document.querySelectorAll("[data-projetos]");

let projetoIndice = 0;

btnRight.addEventListener("click", () => {
    if(projetoIndice === projetos.length -1){
        projetoIndice = 0;
    }else {
        projetoIndice++
    }
    
    projetos.forEach(projeto => {
        projeto.classList.remove('projetos__lista-item--active')
    })
    
    projetos[projetoIndice].classList.add('projetos__lista-item--active');
    
})



btnLeft.addEventListener("click", () => {
    if(projetoIndice === 0){
        projetoIndice = projetos.length - 1
    } else {
        --projetoIndice
    }
    
    projetos.forEach(projeto => {
        projeto.classList.remove('projetos__lista-item--active')
    })
    
    projetos[projetoIndice].classList.add('projetos__lista-item--active');
})