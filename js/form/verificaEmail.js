export default function verificaEmail(inpt){
    const mensagemError = inpt.parentNode.querySelector(".mensagem__form-erro")
    var emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

    if(!inpt.checkValidity(emailValido)){
        mensagemError.style.display = "block";
        inpt.style.border = "2px solid red"
    } else {
        mensagemError.style.display = "none";
        inpt.style.border = "";
    }
}