
let cart = document.querySelectorAll('.addToCart');


for (let i = 0; i < cart.length; i++){
    cart[i].addEventListener('click', () => {
        addedToCart(object[i]);
    })
}

function onLoadAddedToCart(){
    let productNumber = localStorage.getItem('addedToCart');

    if(productNumber){
        document.querySelector('.cart span').textContent = productNumber;
    }
}

function addedToCart (product){
    let productNumber = localStorage.getItem('addedToCart');
 
    productNumber = parseInt(productNumber);

    if (productNumber){
        localStorage.setItem('addedToCart', productNumber + 1);
        document.querySelector('.cart span').textContent = productNumber + 1;
    }
    else {
        localStorage.setItem('addedToCart', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product)
}

function setItems(product){
    console.log("Inside of SetItems function");
    console.log("my product is", product);
    product.inCart = 1;
    let cartItems = {
        [product.name]: product
    }
    
    localStorage.setItem("productIncart",cartItems) ;
}
onLoadAddedToCart();