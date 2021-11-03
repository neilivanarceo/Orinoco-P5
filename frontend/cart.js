
function displayCart() {
    let productContainer = document.querySelector('.cart-container');
    let inputFormContainer = document.querySelector('.form-container');
    let emptyCartContainer = document.querySelector('.for-empty-cart');
    let itemsInLocalStorage = localStorage.getItem('productsInCart');
    itemsInLocalStorage = JSON.parse(itemsInLocalStorage);
    let cartCostFromLocalStorage = localStorage.getItem('totalCostInCart');
    cartCostFromLocalStorage = parseInt(cartCostFromLocalStorage);
   

    // for empty cart container
    if (cartCostFromLocalStorage == 0 || itemsInLocalStorage == undefined) {
        emptyCartContainer.innerHTML = 'Your Cart is empty!!!';
        productContainer.innerHTML = '';
        inputFormContainer.innerHTML ='';
        
    } 
    else {
            //container for the products added to cart
        productContainer.innerHTML = '';
        Object.values(itemsInLocalStorage).map(teddy => {
            const currencyPrice = teddy.price / 100;
            // const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
            // currency: 'USD', useGrouping:false}).format(currencyPrice);
            productContainer.innerHTML +=
            `
                <div class="parent">
                    <div class="cart-detail"><a href="./viewItem.html?id=${teddy._id}"> 
                        <img src="${teddy.imageUrl}"></a></img>
                        <p>${teddy.name}</p>
                        <small> Price:$<span class="item-price">${currencyPrice}</span>.00</small><br>
                        <a class="delete-button">Remove</a> 
                    </div>
                        
                    <div class="quantity-input">
                        <ion-icon class="decrease" name="caret-back-outline"></ion-icon>
                        <span id="quantity"> ${teddy.quantity}</span>
                        <ion-icon class="increase" name="caret-forward-outline"></ion-icon>
                    </div>

                   
                    <div class="item-color">${teddy.color}</div>
                    
                    <div id="subtotal">${(teddy.price * teddy.quantity) / 100}.00</div>
                </div>    
            `
              
        });
            // for total cost in the cart
            productContainer.innerHTML +=
            `   
                <div class="total-price">
                  <div class="total">  Total Cost : $${cartCostFromLocalStorage}.00</div>
                </div>
            `;  
            // for checkout button 
            productContainer.innerHTML +=
            ` <div id="checkout-container" >
                  <div class="checkout" onclick="showInputForm()"><a href="#input-form-container"> Checkout</a></div>
                </div>
            `;
            // containter for input form inside cart page
            inputFormContainer.innerHTML +=
            `
                <div id="input-form-container">
                    <div class="forms">
                        <form id="input-information">
                            
                                <div class="form-group">
                                <label for="firstname"> Name : </label>
                                <input name="firstname" type="text" id="firstname" placeholder="First Name" value="" required/ >
                                </div>

                                <div class="form-group">
                                <label for="lastname"> Name : </label>
                                <input  name="lastname" type="text" id="lastname" placeholder="Last Name" value="" required>
                                </div>

                                <div class="form-group">
                                <label for="contact">Contact : </label>
                                <input  name="contact" type="contact" id="contact" placeholder="Phone Number" value=""  required>
                                </div>

                                <div class="form-group">
                                <label for="email"> Email : </label>
                                <input name="email" type="email" id="email" placeholder="Email Address" value="" required>
                                </div>

                                <div class="form-group">
                                <label for="address"> Address : </label>
                                <input  name="address" type="address" id="address" placeholder="Home number and Street" value=""  required>
                                </div>

                                <div class="form-group">
                                <label for="city"> City : </label>
                                <input  name="city" type="city" id="city" placeholder="City Address" value="" required>
                                </div>
                            
                            <button id="submit-button" type="submit"> Purchase</button>
                        </form>
                    </div>   
                </div>  
                
                
                <p id="response-firstname"></p>
                <p id="response-lastname"></p>
                <p id="response-contact"></p>
                <p id="response-email"></p>
                <p id="response-address"></p>
                <p id="response-city"></p>
                <p id="response-id"></p>
                <p id="response-productId"></p>
            `;
    }
}
displayCart()


