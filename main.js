/*AQUI BORRE MI CODIGO */

const btnCart = document.querySelector(".carrito_imagen")
const containerCartProducts = document.querySelector(".container-cart-products")




btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

const cardInfo = document.querySelector('.card-product')
const rowProduct = document.querySelector('.row-product');


/* LISTA DE TODOS LOS CONTENEDORES DE PRODUCTOS */
const productsList = document.querySelector(".containerCarta")


//Variables de arreglos de productos

let allProducts = JSON.parse(localStorage.getItem("allProducts")) || []
const valorTotal = document.querySelector(".total-pagar")
const countProducts = document.querySelector("#contador-productos")


productsList.addEventListener("click",e=>{
    if(e.target.classList.contains("btn_compra")){
        const product = (e.target.parentElement)
        const infoProduct ={
            quantity: 1,
            title:product.querySelector("h2").textContent,
            price: product.querySelector("h3").textContent,
        }

        const exits = allProducts.some(product=> product.title === infoProduct.title)
        if(exits){
            const products = allProducts.map(product=>{
                if(product.title===infoProduct.title){
                    product.quantity++;
                    return product
                }else{
                    return product
                }
            })
            allProducts=[...products]
        }else{
            allProducts=[...allProducts, infoProduct]
        }
        showHTML();
        saveLocal();
    }

})


rowProduct.addEventListener("click",e=>{
    if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector(".titulo-producto-carrito").textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);
		showHTML();
        saveLocal();
	}
});



// FUNCION PARA MOSTRAR HTML

const showHTML = ()=> {

    //limpiar HTML
    rowProduct.innerHTML='';

    let total = 0
    let totalOfProduct = 0



    allProducts.forEach(product=>{
        const containerProduct = document.createElement("div")
        containerProduct.classList.add("card-product")
        containerProduct.innerHTML=`
        <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quantity}</span>
        <span class="titulo-producto-carrito">${product.title}</span>
        <span class="precio-producto-carrito">${product.price}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="icon-close">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        `
        rowProduct.append(containerProduct)

        total = total+parseInt(product.quantity*product.price.slice(3))
        totalOfProduct = totalOfProduct + product.quantity

    })

    valorTotal.innerText = `S/.${total}`;
    countProducts.innerText= totalOfProduct
}

//SET ITEM
const saveLocal =()=>{
    localStorage.setItem("allProducts",JSON.stringify(allProducts))
}

//GET ITEM
JSON.parse(localStorage.getItem("allProducts"))