//get the product from the local storage and display the item in the cart page.
function displayCart() {
    let productContainer = document.querySelector('.cart-container');
    let inputFormContainer = document.querySelector('.form-container');
    let emptyCartContainer = document.querySelector('.for-empty-cart');
    let itemsInLocalStorage = localStorage.getItem('productsInCart');
    itemsInLocalStorage = JSON.parse(itemsInLocalStorage);
    let cartCostFromLocalStorage = localStorage.getItem('totalCostInCart');
    cartCostFromLocalStorage = parseInt(cartCostFromLocalStorage);
   

    // for empty cart container when the cart is empty.
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
        
            productContainer.innerHTML +=
            `
                <div class="parent">
                    <div class="cart-detail"><a href="./viewItem.html?id=${teddy._id}"> 
                        <img src="${teddy.imageUrl}"></a></img>
                        <p>${teddy.name}</p>
                        <small> Price:$<span class="item-price">${currencyPrice}</span>.00</small>
                        <a class="delete-button">Remove</a> 
                    </div>
                        
                    <div class="quantity-input">
                        <ion-icon class="decrease" name="caret-back-outline"></ion-icon>
                        <span id="quantity"> ${teddy.quantity}</span>
                        <ion-icon class="increase" name="caret-forward-outline"></ion-icon>
                    </div>

                    <div class="item-color">${teddy.color}</div>
                    
                    <div id="subtotal">
                        $<span>${(teddy.price * teddy.quantity) / 100}</span>.00
                    </div>
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

            // container for input form inside cart page
            inputFormContainer.innerHTML =
                `
                <div id="input-form-text">
                  <p> Please complete your details to purchase</p>
                </div>
                <div id="input-form-container">
                    <div class="forms">
                        <form id="input-information" name="myForm">
                            <div class="form-group">
                                <label for="firstname"> First Name : </label>
                                <input name="firstname" type="text" id="firstname" placeholder="First Name" value="" required/>
                                <i class="fas fa-check-circle"></i>
                                <i class="fas fa-exclamation-circle"></i>
                                <small>error message</small>
                            </div>

                            <div class="form-group">
                                <label for="lastname"> Last Name : </label>
                                <input  name="lastname" type="text" id="lastname" placeholder="Last Name" value="" required/> 
                                <i class="fas fa-check-circle"></i>
                                <i class="fas fa-exclamation-circle"></i>
                                <small>error message</small>
                            </div>

                            <div class="form-group">
                                <label for="contact">Contact : </label>
                                <input  name="contact" type="contact" id="contact" placeholder="Phone Number" value="" required/>
                                <i class="fas fa-check-circle"></i>
                                <i class="fas fa-exclamation-circle"></i>
                                <small>error message</small>
                            </div>

                            <div class="form-group">
                                <label for="email"> Email : </label>
                                <input name="email" type="email" id="email" placeholder="Email Address" value="" required/>
                                <i class="fas fa-check-circle"></i>
                                <i class="fas fa-exclamation-circle"></i>
                                <small>error message</small>
                            </div>

                            <div class="form-group">
                            <label for="address"> Address : </label>
                            <input  name="address" type="address" id="address" placeholder="Home number and Street" value="" required/>
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-exclamation-circle"></i>
                            <small>error message</small>
                            </div>

                            <div class="form-group">
                            <label for="city"> City : </label>
                            <input  name="city" type="city" id="city" placeholder="City Address" value="" required/>
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-exclamation-circle"></i>
                            <small>error message</small>
                            </div>
                            
                            <input id="submit-button" type="submit" value="Purchase">
                        </form>
                    </div>   
                </div>  
            `;
    }
}
displayCart()

// deleting item from the cart page and local storage
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
    // delete button
    for (let i=0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
           // get the name and color to combine them to get the unique name in localStorage
            currentName = deleteButton[i].parentElement.querySelector('p').textContent;
            currentColor = deleteButton[i].parentElement.parentElement.querySelector('.item-color').textContent;
            currentProduct = currentName + currentColor;
            subTotal = deleteButton[i].parentElement.parentElement.querySelector('#subtotal span').textContent;
            
            // to  calculate the total cost in the cart page when deleting item
            localStorage.setItem('totalCostInCart', cartCostFromLocalStorage - subTotal);

            // to  subtract the total quantity in the cart every page when deleting item
            localStorage.setItem('totalQuantityInCart', itemCountInCart - itemsInLocalStorage[currentProduct].quantity)

            delete itemsInLocalStorage[currentProduct];
            localStorage.setItem('productsInCart', JSON.stringify(itemsInLocalStorage)); 
            displayCart()
        });
    }
}
deleteItemFromCart()

// add or subtract quantity of an item in the cart page.
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
        // for subtract item
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
        // for add item
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

// input form and the backend and POST method

const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const contactInput = document.getElementById('contact');
const addressInput = document.getElementById('address');
const emailInput = document.getElementById('email');
const cityInput = document.getElementById('city');
const submitButton = document.getElementById('submit-button');
// iniatilize boolean into false
let firstNameValid = false;
let lastNameValid = false;
let contactValid = false;
let addressValid = false;
let emailValid = false;
let cityValid = false;
// first name validation
firstNameInput.addEventListener('blur', () => {
    if(!isFirstNameValid(firstNameInput.value)) {
        setErrorFor(firstNameInput, 'First Name is not valid');
    } else {
        firstNameValid = true;
        setSuccessFor(firstNameInput)
    }
})
// last name validation
lastNameInput.addEventListener('blur', () => {

    if(!isLastNameValid(lastNameInput.value)) {
        setErrorFor(lastNameInput, 'Last Name is not valid');
    } else {
        lastNameValid = true;
        setSuccessFor(lastNameInput)
    }
})
// contact validation
contactInput.addEventListener('blur', () => {
    if(!isContactValid(contactInput.value)) {
        setErrorFor(contactInput, 'Contact is not valid');
    } else {
        contactValid = true;
        setSuccessFor(contactInput)
    }
})
// email validation
emailInput.addEventListener('blur', () => {
    if(!isEmailValid(emailInput.value)) {
        setErrorFor(emailInput, 'Email is not valid');
    } else {
        emailValid = true;
        setSuccessFor(emailInput)
    }
})
// address validation 
addressInput.addEventListener('blur', () => {
    if(!isAddressValid(addressInput.value)) {
        setErrorFor(addressInput, 'Address is not valid');
    } else {
        addressValid = true;
        setSuccessFor(addressInput)
    }
})
// city validation 
cityInput.addEventListener('blur', () => {
    if(!isCityValid(cityInput.value)) {
        setErrorFor(cityInput, 'City is not valid');
    } else {
        cityValid = true;
        setSuccessFor(cityInput)
    }
})
//for back end
const api = "http://localhost:3000/api/teddies";

const responseFirstName = document.getElementById('response-firstname');
const responseLastName = document.getElementById('response-lastname');
const responseContact = document.getElementById('response-contact');
const responseAddress = document.getElementById('response-address');
const responseCity = document.getElementById('response-city');
const responseId = document.getElementById('response-id');

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
    // addEventListener for submit button
submitButton.addEventListener('click', ($event) => {
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
    };

    // another validation for input form when the input form is blank, 
    // it will give you error message
    if (firstNameInput.value === '') {
        //show error
        setErrorFor(firstNameInput, 'First Name is required.');
    }
    if (lastNameInput.value === '') {
        //show error
        setErrorFor(lastNameInput, 'Last Name is required.');
    }
    if (contactInput.value === '') {
        //show error
        setErrorFor(contactInput, 'Contact is required.');
    }
    if (emailInput.value === '') {
        //show error
        setErrorFor(emailInput, 'Email is required.');
    }
    if (addressInput.value === '') {
        //show error
        setErrorFor(addressInput, 'Address is required.');
    }
    if (cityInput.value === '') {
        //show error
        setErrorFor(cityInput, 'City is required.');
    }

    // when all input form are validated and boolean is set to true then it will submitFormData()
    if ((firstNameValid) && (lastNameValid) && (contactValid) && (emailValid) && (addressValid) && (cityValid))
        {
            submitFormData(postRequestObj)
        } 
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
// request data from the backend for confirmation page and link on it.
async function submitFormData(postRequestObj) {
    try {
        const requestPromise = makeRequest(postRequestObj);
        const response = await requestPromise; 
        async function goToConfPage() { 
            location.href = `./order.html?conf=${response.orderId}&firstName=${response.contact.firstName}&lastName=${response.contact.lastName}&address=${response.contact.address}&city=${response.contact.city}`;
        }
        await goToConfPage();
        responseFirstName.textContent = response.contact.firstName;
        responseLastName.textContent = response.contact.lastName;
        responseContact.textContent = response.contact.contact;
        responseAddress.textContent = response.contact.address;
        responseCity.textContent = response.contact.city;
        responseId.textContent = response.orderId
    } catch(errorResponse) {
       errorResponse.error;
    }
}    

// regex for data validation
function isFirstNameValid(firstName) {
   return /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(firstName);
}
function isLastNameValid(lastName) {
    return /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(lastName);
 }
 function isContactValid(contact) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(contact);
 }
function isEmailValid(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function isAddressValid(address) {
    return /[,#-\/\s\!\@\$.....]/gi.test(address);
 }
 function isCityValid(city) {
    return /^(?:[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/.test(city);
 }
// for error validation in the input form
function setErrorFor(input, message) {
    const formGroup = input.parentElement; // parent element which is '.form-group'
    const small = formGroup.querySelector('small');
    //add error message
    small.innerText = message;
    formGroup.className = 'form-group error';
}
// for success validation in the input form
function setSuccessFor(input) {
    const formGroup = input.parentElement; // parent element which is '.form-group'
    formGroup.className = 'form-group success';
    input = true;
}


