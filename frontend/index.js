// request the data on the server
let getAllTeddies = [];
async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');  
          getAllTeddies = response.data
}
requestItems()

// will display the product in the home page.
function showProducts() { 
  const container = document.querySelector('.container');
  const itemsContainer = getAllTeddies.map((teddy,i) => {
    let currencyPrice = teddy.price / 100;
    const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
      currency: 'USD', useGrouping:false}).format(currencyPrice);
        return(
          `
            <div class="teddy-item"> 
              <a href="./viewItem.html?id=${teddy._id}"> <img class="image-item" src="${teddy.imageUrl}"></img></a>             
              <a href="./viewItem.html?id=${teddy._id}">  <span class="teddy-name">${teddy.name}</span></a>
              <span class="description">${teddy.description}</span>
              <span class="price">Price : ${actualPrice}</span> 
            </div>
          `
        )
    })
      if(container) {
        container.innerHTML += itemsContainer.toString().replaceAll(',','');
      }
}
// this will update the number added to the cart
function AddedToCart(){                                 
  let itemCount = localStorage.getItem('totalQuantityInCart');    
    if(itemCount){
      document.querySelector('.myCart span').textContent = itemCount;
    }
}
AddedToCart()
