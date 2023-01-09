export default function verificaData(inpt){
    const mensagemError = inpt.parentNode.querySelector(".mensagem__form-erro");

    if(inpt.value == ""){
        mensagemError.style.display = "block";
        inpt.style.border = "2px solid red"
    } else {
        mensagemError.style.display = "none";
        inpt.style.border = "";
    }
}