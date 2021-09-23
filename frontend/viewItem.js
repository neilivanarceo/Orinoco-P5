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
                       <select name="color" title="Choose a color">
                           <option value="white">White</option>
                           <option value="brown">Brown</option>
                           <option value="pink">Pink</option>
                           <option value="yellow">Yellow</option>
                       </select>
                   </form>
                   <span class="price">Price : ${actualPrice}</span>
                   <a> <button class="addToCart" href="#"> 
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
      // console.log(teddy);
      cartNumber(teddy);
      totalCost(teddy);  
    })
}
}

function AddedToCart(){
  let itemNumbers = localStorage.getItem('cartNumber');

  if(itemNumbers){
      document.querySelector('.myCart span').textContent = itemNumbers;
  }
}

function cartNumber (teddy) {
  let itemNumbers = localStorage.getItem('cartNumber');

  itemNumbers = parseInt(itemNumbers);

  if (itemNumbers){
          localStorage.setItem('cartNumber', itemNumbers + 1);
          document.querySelector('.myCart span').textContent = itemNumbers + 1;
  }
  else {
          localStorage.setItem('cartNumber', 1);
          document.querySelector('.myCart span').textContent = 1;
  }

  setItems(teddy)
}

function setItems(teddy)  {
let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);

if (cartItems !== null) { 
  if (cartItems[teddy._id] === undefined) {
      cartItems =  {
        ...cartItems,
        [teddy._id]: teddy
      }
    cartItems[teddy._id]['inCart'] = 1; 
  } 
  else { 
    cartItems[teddy._id]['inCart'] += 1; 
    }
} 
else {
    cartItems = {
      [teddy._id]: teddy
    }
  console.log(cartItems[teddy._id]);

  cartItems[teddy._id]['inCart'] = 1;   
 
}
localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(teddy) {
  let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + teddy.price);
    } else {
      localStorage.setItem("totalCost", teddy.price);
    }
}

AddedToCart();
