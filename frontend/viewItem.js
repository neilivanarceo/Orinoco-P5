let productsInCart = [];
const params = new URLSearchParams(window.location.search);
const id = params.get('id')
async function requestItems() {
  const response = await axios.get(`http://localhost:3000/api/teddies/${id}`);
  teddy = response.data;
  showItem()
}
requestItems();

function showItem() {
  const container = document.querySelector('.container');
  let currencyPrice = teddy.price /100;
  const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
  currency: 'USD', useGrouping:false}).format(currencyPrice, teddy.price);
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

  let carts = document.querySelectorAll('.addToCart');            // selecting the addToCart button.
  for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
      itemsInLocalStorage(teddy)
      
    })
  }
}

function AddedToCart(){                                                 // this function is to get quantity inside the totalQuantityInCart 
  let itemCountInCart = localStorage.getItem('totalQuantityInCart');    // in the local Storage to add in myCart inside HTML
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
      
  let cartCostFromLocalStorage = localStorage.getItem('totalCostInCart');
  cartCostFromLocalStorage = parseInt(cartCostFromLocalStorage);
 
  let itemsInLocalStorage = localStorage.getItem('productsInCart');
  itemsInLocalStorage = JSON.parse(itemsInLocalStorage);
  
  let itemColor = document.getElementById('item-color').value;
 
  if (itemsInLocalStorage !== null) {                                         
    if (itemsInLocalStorage[teddy.name + itemColor] === undefined) {           //here where second and the rest item add to local storage    2nd
      itemsInLocalStorage =  {
          ...itemsInLocalStorage,
          [teddy.name + itemColor]: teddy
        } 

        localStorage.setItem('totalQuantityInCart', itemCountInCart + 1);           // will add quantity inside cart.
        document.querySelector('.myCart span').textContent = itemCountInCart + 1; 
        
        localStorage.setItem("totalCostInCart", cartCostFromLocalStorage + teddy.price / 100);            // computing the cost inside the cart

        itemsInLocalStorage[teddy.name + itemColor]['quantity'] = 1;                   // adding quantity info on my product
        

        itemsInLocalStorage[teddy.name + itemColor]['color'] = itemColor;             // adding color info on my product
        
        alert(`Your adding a new bear named ${teddy.name} with a color of ${itemColor}`);  // will alert the customer that he's adding the same bear but different color
    } 
    else { 
      itemsInLocalStorage[teddy.name + itemColor] == undefined ;         // here when item is already in the cart it will not add the same item. 
      alert(`This bear named ${teddy.name} with a color of ${itemColor} is already in your cart`);    // and it will alert the customer.
    }
  } 
  else {                                                                       // here where first item will add to local storage     1st
    itemsInLocalStorage = {
      [teddy.name + itemColor]: teddy
    }           
    
    localStorage.setItem('totalQuantityInCart', 1);                         // counting quantity insinde the cart
    document.querySelector('.myCart span').textContent = 1;                 

    localStorage.setItem("totalCostInCart", teddy.price / 100 );                   // computing the cost inside the cart

    itemsInLocalStorage[teddy.name + itemColor]['color'] = itemColor;        // adding color info on my product

    itemsInLocalStorage[teddy.name + itemColor]['quantity'] = 1;              // adding quantity info on my product
    

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


