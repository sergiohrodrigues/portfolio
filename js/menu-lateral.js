const menu = document.querySelector("#menu")
const lista = document.querySelector(".lista")
const menuClose = document.querySelector("#menu-close")
const itensMenu = document.querySelectorAll(".lista-item")

menu.addEventListener("click", () => {
    lista.classList.toggle("lista-active")
})

menuClose.addEventListener("click", () => {
    lista.classList.toggle("lista-active")

})

itensMenu.forEach((menu) => {
    menu.addEventListener("click", () => {
        lista.classList.remove("lista-active")
    })
})