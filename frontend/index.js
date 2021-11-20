let getAllTeddies = [];
async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');  // using axios.get to get access to the back end
        if (response.status === 200) {  // if the server is responding it will give you the response from the back end
          getAllTeddies = response.data // i declared getAllTeddies to access the response from the get method.
          showProducts();
        }     
}
requestItems()

function showProducts() {   // here is where the products will show on the page.
 
  const container = document.querySelector('.container');   // this is where you select the class container inside the HTML page of the homepage

    const itemsContainer = getAllTeddies.map((teddy,i) => {   // i use .map to get every data of every product on my backend

    let currencyPrice = teddy.price / 100;
    
      const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
      currency: 'USD', useGrouping:false}).format(currencyPrice);
      
        return(                 // this is the code for the products showing in the home page with all the data from the back end
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

function AddedToCart(){                                 
  let itemCount = localStorage.getItem('totalQuantityInCart');      // this is where the cart page will update everytime the user adding product in to the cart

  if(itemCount){
      document.querySelector('.myCart span').textContent = itemCount;
  }
}
AddedToCart()
