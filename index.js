

let objects = [];

async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');
  
  getAllTeddies = response.data
  console.log(getAllTeddies)

  showItems()
}
requestItems();

function showItems() {
  const container = document.querySelector('.container');
 
  const itemsHtml = getAllTeddies.map((teddy,i) => {
    return (
        `
        <div class="teddy-item"> 
                  
                 <a href="./viewItem.html?id=${teddy._id}"> <img class="image-item" src="${teddy.imageUrl}"></img>
                  </a>
                        <span class="teddy-name">${teddy.name}</span>
                        <span class="description">${teddy.description}</span>
                        
                            <form> Color:
                                <select name="color" title="Choose a color">
                                    <option value="white">White</option>
                                    <option value="brown">Brown</option>
                                    <option value="pink">Pink</option>
                                    <option value="yellow">Yellow</option>
                                </select>
                            </form>
                            <span class="price">Price : $${teddy.price}</span>
                        <button class="addToCart" type="button">
                        Add to Cart
                        </button>
                   
                </div>
        `
    )
  })

  if(container) {
    container.innerHTML += itemsHtml.toString()
  }
}

// const clickedImage = document.getElementsByClassName('image-item');

// // iteration over arrays or array-like objects is very common
// // we do this here to add an event listener to each soda button
// for (let i=0; i<clickedImage.length; i++) {
//   // sodaBtns[i].addEventListener('click', makeRed);
//   clickedImage[i].addEventListener('click', viewItem.html);
// }

// // This code works too! Why? Because you can "bubble" the event
// // up from the child button to the parent's listener!
// // const sodaContainer = document.getElementById('soda-container');
// // sodaContainer.addEventListener('click', makeRed);

// // save elements for buttons and display in variables
// const coinSlot = document.getElementById('coin-slot');
// const cashSlot = document.getElementById('cash-slot');
// const display = document.getElementById('display');
// const dispense = document.querySelector('.dispense');
