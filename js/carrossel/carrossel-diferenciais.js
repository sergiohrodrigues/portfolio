const btnDiferencialfRight = document.querySelector("#btnDiferencialRight");
const btnDiferencialLeft = document.querySelector("#btnDiferencialLeft");
const diferenciais = document.querySelectorAll("[data-diferencial]");

let diferencialIndice = 0;

btnDiferencialfRight.addEventListener("click", () => {
    if(diferencialIndice == diferenciais.length - 1){
        diferencialIndice = 0;
    } else {
        diferencialIndice++
    }

    diferenciais.forEach(diferencial => {
        diferencial.classList.remove("diferenciais_lista-item--active");
    })
    
    diferenciais[diferencialIndice].classList.add("diferenciais_lista-item--active")
})

btnDiferencialLeft.addEventListener("click", () => {
    if(diferencialIndice === 0){
        diferencialIndice = diferenciais.length - 1
    } else {
        diferencialIndice--
    }

    diferenciais.forEach(diferencial => {
        diferencial.classList.remove("diferenciais_lista-item--active");
    })

    diferenciais[diferencialIndice].classList.add("diferenciais_lista-item--active");
})