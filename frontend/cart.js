async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');
  teddy = response.data
  displayCart()
}

function displayCart() {
    let productContainer = document.querySelector('.cart-container');
    let formContainer = document.querySelector('.form-container');
    let emptyContainer = document.querySelector('.for-empty-cart');
    let itemsInLocalStorage = localStorage.getItem('productsInCart');
    let cartCost = localStorage.getItem('totalCostInCart');
    itemsInLocalStorage = JSON.parse(itemsInLocalStorage);
    if (cartCost == 0 || itemsInLocalStorage == undefined) {
        productContainer.innerHTML = '';
        formContainer.innerHTML ='';
        emptyContainer.innerHTML = 'Your Cart is empty!!!';
    } 
        else {
            
            productContainer.innerHTML = '';
            Object.values(itemsInLocalStorage).map(teddy => {
                const currencyPrice = teddy.price / 100;
                const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
                currency: 'USD', useGrouping:false}).format(currencyPrice);
                productContainer.innerHTML +=
                `
                <div class="parent">
                    <div class="cart-detail"><a href="./viewItem.html?id=${teddy._id}"> 
                        <img src="${teddy.imageUrl}"></a></img>
                        <p>${teddy.name}</p>
                        <small> Price:$<span class="item-price"> ${currencyPrice}</span>.00 </small><br>
                        <a class="delete-button">Remove</a> 
                    </div>
                        
                    <div class="quantity-input">
                        <ion-icon class="decrease" name="caret-back-outline"></ion-icon>
                        <span id="quantity"> ${teddy.quantity}</span>
                        <ion-icon class="increase" name="caret-forward-outline"></ion-icon>
                    </div>

                    <form> 
                        <select name="color" id="item-color"  title="Choose a color">
                            <option value="${teddy.color}">${teddy.color}</option>
                            <option value="White">White</option>
                            <option value="Brown">Brown</option>
                            <option value="Pink">Pink</option>
                            <option value="Yellow">Yellow</option>
                        </select>
                    </form>
                        
                    <div id="subtotal"><span>$${(teddy.price * teddy.quantity) / 100}.00</span>
                    </div>
                </div>    
                `
              
            });

            productContainer.innerHTML +=
            `
                <div class="total-price">
                  <div class="total">  Total Cost : $${cartCost}.00</div>
                </div>
                
            `;  
            
            productContainer.innerHTML +=
            `
                <div id="checkout-container" >
                  <div class="checkout" onclick="showForm()"><a href="#input-form-container"> Checkout</a></div>
                </div>
            `   ;

           
            formContainer.innerHTML +=
            `
            <div id="input-form-container">
                
                <div class="forms">
                    <form id="input-information" action="post">

                        <div class="form-group">
                            <label for="firstname"> Name : </label>
                            <input type="text" id="firstname" placeholder="First Name"  required>
                        </div>

                        <div class="form-group">
                            <label for="lastname"> Name : </label>
                            <input type="text" id="lastname" placeholder="Last Name"  required>
                        </div>

                        <div class="form-group">
                            <label for="contact">Contact : </label>
                        <input type="contact" id="contact" tabindex="0"   placeholder="Phone Number"  required>
                        </div>

                        <div class="form-group">
                            <label for="address"> Address : </label>
                        <input type="address" id="address" placeholder="Home number and Street"  required>
                        </div>

                        <div class="form-group">
                            <label for="city"> City : </label>
                        <input type="city" id="city" placeholder="City Address"  required>
                        </div>
                        
                        <button class="submit" method="post" type="submit">
                            Purchase
                        </button>
                    </form>
                </div>   
            </div>    
            `;
            
        }
        
}
displayCart()



function showForm() {
    document.getElementById("input-form-container").style.display="flex";
    document.getElementById("checkout-container").style.display="none";
}


function deleteItemFromCart() {
    let deleteButton = document.querySelectorAll('.delete-button');

    let itemCountInCart = localStorage.getItem('totalQuantityInCart'); 
    itemCountInCart = parseInt(itemCountInCart);

    let itemsInLocalStorage = localStorage.getItem('productsInCart');
    itemsInLocalStorage = JSON.parse(itemsInLocalStorage); 

    let cartCost = localStorage.getItem('totalCostInCart');
    
    let currentName = '';
    let currentColor = '';
    let currentProduct = '';

    for (let i=0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
           
            currentName = deleteButton[i].parentElement.querySelector('p').textContent;
            currentColor = deleteButton[i].parentElement.nextElementSibling.nextElementSibling.querySelector('#item-color').value;
            currentProduct = currentName + currentColor;
            console.log(currentProduct);

            localStorage.setItem('totalCostInCart', cartCost - (itemsInLocalStorage[currentProduct].price / 100));

            // console.log(itemsInLocalStorage[currentProduct].name + itemsInLocalStorage[currentProduct].quantity)
            localStorage.setItem('totalQuantityInCart', itemCountInCart - itemsInLocalStorage[currentProduct].quantity)

            delete itemsInLocalStorage[currentProduct];
            localStorage.setItem('productsInCart', JSON.stringify(itemsInLocalStorage)); 
            displayCart()
        });
    }
}
deleteItemFromCart()


function manageQuantity() {
    let itemsInLocalStorage = localStorage.getItem('productsInCart');
    itemsInLocalStorage = JSON.parse(itemsInLocalStorage);
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
   
    let currentQuantity = 0;
    let currentName = '';
    let currentColor = '';
    let currentProduct = '';
    
        for (let i=0; i < decreaseButtons.length; i++) {
            decreaseButtons[i].addEventListener('click', () => {
                currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
                currentName = decreaseButtons[i].parentElement.previousElementSibling.querySelector('p').textContent;
                currentColor = decreaseButtons[i].parentElement.nextElementSibling.querySelector('#item-color').value;
                currentProduct = currentName + currentColor;
                console.log(itemsInLocalStorage[currentProduct].quantity);

                localStorage.setItem('productsInCart', JSON.stringify(itemsInLocalStorage)); 
                itemsInLocalStorage[currentProduct].quantity = itemsInLocalStorage[currentProduct].quantity - 1;
            })
        }

        for (let i=0; i < increaseButtons.length; i++) {
            increaseButtons[i].addEventListener('click', () => {
                currentQuantity = increaseButtons[i].parentElement.parentElement.querySelector('span').textContent;
                currentName = decreaseButtons[i].parentElement.previousElementSibling.querySelector('p').textContent;
                currentColor = decreaseButtons[i].parentElement.nextElementSibling.querySelector('#item-color').value
                currentProduct = currentName + currentColor;
                console.log(currentProduct)
            })
        }       
}  
manageQuantity()



// function totalCostInCart() {    
    
//     console.log(getSubtotal)
    
// }
// totalCostInCart()
