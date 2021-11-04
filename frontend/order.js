function displayPurchase() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('conf');
    const firstName = params.get('firstName');
    const lastName = params.get('lastName');
    const address = params.get('address');
    const city = params.get('city');
   
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let purchaseContainer = document.querySelector('.order-container');
    let confirmationContainer = document.querySelector('.confirmation-container');
    let cartCost = localStorage.getItem('totalCostInCart');
    
    purchaseContainer.innerHTML = '';
        Object.values(cartItems).map(teddy => {
            const currencyPrice = teddy.price;
            const price = new Intl.NumberFormat('en-US', { style: 'currency',
            currency: 'USD', useGrouping:false}).format(currencyPrice);
            const currentPrice = price / 100;
            confirmationContainer.innerHTML =
            `
            <h2> Thank You ${firstName} ${lastName} for your order </h2><br>
            <h5> Order Confirmation number : ${orderId} </h5><br>
            <h5>Shipping address : ${address} ${city}</h5><br>
            <h3> Purchase Summary :</h3>
            `
            purchaseContainer.innerHTML +=
            `
            <div class="parent">
                    <div class="cart-detail"> 
                        <img src="${teddy.imageUrl}"></img>
                        <p>${teddy.name}</p>
                    </div>
                        
                    <div class="quantity-input">
                        <span id="quantity"> ${teddy.quantity}</span>
                    </div>

                    <div id="item-color">
                        ${teddy.color}
                    </div>
                        
                    <div id="subtotal">
                        <span>$${(teddy.price * teddy.quantity) / 100}.00</span>
                    </div>
                </div>    
            `
        });
            // for total cost 
            purchaseContainer.innerHTML +=
            `   
                <div class="total-price">
                  <div class="total">  Total Cost : $${cartCost}.00</div>
                </div>
            `;  
}       
displayPurchase();
localStorage.clear();





// const uri = 'http://localhost:3000/api/teddies/order';
// // const singleLink = './viewItem.html?id='

// // ./single-product.html?=_id

// fetch(uri)
//   .then((response) => response.json())
//   .then((data) => info(data));
    
//   console.log(info);
  
  
// function info(array) {
// let confirmationContainer = document.querySelector('.confirmation-container');
//   console.log(confirmationContainer);
//   const length = array.length;

//   for (let i=0; i<length; i++) {
//     const teddyItem = createCard(array[i]);
//     confirmationContainer.appendChild(teddyItem);
//   }
// }


// async function requestInfo() {
//   const response = await get('http://localhost:3000/api/teddies/order');
//   info = response.data;
//   console.log(info)
// }



// function info(array) {
//   const container = document.getElementById('container');
//   console.log(container);
//   const length = array.length;

//   for (let i=0; i<length; i++) {
//     const teddyItem = createCard(array[i]);
//     container.appendChild(teddyItem);
//   }
// }


// function createCard(obj) {
//   let id = obj._id;
 
//   const teddyItem = document.createElement('div');
//   teddyItem.classList.add('teddyItem');
//   const imageItem = document.createElement('img');
//   imageItem.classList.add('image-item')
//   const name = document.createElement('h2');
//   name.classList.add('name')
//   const description = document.createElement('p');
//   description.classList.add('description')
//   const price = document.createElement('p');
//   price.classList.add('price')

//   const link = document.createElement('a');
//   link.classList.add('link')

//   // const myUrl = new URL(window.location.href);
//   // itemUrl = myUrl.searchParams.get(id);
//   // console.log(itemUrl);

//   let anotherLink = './viewItem.html?id=' + id;
//   // link.setAttribute('href', `${singleLink}${obj._id}`)
  
//   name.innerText = obj.name;
//   description.innerText = obj.description;
//   price.innerText = '$' + obj.price + '.00';

//   imageItem.setAttribute('src', obj.imageUrl);
//   imageItem.setAttribute('alt', 'product image');
//   link.setAttribute('href', anotherLink); 
  
  
//   teddyItem.appendChild(link)
//   teddyItem.appendChild(imageItem);
//   teddyItem.appendChild(name);
//   teddyItem.appendChild(description);
//   teddyItem.appendChild(price);


//   return(teddyItem)
// }


