let objects = [];
let carts = document.querySelectorAll('.addToCart');

async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');
  teddy = response.data
  displayCart()
 
}

function displayCart() {
    let productContainer = document.querySelector('.cart-container');
    let emptyContainer = document.querySelector('.for-empty-cart');
    let cartCost = localStorage.getItem('totalCostInCart');
    let itemsInLocalStorage = localStorage.getItem('productsInCart');
    itemsInLocalStorage = JSON.parse(itemsInLocalStorage);
        if (itemsInLocalStorage == undefined){
            emptyContainer.innerHTML = 'Your Cart is empty!!!';
        } 
        else {
            Object.values(itemsInLocalStorage).map(teddy => {
                const currencyPrice = teddy.price / 100;
                const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
                currency: 'USD', useGrouping:false}).format(currencyPrice);
                productContainer.innerHTML +=
                `
                <table>
                        <td> 
                            <div class="cart-detail"><a href="./viewItem.html?id=${teddy._id}"> <img src="${teddy.imageUrl}"></a></img>
                                <div>
                                    <p> ${teddy.name}</p>
                                    <small> Price: ${actualPrice} </small><br>
                                    <a href="">Remove</a> 
                                </div>
                            </div>
                        </td>
                        <td id="quantity-input">
                        <ion-icon class="decrease" name="caret-back-outline"></ion-icon>
                                <span> 1 <span>
                            <i class="fas fa-caret-right"></i>
                        </td>
                        <td>
                            <form> 
                                <select name="color" id="item-color"  title="Choose a color">
                                    <option value="${teddy.color}">${teddy.color}</option>
                                    <option value="White">White</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Pink">Pink</option>
                                    <option value="Yellow">Yellow</option>
                                </select>
                            </form>
                        </td>
                        <td><span> $${(teddy.price * teddy.quantity) / 100}.00</span></td>
                    
                </table>
                `
            })

            productContainer.innerHTML +=
            `
                <div class="total-price">
                    <table>
                        <tr>
                            <td>Total</td>
                            <td>$${cartCost}.00</td>
                        </tr>
                    </table>
                </div>
            `   
            
            productContainer.innerHTML += `
            <a href="confirmation.html">Buy Now</a>
            `
            
        }
        manageQuantity()
}


// function quantityChanged(event){ 
//     var input = event.target 
//     if (isNaN(input.value) || input.value <= 0) {
//     input.value = 1
//     }
// }

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    // let increaseButton = document.querySelectorAll('.fas fa-caret-right');
    for (let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i] = addEventListener('click', () => {
        console.log("decrease button")
        })
    }
}

displayCart();