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
          <div id="alert"><span></span></div>
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

function itemsInLocalStorage(teddy) {
  
  let itemCountInCart = localStorage.getItem('totalQuantityInCart');  // get the quantity in the local storage
  itemCountInCart = parseInt(itemCountInCart);

  let message = [];
   message = document.getElementById('alert').textContent;      // the alert notification after adding to the cart


  let cartCostFromLocalStorage = localStorage.getItem('totalCostInCart');
  cartCostFromLocalStorage = parseInt(cartCostFromLocalStorage);
 
  let itemsInLocalStorage = localStorage.getItem('productsInCart');
  itemsInLocalStorage = JSON.parse(itemsInLocalStorage);
 
  let itemColor = document.getElementById('item-color').value;
  console.log(itemColor);
 
  if (itemsInLocalStorage !==  null) {                                         
    if (itemsInLocalStorage[teddy.name + itemColor] == undefined) {           //here where the second and the rest item add to local storage"    
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

        document.getElementById('alert').textContent = `${teddy.name} with a color of ${itemColor} added to the cart`;

    } 
      else {                                                              // here where the same item will add another quantity.

        localStorage.setItem('totalQuantityInCart', itemCountInCart + 1);           // will add quantity inside cart.
        document.querySelector('.myCart span').textContent = itemCountInCart + 1; 

        localStorage.setItem("totalCostInCart", cartCostFromLocalStorage + teddy.price / 100);

        itemsInLocalStorage[teddy.name + itemColor]['quantity'] += 1; // will add 1 to the quantity of the product
        
        itemsInLocalStorage[teddy.name + itemColor]['color'] = itemColor;  
        // alert(`+1`);
        alert(`Your adding another bear named ${teddy.name} with a color of ${itemColor}`);

        document.getElementById('alert').textContent = `Another ${teddy.name} with a color of ${itemColor} added to the cart`;
      }
  } 
  else {                                                                       // here where "first item" will add to local storage   
    itemsInLocalStorage = {
      [teddy.name + itemColor]: teddy
    }       

    localStorage.setItem('totalQuantityInCart', 1);                         // counting quantity insinde the cart
    document.querySelector('.myCart span').textContent = 1;                 

    localStorage.setItem("totalCostInCart", teddy.price / 100 );                   // computing the cost inside the cart

    itemsInLocalStorage[teddy.name + itemColor]['color'] = itemColor;        // adding color info on my product

    itemsInLocalStorage[teddy.name + itemColor]['quantity'] = 1;              // adding quantity info on my product
    // alert(`1`);
    alert(`Your adding bear named ${teddy.name} with a color of ${itemColor} in your cart`);      //will alert the customer that his adding a new bear

    document.getElementById('alert').textContent = `${teddy.name} with a color of ${itemColor} added to the cart`;
  }
  localStorage.setItem("productsInCart", JSON.stringify(itemsInLocalStorage));
}
AddedToCart();  