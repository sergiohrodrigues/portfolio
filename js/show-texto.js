const campo = document.querySelector("#showText");
const text = "Olá, eu me chamo Sérgio, e sou Desenvolvedor Front-end.";
const interval = 80;

function showText(campo, text, interval){
    //split divide uma string em substrings e coloca em um array e reverse inverte
    const char = text.split("").reverse();
    
    //funcao que chama algo em intervalos especificados (em milissegundos).
    const typer = setInterval(() => {
        if(!char.length){
            //metodo para parar o setInterval
            return clearInterval(typer)
        }
        const next = char.pop();
        
        campo.innerHTML += next
    }, interval)
}

showText(campo, text, interval);