// input form
function showInputForm() {
    document.getElementById("input-form-container").style.display="flex";
    document.getElementById("checkout-container").style.display="none";
}


function deleteItemFromCart() {
    let deleteButton = document.querySelectorAll('.delete-button');

    let itemCountInCart = localStorage.getItem('totalQuantityInCart'); 
    itemCountInCart = parseInt(itemCountInCart);

    let itemsInLocalStorage = localStorage.getItem('productsInCart');
    itemsInLocalStorage = JSON.parse(itemsInLocalStorage); 

    let cartCostFromLocalStorage = localStorage.getItem('totalCostInCart');
    
    let currentName = '';
    let currentColor = '';
    let currentProduct = '';
    let subTotal = '';

    for (let i=0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
           // get the name and color to combine them to get the unique name in localStorage
            currentName = deleteButton[i].parentElement.querySelector('p').textContent;
            currentColor = deleteButton[i].parentElement.parentElement.querySelector('.item-color').textContent;
            currentProduct = currentName + currentColor;
            subTotal = deleteButton[i].parentElement.parentElement.querySelector('#subtotal').textContent;
            

            // to  calculate the total cost in the cart page when deleting item
            localStorage.setItem('totalCostInCart', cartCostFromLocalStorage - subTotal);

            // to  subrtact the total quantity in the cart or in every page when deleting item
            localStorage.setItem('totalQuantityInCart', itemCountInCart - itemsInLocalStorage[currentProduct].quantity)

            delete itemsInLocalStorage[currentProduct];
            localStorage.setItem('productsInCart', JSON.stringify(itemsInLocalStorage)); 
            displayCart()
        });
    }
}
deleteItemFromCart()


function manageQuantity() {
    
    let itemCountInCart = localStorage.getItem('totalQuantityInCart'); 
    itemCountInCart = parseInt(itemCountInCart);
    
    let itemsInLocalStorage = localStorage.getItem('productsInCart');
    itemsInLocalStorage = JSON.parse(itemsInLocalStorage); 
    let cartCostFromLocalStorage = localStorage.getItem('totalCostInCart');
    cartCostFromLocalStorage = parseInt(cartCostFromLocalStorage);
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
   
    let currentQuantity = '';
    let currentName = '';
    let currentColor = '';
    let currentProduct = '';
    
        for (let i=0; i < decreaseButtons.length; i++) {
            decreaseButtons[i].addEventListener('click', () => {
                currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
                currentName = decreaseButtons[i].parentElement.previousElementSibling.querySelector('p').textContent;
                currentColor = decreaseButtons[i].parentElement.parentElement.querySelector('.item-color').textContent;
                currentProduct = currentName + currentColor;
                console.log(currentProduct)

                if (itemsInLocalStorage[currentProduct].quantity > 1 ) {
                    itemsInLocalStorage[currentProduct].quantity -= 1;
                    localStorage.setItem('productsInCart', JSON.stringify(itemsInLocalStorage)); 
                    localStorage.setItem('totalCostInCart', (cartCostFromLocalStorage - (itemsInLocalStorage[currentProduct].price) / 100));
                    localStorage.setItem('totalQuantityInCart', itemCountInCart -= 1);
                    displayCart()
                }
            });
        }

        for (let i=0; i < increaseButtons.length; i++) {
            increaseButtons[i].addEventListener('click', () => {
                currentQuantity = increaseButtons[i].parentElement.parentElement.querySelector('span').textContent;
                currentName = increaseButtons[i].parentElement.previousElementSibling.querySelector('p').textContent;
                currentColor = increaseButtons[i].parentElement.parentElement.querySelector('.item-color').textContent;
                currentProduct = currentName + currentColor;
                console.log(currentProduct)
                itemsInLocalStorage[currentProduct].quantity += 1;
                localStorage.setItem('productsInCart', JSON.stringify(itemsInLocalStorage)); 
                localStorage.setItem('totalCostInCart', (cartCostFromLocalStorage + (itemsInLocalStorage[currentProduct].price /100)));
                localStorage.setItem('totalQuantityInCart', itemCountInCart += 1);
                displayCart()
            })
        }  
        
}  
manageQuantity()


