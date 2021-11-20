function displayPurchase() {             // i used params.get to get the data from the URL
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
        Object.values(cartItems).map(teddy => {         // i use object.values to get every data inside my localstorage which is the cartItems showing in the line 9.
            const currencyPrice = teddy.price;          // to show the purchase summary of the user.
            const price = new Intl.NumberFormat('en-US', { style: 'currency',
            currency: 'USD', useGrouping:false}).format(currencyPrice);
            const currentPrice = price / 100;
            confirmationContainer.innerHTML =       // here where it showed what we got from the params, like firstname, lastname. and the orderID will show as well
            `
            <h2> Thank You ${firstName} ${lastName} for your order! </h2><br> 
            <h5> Order Confirmation Id : ${orderId} </h5><br>
            <h3> Purchase Summary :</h3>
            `
            purchaseContainer.innerHTML +=  // here where it showed what we got from the object.values from the localstorage which is the products added to the cart.
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
                
            `
        });
            // for total cost 
            purchaseContainer.innerHTML += // here will show you the total cost of the products that has been purchased.
            `   
                <div class="total-price">
                  <div class="total">  Total Cost : $${cartCost}.00</div>
                </div>
            `;  
}       
displayPurchase();
localStorage.clear(); // after showing the confirmation page. localstorage will be cleared.




