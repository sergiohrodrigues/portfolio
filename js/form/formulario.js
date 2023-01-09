import verificaNome from "./verificaNome.js";
import verificaEmail from "./verificaEmail.js";
import verificaData from "./verificaData.js";

const inptsForm = document.querySelectorAll("[required]");
const mensagemError = document.querySelectorAll(".mensagem__form-erro")

inptsForm.forEach(inpt => {
    inpt.addEventListener("blur", () => verificaCampo(inpt))
    inpt.addEventListener("invalid", evento => evento.preventDefault());
})

function verificaCampo(inpt){
    if(inpt.name == "nome"){
        verificaNome(inpt);
    }
    if(inpt.name == "email"){
        verificaEmail(inpt);
    }
    if(inpt.name == "nascimento"){
        verificaData(inpt);
    }
}


const btnEnviar = document.querySelector("#btnEnviar")
const mensagemSucesso = document.querySelector(".mensagem__form-ok")

btnEnviar.addEventListener("click", (e) => {
    e.preventDefault();

    for (let i = 0; i < inptsForm.length; i++){
        if(!inptsForm[i].checkValidity() === true){
            mensagemError[i].style.display = "block";
            inptsForm[i].style.border = "2px solid red"
        } else if (inptsForm.innerHTML == undefined){
            mensagemError[i].style.display = "none";
            inptsForm[i].style.border = ""
            mensagemSucesso.innerHTML = "Dados enviado com sucesso"
        }
    }
})