// // // get form elements

    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const contactInput = document.getElementById('contact');
    const addressInput = document.getElementById('address');
    const emailInput = document.getElementById('email');
    const cityInput = document.getElementById('city');
    const submitButton = document.getElementById('submit-button')

    const api = "http://localhost:3000/api/teddies";

    const responseFirstName = document.getElementById('response-firstname');
    const responseLastName = document.getElementById('response-lastname');
    const responseContact = document.getElementById('response-contact');
    const responseAddress = document.getElementById('response-address');
    const responseCity = document.getElementById('response-city');
    const responseId = document.getElementById('response-id');
    const responseProductId = document.getElementById('response-productId');

    let productName = "";
    let productColor = "";
    let uniqueKey = "";
    let productIds = [];
    let itemsInLocalStorage = localStorage.getItem('productsInCart');
        itemsInLocalStorage = JSON.parse(itemsInLocalStorage); 
Object.values(itemsInLocalStorage).map(item =>{
        const productName = item.name;
        const productColor = item.color;
        const currentProduct = productName + productColor;
        productIds = itemsInLocalStorage[currentProduct]._id; 
     
});      
    
    submitButton.addEventListener('click', ($event) => {
        // alert('alert')
        $event.preventDefault();
        const postRequestObj = {
            contact:  { 
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            address: addressInput.value,
            city: cityInput.value,
            email: emailInput.value,
            contact: contactInput.value
        },
            products: [productIds]   
        }
        submitFormData(postRequestObj);
    });

function makeRequest(data) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', api + '/order');
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 201) {
                    resolve(JSON.parse(request.response));
                } else {
                    reject(JSON.parse(request.response));
                }
            }
        }
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
    });
}

async function submitFormData(postRequestObj) {
    try {
        const requestPromise = makeRequest(postRequestObj);
        const response = await requestPromise; 
        async function goToConf() { 
            location.href = `/order.html?conf=${response.orderId}&firstName=${response.contact.firstName}&lastName=${response.contact.lastName}&address=${response.contact.address}&city=${response.contact.city}`;
        }
        await goToConf();

        responseFirstName.textContent = response.contact.firstName;
        responseLastName.textContent = response.contact.lastName;
        responseContact.textContent = response.contact.contact;
        responseAddress.textContent = response.contact.address;
        responseCity.textContent = response.contact.city;
        responseId.textContent = response.orderId,
        responseProductId.textContent = response.products._id;
    } catch(errorResponse) {
       errorResponse.error;
    }
}    


// input information and back end ---------

// let firstNameInput = document.getElementById('firstname');
// let lastNameInput = document.getElementById('lastname');
// let contact = document.getElementById('contact');
// let emailInput = document.getElementById('email');
// let addressInput = document.getElementById('address');
// let cityInput = document.getElementById('city');
// const formElement = document.getElementById("input-information");

// const url = "http://localhost:3000/api/teddies";

// let productName = "";
// let productColor = "";
// let productIds = [];
// let itemsInLocalStorage = localStorage.getItem('productsInCart');
//     itemsInLocalStorage = JSON.parse(itemsInLocalStorage); 
// const formElement = document.getElementById("input-information");

// Object.values(itemsInLocalStorage).map(item =>{
//     const productName = item.name;
//     const productColor = item.color;
//     const currentProduct = productName + productColor;
//     const productIds = itemsInLocalStorage[currentProduct]._id; 
//     console.log(productIds);

//     formElement.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const postRequestObj = {
//         contact:  { 
//             firstName: firstNameInput.value,
//             lastName: lastNameInput.value,
//             address: addressInput.value,
//             city: cityInput.value,
//             email: emailInput.value
//         },
//         products: [productIds]
//         }

//     try{
//         const response = await fetch(url, {
//             method :'POST',
//             body: JSON.stringify(postRequestObj),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const json = await response.json(postRequestObj);
//         console.log(json);
//     } catch(e){
//         console.error(e);
//     }
// }) 
// });
