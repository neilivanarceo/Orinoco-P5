let objects = [];
let carts = document.querySelectorAll('.addToCart');

async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');
  teddy = response.data
  displayCart()
}

function displayCart() {
    
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.cart-container');
    let emptyContainer = document.querySelector('.for-empty-cart');
    let cartCost = localStorage.getItem('totalCost');
        if (cartItems == undefined){
            emptyContainer.innerHTML = 'Your Cart is empty!!!';
        } else
        {
            Object.values(cartItems).map(teddy => {
                const currencyPrice = teddy.price;
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
                        <td><input id="quantity" type="n" value="${teddy.inCart}" ></td>
                        <td>
                            <form> 
                                <select name="color" id="item-color" title="Choose a color">
                                    <option value="white">White</option>
                                    <option value="brown">Brown</option>
                                    <option value="pink">Pink</option>
                                    <option value="yellow">Yellow</option>
                                </select>
                            </form>
                        </td>
                        <td><span> $${teddy.price * teddy.inCart}.00</span></td>
                    
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



