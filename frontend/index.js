
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
                        <a> <button class="addToCart" href="#"> 
                        Add to Cart </button>
                        </a>
                   
                </div>
        `
    )
  })

  if(container) {
    container.innerHTML += itemsHtml.toString().replaceAll(',', '')
  }

    let carts = document.querySelectorAll('.addToCart');  
    for (let i=0; i < carts.length; i++){
      carts[i].addEventListener('click', () => {
        cartNumbers(getAllTeddies[i]);
        totalCost(getAllTeddies[i]);  
      })
  }
} 

function onLoadAddedToCart(){
    const itemNumbers = localStorage.getItem('cartNumbers');
  
    if(itemNumbers){
        document.querySelector('.cart span').textContent = itemNumbers;
    }
  }


function cartNumbers (teddy) {
    let itemNumbers = localStorage.getItem('cartNumbers');
  
    itemNumbers = parseInt(itemNumbers);

    if (itemNumbers){
            localStorage.setItem('cartNumbers', itemNumbers + 1);
            document.querySelector('.myCart span').textContent = itemNumbers + 1;
    }
    else {
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('.myCart span').textContent = 1;
    }

    setItems(teddy)
  }

  
function setItems(teddy)  {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[teddy._id] ==  undefined){
          cartItems =  {
              ...cartItems,
              [teddy._id]: teddy
          }
        }
      cartItems[teddy._id].inCart += 1; 
    } else 
    {
      teddy.inCart = 1;
      cartItems = {
        [teddy._id]: teddy
      }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify 
    (cartItems));
  }

  function totalCost(teddy) {
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("my cartcost is", cartCost)
    console.log(typeof cartCost);

      if(cartCost !== null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + teddy.price);
      } else {
        localStorage.setItem("totalCost", teddy.price);
      }
  }

onLoadAddedToCart();

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







