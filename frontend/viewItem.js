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
                           <option value="white">White</option>
                           <option value="brown">Brown</option>
                           <option value="pink">Pink</option>
                           <option value="yellow">Yellow</option>
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
      // console.log(teddy);
      quantityInCart(teddy);
      totalCostInCart(teddy);  
      
    })
  }
}

function AddedToCart(){
  let itemCount = localStorage.getItem('quantityInCart');
  if(itemCount){
      document.querySelector('.myCart span').textContent = itemCount;
  }
}

function quantityInCart (teddy) {
  let itemCount = localStorage.getItem('quantityInCart');
  itemCount = parseInt(itemCount);
  if (itemCount){
          localStorage.setItem('quantityInCart', itemCount + 1);
          document.querySelector('.myCart span').textContent = itemCount + 1;
  }
  else {
          localStorage.setItem('quantityInCart', 1);
          document.querySelector('.myCart span').textContent = 1;
  }

  itemsInLocalStorage(teddy)
}

function itemsInLocalStorage(teddy)  {
  let itemsInLocalStorage = localStorage.getItem('productsInCart');
  let itemColor = document.getElementById('item-color').value;
  // colorChoice = localStorage.getItem('productsInCart');
  // console.log(colorChoice)
  itemsInLocalStorage = JSON.parse(itemsInLocalStorage);

  if (itemsInLocalStorage !== null) { 
    if (itemsInLocalStorage[teddy._id + itemColor] === undefined) {
      itemsInLocalStorage =  {
          ...itemsInLocalStorage,
          [teddy._id + itemColor]: teddy
        }
        itemsInLocalStorage[teddy._id + itemColor]['quantity'] = 1; 
        itemsInLocalStorage[teddy._id + itemColor]['color'] = itemColor;
        alert('Your adding another bear named ${teddy.name} with a color of ${itemcolor}'); 
    } 
    else { 
      itemsInLocalStorage[teddy._id + itemColor]['quantity'] += 1; 
      alert(' Your adding same bear of ${teddyName} with a same color of ${itemcolor}');
    }
  } 
  else {
    itemsInLocalStorage = {
      [teddy._id + itemColor]: teddy
    }                                                                      
    itemsInLocalStorage[teddy._id + itemColor]['color'] = itemColor;        // get every value inside productsInCart for alert and itemColor
    itemsInLocalStorage[teddy._id + itemColor]['quantity'] = 1;  
    alert('Your adding bear named ${teddy.name} with acolor of ${itemcolor[i]}'); 
    console.log(itemsInLocalStorage[teddy._id + itemColor]);
  }
  localStorage.setItem("productsInCart", JSON.stringify(itemsInLocalStorage));
}

function totalCostInCart(teddy) {
  let cartCost = localStorage.getItem('totalCostInCart');
    if(cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCostInCart", cartCost + teddy.price);
    } else {
      localStorage.setItem("totalCostInCart", teddy.price);
    }
}
AddedToCart();