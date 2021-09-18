const carts = document.querySelectorAll('.addToCart');
let objects = [];

async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');
  
  getAllTeddies = response.data
  console.log(getAllTeddies)

  showItems()
}
requestItems();

function showItems() {
  const container = document.querySelector('.container');
 
  const itemsHtml = getAllTeddies.map((teddy,i) => {
    return (
        `
        <div class="teddy-item"> 
                  
                 <a href="./viewItem.html?id=${teddy._id}"> <img class="image-item" src="${teddy.imageUrl}"></img>
                  </a>
                        <span class="teddy-name">${teddy.name}</span>
                        <span class="description">${teddy.description}</span>
                        
                            <form> Color:
                                <select name="color" title="Choose a color">
                                    <option value="white">White</option>
                                    <option value="brown">Brown</option>
                                    <option value="pink">Pink</option>
                                    <option value="yellow">Yellow</option>
                                </select>
                            </form>
                            <span class="price">Price : $${teddy.price}</span>
                        <a class="addToCart"> 
                        Add to Cart
                        </a>
                   
                </div>
        `
    )
  })

  if(container) {
    container.innerHTML += itemsHtml.toString()
  }
}

  // for (let i=0; i < carts.length; i++){
  //   carts[i].addEventListener('click', () => {
  //       // addedToCart(getAllTeddies[i]);
  //       console.log("clicked button");
  //   })
  // }
  
  // function onLoadAddedToCart(){
  //   const productNumber = localStorage.getItem('addedToCart');
  
  //   if(productNumber){
  //       document.querySelector('.cart span').textContent = productNumber;
  //   }
  // }
  
  // function addedToCart (teddy){
  //   const productNumber = localStorage.getItem('addedToCart');
  
  //   productNumber = parseInt(productNumber);
  
  //   if (productNumber){
  //       localStorage.setItem('addedToCart', productNumber + 1);
  //       document.querySelector('.cart span').textContent = productNumber + 1;
  //   }
  //   else {
  //       localStorage.setItem('addedToCart', 1);
  //       document.querySelector('.cart span').textContent = 1;
  //   }
  //   setItems(teddy)
  // }
  
  // function setItems(teddy){
  //   console.log("Inside of SetItems function");
  //   console.log("my product is", teddy);
  //   teddy.inCart = 1;
  //   const cartItems = {
  //       [teddy._id]: teddy
  //   }
    
  //   localStorage.setItem("productIncart",cartItems) ;
  // }
  // onLoadAddedToCart();







