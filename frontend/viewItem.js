let objects = [];
const params = new URLSearchParams(window.location.search);
const id = params.get('id')
console.log(id)
async function requestItems() {
  const response = await axios.get(`http://localhost:3000/api/teddies/${id}`);
  
  teddy = response.data;
  console.log(teddy)
  showItems()
}
requestItems();

function showItems() {
  const container = document.querySelector('.container');
  
  const itemsHtml = 
        `
        
        <div class="teddy-item"> 
                  
        <img class="image-item" src="${teddy.imageUrl}"></img>
         
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
             <button class="addToCart"  type="button">
               Add to Cart
               </button>
          
       </div>
        `
    

  if(container) {
    container.innerHTML += itemsHtml.toString()
  }
}
