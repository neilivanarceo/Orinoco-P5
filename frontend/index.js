// // TODO: get the data from the server
// // which means go to an endpoint

// // use fetch
// // fetch is syntactic sugar
// // which makes httpRequest promisified and easy to think about

// const uri = 'http://localhost:3000/api/teddies/';
// const singleLink = './viewItem.html?id='

// // ./single-product.html?=_id

// fetch(uri)
//   .then((response) => response.json())
//   .then((data) => createCards(data));


// function createCards(array) {
//   const container = document.getElementById('container');
//   console.log(container);
//   const length = array.length;

//   for (let i=0; i<length; i++) {
//     const teddyItem = createCard(array[i]);
//     container.appendChild(teddyItem);
//   }
// }


  // function createCard(obj) {
  //   let id = obj._id;
  
//   const teddyItem = document.createElement('div');
//   teddyItem.classList.add('teddyItem');
//   const imageItem = document.createElement('img');
//   imageItem.classList.add('image-item')
//   const name = document.createElement('h2');
//   name.classList.add('name')
//   const description = document.createElement('p');
//   description.classList.add('description')
//   const price = document.createElement('p');
//   price.classList.add('price')

//   const link = document.createElement('a');
//   link.classList.add('link')

//   // const myUrl = new URL(window.location.href);
//   // itemUrl = myUrl.searchParams.get(id);
//   // console.log(itemUrl);

//   let anotherLink = './viewItem.html?id=' + id;
//   // link.setAttribute('href', `${singleLink}${obj._id}`)
  
//   name.innerText = obj.name;
//   description.innerText = obj.description;
//   price.innerText = '$' + obj.price + '.00';

//   imageItem.setAttribute('src', obj.imageUrl);
//   imageItem.setAttribute('alt', 'product image');
//   link.setAttribute('href', anotherLink); 
  
  
//   teddyItem.appendChild(link)
//   teddyItem.appendChild(imageItem);
//   teddyItem.appendChild(name);
//   teddyItem.appendChild(description);
//   teddyItem.appendChild(price);


//   return(teddyItem)
// }


// function makeRequest() {
//   return new Promise((resolve, reject) => {
//       let request = new XMLHttpRequest();
//       request.open('GET', 'http://localhost:3000/api/teddies');
//       request.send();
//       request.onreadystatechange = () => {
//           if (request.readyState === 4) {
//               if (request.status === 200) {
//                   resolve(JSON.parse(request.response));
//               } else {
//                   reject('SERVER IS DOWN!!!');
//               }
//           }
//       }
    
//   });
// }

  

let getAllTeddies = [];
async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');
  
  getAllTeddies = response.data
  
  showProducts()
}
requestItems()

// const requestPromise = makeRequest(showProducts);
// const response = await requestPromise; 

function showProducts() { 
 
  const container = document.querySelector('.container');

    const itemsContainer = getAllTeddies.map((teddy,i) => {

    let currencyPrice = teddy.price / 100;
    
      const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
      currency: 'USD', useGrouping:false}).format(currencyPrice);
      
        return(
          `
            <div class="teddy-item"> 
              <a href="./viewItem.html?id=${teddy._id}"> <img class="image-item" src="${teddy.imageUrl}"></img></a>             
              <a href="./viewItem.html?id=${teddy._id}">  <span class="teddy-name">${teddy.name}</span></a>
              <span class="description">${teddy.description}</span>
              <span class="price">Price : ${actualPrice}</span> 
            </div>
          `
        )
    })
      if(container) {
        container.innerHTML += itemsContainer.toString().replaceAll(',','');
      }
}

function AddedToCart(){                                 
  let itemCount = localStorage.getItem('totalQuantityInCart');

  if(itemCount){
      document.querySelector('.myCart span').textContent = itemCount;
  }
}
AddedToCart()
// function totalQuantityInCart (teddy) {
//   let itemCount = localStorage.getItem('totalQuantityInCart');

//   itemCount = parseInt(itemCount);

//   if (itemCount){
//           localStorage.setItem('totalQuantityInCart', itemCount + 1);
//           document.querySelector('.myCart span').textContent = itemCount + 1;
//   }
//   else {
//           localStorage.setItem('totalQuantityInCart', 1);
//           document.querySelector('.myCart span').textContent = 1;
//   }
// } 
 


// function manageQuantity() {
//   let decreaseButtons = document.querySelectorAll('.decrease');
//   let increaseButtons = document.querySelectorAll('.increase');
//   // let itemsInCart = localStorage.getItem('productsInCart');
//   // itemsInCart = JSON.parse(itemsInCart)
  

//   for (let i=0; i < decreaseButtons.length; i++) {
//       decreaseButtons[i].addEventListener('click', () => {
//       // currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
//       })
//   }

//   for (let i=0; i < increaseButtons.length; i++) {
//       increaseButtons[i].addEventListener('click', () => {
//       // currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
//       console.log(increaseButtons)
//       })
//   }   
// }


// <td id="quantity-input">
// <ion-icon class="decrease" name="caret-back-outline"></ion-icon>

//     <span> ${teddy.quantity} <span>

// <ion-icon class="increase" name="caret-forward-outline"></ion-icon>
// </td>