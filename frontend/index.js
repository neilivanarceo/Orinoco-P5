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





  // let id = obj._id;
  // let name = obj.name;
  // let price = obj.price;
  // let img = obj.imageUrl;
  // let description = obj.description;
  // console.log (id, name, price, img, description)
  
  // return `
  //     <div class="teddy-item"> 
                      
  //     //                  <a href="./viewItem.html?id=${id}"> <img class="image-item" src="${img}"></img>
  //     //                   </a>
  //     //                         <span class="teddy-name">${name}</span>
  //     //                         <span class="description">${description}</span>
  //     //                             <span class="price">Price : ${price}</span>
                            
  //     //                 </div>

  
  // `;
  



let getAllTeddies = [];
async function requestItems() {
  const response = await axios.get('http://localhost:3000/api/teddies');
  
  getAllTeddies = response.data
  
  showProducts()
}
requestItems()

function showProducts() {
  const container = document.querySelector('.container');

    const itemsHtml = getAllTeddies.map((teddy,i) => {

      let currencyPrice = teddy.price;
    
      const actualPrice = new Intl.NumberFormat('en-US', { style: 'currency',
      currency: 'USD', useGrouping:false}).format(currencyPrice);
      
        return(
          `
            <div class="teddy-item"> 
                      
                    <a href="./viewItem.html?id=${teddy._id}"> <img class="image-item" src="${teddy.imageUrl}"></img>
                      </a>
                            <span class="teddy-name">${teddy.name}</span>
                            <span class="description">${teddy.description}</span>
                                <span class="price">Price : ${actualPrice}</span>
                          
                    </div>
                `
        )
    })
      if(container) {
        container.innerHTML += itemsHtml.toString().replaceAll(',','');
      }
}



