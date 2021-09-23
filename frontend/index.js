
let getAllTeddies = [];
async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');
  
  getAllTeddies = response.data
  
  showItems()
}
requestItems();

function showItems() {
  const container = document.querySelector('.container');

  const itemsHtml = getAllTeddies.map((teddy,i) => {

    let currencyPrice = teddy.price;
  
    const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
  currency: 'USD', useGrouping:false}).format(currencyPrice);
    
    return (
        `
        <div class="teddy-item"> 
                  
                 <a href="./viewItem.html?id=${teddy._id}"> <img class="image-item" src="${teddy.imageUrl}"></img>
                  </a>
                        <span class="teddy-name">${teddy.name}</span>
                        <span class="description">${teddy.description}</span>
                            <span class="price">Price : ${actualPrice}</span>
                        <a> <button class="addToCart" href="#"> 
                        Add to Cart </button>
                        </a>
                   
                </div>
        `
    )
  })

  if(container) {
    container.innerHTML += itemsHtml.toString().replaceAll(',','');
  }
    let carts = document.querySelectorAll('.addToCart');  
    for (let i=0; i < carts.length; i++){
      carts[i].addEventListener('click', () => {
        cartNumber(getAllTeddies[i]);
        totalCost(getAllTeddies[i]);  
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


// function setItems(teddy)  {
//   let cartItems = localStorage.getItem('productsInCart');
//   cartItems = JSON.parse(cartItems);

//   if (cartItems != null) {
//       if (cartItems[teddy._id] ==  undefined){
//         cartItems =  {
//         ...cartItems,
//         [teddy._id]: teddy
//         }
//       }
//     cartItems[teddy._id].inCart += 1; 
//   } else 
//   {
//     teddy.inCart = 1;
//     cartItems = {
//       [teddy._id]: teddy
//     }
//   }
  
//   localStorage.setItem("productsInCart", JSON.stringify 
//   (cartItems));
// }