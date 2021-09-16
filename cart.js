let objects = [];
let cart = document.querySelectorAll('.addToCart');

async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');
  
  teddy = response.data
  console.log(teddy)

  showItems()
}
requestItems();

function showItems() {
    const container = document.querySelector('.container');
 
    const itemsHtml =
        `
        <table>
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Color</th>
            <th>Subtotal</th>
        </tr>
        

        <tr class="cart-item">
            <td> 
                <div class="cart-detail"> <img src="${teddy.imageUrl}" ></img>
                    <div>
                        <p> ${teddy.name}</p>
                        <small> Price: $${teddy.price} </small><br>
                        <a href="">Remove</a> 
                    </div>
                </div>
            </td>
            <td><input type="n" value="1" ></td>
            <td>
                <form> 
                    <select name="color" title="Choose a color">
                        <option value="white">White</option>
                        <option value="brown">Brown</option>
                        <option value="pink">Pink</option>
                        <option value="yellow">Yellow</option>
                    </select>
                </form>
            </td>
            <td> $${teddy.price}</td>
        </tr>

    </table>

    <div class="total-price">
        <table>
            <tr>
                <td>Subtotal</td>
                <td>200</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>200.00 </td>
            </tr>
        </table>
        `


  if(container) {
    container.innerHTML += itemsHtml.toString()
  }
}