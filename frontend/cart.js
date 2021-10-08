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
               
                // var quantityInputs = document.getElementById('quantity-input').value;  
                // console.log(quantityInputs)
                //     for (var i=0; i < quantityInputs.length; i++){
                //         var input = quantityInputs[i]
                //         input.addEventListener('change', quantityChanged);
                //         }
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
                        <td><input id="quantity-input" type="number" value="${teddy.quantity}"></td>
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
}
displayCart();

// function quantityChanged(event){ 
//     var input = event.target 
//     if (isNaN(input.value) || input.value <= 0) {
//     input.value = 1
//     }
// }
