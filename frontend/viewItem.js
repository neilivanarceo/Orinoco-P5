let objects = [];
const params = new URLSearchParams(window.location.search);
const id = params.get('id')
async function requestItems() {
  const response = await axios.get(`http://localhost:3000/api/teddies/${id}`);
  teddy = response.data;
  showItems()
}
requestItems();

function showItems() {
  const container = document.querySelector('.container');
  let currencyPrice = teddy.price;
  const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
  currency: 'USD', useGrouping:false}).format(currencyPrice);
  const itemsHtml = 
        `
        <div class="teddy-item"> 
            <img class="image-item" src="${teddy.imageUrl}"></img>
               <span class="teddy-name">${teddy.name}</span>
               <span class="description">${teddy.description}</span>
               
                   <form> Color:
                       <select name="color" id="item-color" title="Choose a color">
                           <option value="White">White</option>
                           <option value="Brown">Brown</option>
                           <option value="Pink">Pink</option>
                           <option value="Yellow">Yellow</option>
                       </select>
                   </form>
                   <span class="price">Price : ${actualPrice}</span>
                   <a> <button class="addToCart"  href="#"> 
                   Add to Cart </button>
                   </a>
        </div>
        `
  if(container) {
    container.innerHTML += itemsHtml.toString()
  }

  let carts = document.querySelectorAll('.addToCart');  
  for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
      itemsInLocalStorage(teddy)
    })
  }
}

function AddedToCart(){
  let itemCountInCart = localStorage.getItem('totalQuantityInCart');
  if(itemCountInCart){
      document.querySelector('.myCart span').textContent = itemCountInCart;
  }
}
// function totalQuantityInCart () {
//   // let itemCountInCart = localStorage.getItem('itemsInLocalStorage');
//   // itemCountInCart = parseInt(itemCountInCart);
//   if (itemCountInCart){
//           localStorage.setItem('totalQuantityInCart', itemCountInCart + 1);
//           document.querySelector('.myCart span').textContent = itemCountInCart + 1;
//   }
//   else {
//           localStorage.setItem('totalQuantityInCart', 1);
//           document.querySelector('.myCart span').textContent = 1;
//   }
// }

function itemsInLocalStorage(teddy) {
  let itemCountInCart = localStorage.getItem('totalQuantityInCart');  
  itemCountInCart = parseInt(itemCountInCart);
      
  let cartCost = localStorage.getItem('totalCostInCart');
  cartCost = parseInt(cartCost);
 
  let itemsInLocalStorage = localStorage.getItem('productsInCart');
  itemsInLocalStorage = JSON.parse(itemsInLocalStorage);
  
  let itemColor = document.getElementById('item-color').value;
 
  if (itemsInLocalStorage !== null) { 
    if (itemsInLocalStorage[teddy._id + itemColor] === undefined) {           //here where second and the rest item added to cart will work
      itemsInLocalStorage =  {
          ...itemsInLocalStorage,
          [teddy._id + itemColor]: teddy
        } 

        localStorage.setItem('totalQuantityInCart', itemCountInCart + 1);           // will add quantity inside cart.
        document.querySelector('.myCart span').textContent = itemCountInCart + 1; 
        
        localStorage.setItem("totalCostInCart", cartCost + teddy.price);            // computing the cost inside the cart

        itemsInLocalStorage[teddy._id + itemColor]['quantity'] = 1;                   // adding quantity info on my product

        itemsInLocalStorage[teddy._id + itemColor]['color'] = itemColor;             // adding color info on my product
        
        alert(`Your adding same bear named ${teddy.name} with a new color of ${itemColor}`);  // will alert the customer that he's adding the same bear but different color
    } 
    else { 
      itemsInLocalStorage[teddy._id + itemColor] == undefined ;         // here when item is already in the cart it will not add the same item. 
      alert(`This bear named ${teddy.name} with a color of ${itemColor} is already in your cart`);    // and it will alert the customer.
    }
  } 
  else {                                                                       // here where first item will add to cart 
    itemsInLocalStorage = {
      [teddy._id + itemColor]: teddy
    }           
    
    localStorage.setItem('totalQuantityInCart', 1);                         // counting quantity insinde the cart
    document.querySelector('.myCart span').textContent = 1;                 

    localStorage.setItem("totalCostInCart", teddy.price);                   // computing the cost inside the cart

    itemsInLocalStorage[teddy._id + itemColor]['color'] = itemColor;        // adding color info on my product

    itemsInLocalStorage[teddy._id + itemColor]['quantity'] = 1;              // adding quantity info on my product

    alert(`Your adding bear named ${teddy.name} with a color of ${itemColor} in your cart`);      //will alert the customer that his adding a new bear
  }
  localStorage.setItem("productsInCart", JSON.stringify(itemsInLocalStorage));
}
// function totalCostInCart(teddy) {
//   let cartCost = localStorage.getItem('totalCostInCart');
//     if(cartCost != null) {
//       cartCost = parseInt(cartCost);
//       localStorage.setItem("totalCostInCart", cartCost + teddy.price);
//     } else {
//       localStorage.setItem("totalCostInCart", teddy.price);
//     }
// }
AddedToCart();