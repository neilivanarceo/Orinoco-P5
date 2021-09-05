// TODO: get the data from the server
// which means go to an endpoint

// use fetch
// fetch is syntactic sugar
// which makes httpRequest promisified and easy to think about

const uri = 'http://localhost:3000/api/teddies/';
const singleLink = './single-product.html?='

// ./single-product.html?=_id

fetch(uri)
  .then((response) => response.json())
  .then((data) => createCards(data));


function createCards(array) {
  const container = document.getElementById('container');
  
  const length = array.length;

  for (let i=0; i<length; i++) {
    const card = createCard(array[i]);
    container.appendChild(card);
  }
}

function createCard(obj) {
  const card = document.createElement('section');

  const img = document.createElement('img');
  const name = document.createElement('h1');
  const description = document.createElement('p');
  const price = document.createElement('p');
  
  
  const link = document.createElement('a');

  let anotherLink = './single-product.html?=_id' + obj._id;
  link.setAttribute('href', `${singleLink}${obj._id}`)
  
  card.classList.add('card');
  
  name.innerText = obj.name;
  price.innerText = obj.price;
  description.innerText = obj.description;
  

  img.setAttribute('src', obj.imageUrl);
  img.setAttribute('alt', 'product image');

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(description);
  
  return card;
  
}