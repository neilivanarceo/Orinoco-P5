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
    let productContainer = document.querySelector('.confirmation-container');
    let cartCost = localStorage.getItem('totalCost');
    
        productContainer.innerHTML = '';
        Object.values(cartItems).map(teddy => {
            const currencyPrice = teddy.price;
            const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
            currency: 'USD', useGrouping:false}).format(currencyPrice);

            productContainer.innerHTML =
            `
            <h3> Order Confirmation number : 324234242 </h3
            <h4> Date : 09/28/2021 </h4>
            `
        })
            productContainer.innerHTML +=
            `
            <table>
                    <td> 
                        <div class="cart-detail"> <img src="${teddy.imageUrl}" ></img>
                            <div>
                                <p> ${teddy.name}</p>
                            
                                 
                            </div>
                        </div>
                    </td>
                    <td>Quantity :  ${teddy.inCart}</td>
                    <td>
                        Color : ${teddy.color}
                    </td>
                    <td><span> $${teddy.price * teddy.inCart}.00</span></td>
                
            </table>
            `
        }

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
    }       
}
displayCart();



