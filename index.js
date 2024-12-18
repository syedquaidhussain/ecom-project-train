let counterOfCart = 0;
let counterOfWishList = localStorage.length;
let cartStatus = false;
let wishlistStatus = false;
let cartItems = []; // contains  complete product object {id,title,....}
let wishlistItems = []; // contains  complete product object{id:,title,....}
let productsByCategory = []; //stores all products when user click on specific category

let mapOfItemsInfiniteScrolling = new Map();

window.onload =async () => {
  const prev = document.getElementById("prev")
 await getProductByPagination(1,1);
//  getAllItemFromCart();
//  getAllItemFromWishList();
};

function getAllItemFromCart() {

  const element = document.getElementById("cart"); // element is 
  console.log(element);
    
  console.log(sessionStorage.length)
   element.innerHTML = sessionStorage.length?sessionStorage.length-1:0;


   //logic for showing remove from cart button when user land on websitre after adding product to cart 
   for(let i=0;i < sessionStorage.length;i++) {
    const key = sessionStorage.key(i); //key is id
    console.log(key);
    if(key) {

      const value = JSON.parse(sessionStorage.getItem(`${key}`))
      
      console.log(value);
      
      if(key!=='IsThisFirstTime_Log_From_LiveServer') { //key can be null --find how 
        //If key exist 
        toggleCart(`btn-${key}`,value) ; 
        
      }
    }
   }    



}

function getAllItemFromWishList() {

  const element = document.getElementById("wish"); // element is span
  console.log(element);
  
  console.log(localStorage.length)
   element.innerHTML = localStorage.length;


   
   //logic for showing remove from wishlist button when user land on website after adding product to wishlist
   for(let i=0;i < localStorage.length;i++) {
    const key = localStorage.key(i); //key is id
    console.log(key);
    const value = JSON.parse(localStorage.getItem(`${key}`))

    console.log(value);
    
    if(key!=='IsThisFirstTime_Log_From_LiveServer') { //key can be null --find how 
       //If key exist 
      toggleWishList(`btn-${key}`,value)
     
    }
   }    
}


// Toggle Dropdown Visibility
document.querySelector('.wishlist-icon').addEventListener('click', () => {
  wishlistItems.length=0; //empty the array
  for(let i=0;i < localStorage.length;i++) {
    const key = localStorage.key(i);
    console.log(key);
    const isPresent =  wishlistItems.find((productObj)=>productObj.id===key);
    
    
    if(key) {
      console.log("item is Present");
      
    
    

      const value = JSON.parse(localStorage.getItem(key));
      console.log(value);
      
      wishlistItems.push(value)
      
    }

  }  
  
  toggleDropdown('wishlist-dropdown', wishlistItems, 'wishlist-products');
});

document.querySelector('.cart-icon').addEventListener('click', () => {
  
  cartItems.length=0; //clear array with previous items  otherwise appending ho raha h 
  for(let i=0;i < sessionStorage.length;i++) {
    const key = sessionStorage.key(i);
    console.log(key);
    
     
    
    if(key) {
      console.log("item is Present");
      
    
    

      const value = JSON.parse(sessionStorage.getItem(key));
      console.log(value);
      
      cartItems.push(value)
      
    }
    

   }  

  toggleDropdown('cart-dropdown', cartItems, 'cart-products');
});

// Function to toggle the dropdown
function toggleDropdown(dropdownClass, items, listId) {
  console.log(items);
  
  const dropdown = document.querySelector(`.${dropdownClass}`);
  dropdown.classList.toggle('hidden'); // Show or hide the dropdown
  
  console.log(items);
  
  // Populate the dropdown with items
  const list = document.getElementById(listId);
  list.innerHTML = ''; // Clear previous items 
    
  console.log(list);
  
  if (items.length === 0) {
    list.innerHTML = '<li>No items found</li>';
  } else {
    items.forEach(item => {
      const li = document.createElement('li');
      console.log(item);
      
      li.textContent = item.title; // Adjust property based on item structure
      list.appendChild(li);
    });
  }
}


function clearUI() {

  const parentDiv= document.getElementById("second")


      while (parentDiv.firstChild) {
          parentDiv.removeChild(parentDiv.firstChild);
      
  }
    

}

function toggleCart(id,product) {
  const element = document.getElementById("cart"); // element is span
  console.log(id);
   
  const idmaker = `${id}.AddTC`;
  console.log("idmaker is ",idmaker);
  

  const oldElement = document.querySelector(`#${id}.AddTC`);

  if(oldElement) { // code is crashing when called from getItemFromcart. Thats why put
    console.log(oldElement);
    
    const newbuttonAdd = document.createElement("button");
  newbuttonAdd.classList.add("AddTC");
  
  newbuttonAdd.id=id;

// Find can be optimsed listener function alag bhi bana  sakte h
  newbuttonAdd.addEventListener("click",(event)=>{
      

    toggleCart(event.target.id,product);
    
  });


  if (oldElement.innerText === "Add To Cart") {
    console.log("inisdee");
    oldElement.replaceWith(newbuttonAdd);
    
    newbuttonAdd.textContent = "Remove From Cart"
    const stringifyProduct = JSON.stringify(product)
    sessionStorage.setItem(`${product.id}`,`${stringifyProduct}`);
  
      
    // oldElement.remove();
    element.innerHTML = sessionStorage.length?sessionStorage.length-1:0
      cartStatus = true;
      
    
  }
    else{
      newbuttonAdd.textContent = "Add To Cart"
      oldElement.replaceWith(newbuttonAdd);
      sessionStorage.removeItem(`${product.id}`)
      element.innerHTML=  sessionStorage.length?sessionStorage.length-1:0
      

      cartStatus= false;///////////////////////////////////////not use 


      
    }
  }

}


function toggleWishList(id,product) {
  
  // console.log(id);
  const element = document.getElementById("wish"); // element is span

  // same code as wishlist 

  const oldElement = document.querySelector(`#${id}.AddTW`);
  // console.log(oldElement);
if(oldElement) {

  
  const newbuttonAdd = document.createElement("button");
  newbuttonAdd.classList.add("AddTW");
  // newbuttonAdd.setAttribute("data-type","wishlist")
  newbuttonAdd.id=`${id}`; ////////////////////////////////////////////////

// Find can be optimsed listener function alag bhi bana  sakte h
  newbuttonAdd.addEventListener("click",(event)=>{
      

    
    element.innerHTML = localStorage.length ? sessionStorage.length:0;
    
    toggleWishList(event.target.id,product);
    
  });
  
 
  if (oldElement.innerText.trim() === "Add To WishList") {
    console.log("inisdee");
    
    newbuttonAdd.textContent = "Remove From WishList"
    
    
    // localStorage.setItem(`${product.id}`,`${product}`)
    
    oldElement.replaceWith(newbuttonAdd);
    console.log(product);
    
    const   stringifyProduct  = JSON.stringify(product)
    localStorage.setItem(`${product.id}`, `${stringifyProduct}`)
    element.innerHTML = localStorage.length;
    // oldElement.remove();
    
    cartStatus = true; /////////////////not in use 
    
    
  }
  else{
    // localStorage.removeItem(`${id}`)
    newbuttonAdd.textContent = "Add To WishList"
    
    oldElement.replaceWith(newbuttonAdd);
    localStorage.removeItem(`${product.id}`)
    element.innerHTML = localStorage.length;
    // e.textContent= "Add To Cart";
    cartStatus= false; //////////////////////not in use 
    
  }
  
}
}
function displayProductOnUi(product,direction=0) {
  const productContainer = document.getElementById("second");

  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.id = product.id*10; //clash was taking place with pagination button id that's why multiple of 10

  // Create HTML structure
  productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
      <div class="product-info">
          <h3>${product.title } and Id is ${product.id}</h3>
       
          <div class="button-group">
              <button id="btn-${product.id}" class="add-cart AddTC">Add To Cart</button>
              <button id="btn-${product.id}" class="add-wishlist AddTW">Add To WishList</button>
          </div>
      </div>
  `;

  // Get the buttons by class name
  const addCartButton = productCard.querySelector(".add-cart");
  const addWishlistButton = productCard.querySelector(".add-wishlist");

  // Add event listeners dynamically
  addCartButton.addEventListener("click", (event) =>{
    toggleCart(event.target.id,product);
  });

  addWishlistButton.addEventListener("click", (event) =>{
    toggleWishList(event.target.id,product);

  });

  // Append the product card to the container
  productContainer.appendChild(productCard);

          


      // Add event listeners for buttons
      // const addCartButton = productCard.querySelector(".add-cart");
      // const addWishlistButton = productCard.querySelector(".add-wishlist");

      // addCartButton.addEventListener("click", () => {
      //     cart++;
      //     cartCount.textContent = cart;
      // });

      // addWishlistButton.addEventListener("click", () => {
      //     wishlist++;
      //     wishlistCount.textContent = wishlist;
      // });

      // productContainer.appendChild(productCard);
  
    const e =  document.getElementById("second");

    if(direction===-1) {
      // console.log("scrollHe",e.scrollHeight);
      
      const previousScrollHeight = productContainer.scrollTop; // Store current scroll height
      //  console.log("prevScrollH",previousScrollHeight);
      
    productContainer.insertAdjacentElement("afterbegin",productCard)
      //  console.log("AfterScrollH",e.scrollHeight);
       
      productContainer.scrollTop =  productContainer.scrollHeight -previousScrollHeight +1000;

    console.log(productContainer.scrollTop);
    
    }

    else{

      const previousScrollHeight = e.scrollTop; // Store current scroll height

     
      productContainer.append(productCard);
      console.log(previousScrollHeight);
      
      // productContainer.scrollTop =  productContainer.scrollHeight - 3500 /////////
// 
      // console.log("scrollTop is ", e.scrollTop);
      

    }


  // });
}

// Find Can be optimsed 
// function displayProductOnUi(product,direction=0)   {

//     const newDiv = document.createElement("div");
//     const titleDiv = document.createElement('div');

// // Add the p element using innerHTML
//   titleDiv.innerHTML = `<p>${product.title} and id is ${product.id}</p>`;


//     // newDiv.id = `${product.id}`;  -----------------------div and button inside div has same id 

//     newDiv.className = "image-class";
    
//     const img = document.createElement("img");
    
//     img.src= product.thumbnail
//     img.width = 150; // Set width (optional)
//     img.height = 150;
//     img.classList.add("product-images")

    
//     const iconsDiv = document.createElement("div");
//     iconsDiv.id = "nav-icons-container"

//     const buttonAdd = document.createElement("button");

//     const buttonAddToWish = document.createElement("button");

//     buttonAdd.textContent="Add To Cart";
//     buttonAdd.classList.add("AddTC");
//     buttonAdd.id = `btn-${product.id}` ////////////////////////////////////
      
  

//     // Add To Cart Functionality
//     buttonAdd.addEventListener("click",(event)=>{
      
    

//       toggleCart(event.target.id,product);
      
//     });


//     // Add To WishList
//     buttonAddToWish.textContent="Add To WishList";
//     buttonAddToWish.classList.add("AddTW");
//     // buttonAddToWish.setAttribute("data-type","wishlist")


//         buttonAddToWish.id=`btn-${product.id}`;  //card button and wish list button has same id 

//       // console.log(buttonAddToWish);
    
    
//     // Add To wishlist Functionality
//     buttonAddToWish.addEventListener("click",(event)=>{
      
    
//       toggleWishList(event.target.id,product)
      
 
//     })



    
//       iconsDiv.append(buttonAdd)

//       iconsDiv.append(buttonAddToWish)

//     newDiv.appendChild(img);
//     newDiv.appendChild(titleDiv);


    
//     newDiv.appendChild(iconsDiv);

//     const e =  document.getElementById("second");

//     if(direction===-1) {
//       // console.log("scrollHe",e.scrollHeight);
      
//       const previousScrollHeight = e.scrollTop; // Store current scroll height
//       //  console.log("prevScrollH",previousScrollHeight);
      
//     e.insertAdjacentElement("afterbegin",newDiv)
//       //  console.log("AfterScrollH",e.scrollHeight);
       
//     e.scrollTop =  e.scrollHeight -previousScrollHeight +300;

//     console.log(e.scrollTop);
    
//     }

//     else{
      

//       e.append(newDiv);

//       console.log("scrollTop is ", e.scrollTop);
      

//     }

// }

function tgCart(event){
  toggleCart(event.target.id,product);
}

function tgWishlist(event) {
  toggleWishList(event.target.id,product)
}

// limit lagai h is function m 
async function getProducts(limit,skip) {

    
    const res = await fetch(`https://dummyjson.com/products?limit=${limit*10}&`);
    const  data =  await res.json()
     const products =  await data.products;
    //  console.log(products);

    //  products.map((product)=>{
        
    //  })
    products.map(displayProductOnUi)
     
     
}

// getProducts();
    



// Making category list
async function categoryList(){

   const res =  await fetch('https://dummyjson.com/products/category-list')

   const data = await res.json();
  //  console.log(data);
   
  const element =  document.getElementById("categories");
  const options = document.createElement("option");
  options.value= "Choose Category";
  options.textContent = "Choose Category";
  options.disabled=true;
  options.selected=true;
  element.append(options);


 element.append()
     
   data.map((item)=>{

       const options = document.createElement("option");
       
       options.value= item;
       options.textContent = `${item}`;

       const element =  document.getElementById("categories")
      element.append(options)

       
    })


}
  
categoryList();



   


async function getSelectedValue() {

    const element =  document.getElementById("categories")

    // console.log(element.value);

    const res = await fetch(`https://dummyjson.com/products/category/${element.value}`)
  const data = await res.json();
  const product = data.products
   
   productsByCategory = product; ////////////
    // console.log(data.total);
   

    getAllItemFromCart();
    getAllItemFromWishList();
    // offset(0,1,data.total)
      
    // newPaginationMaker(productsByCategory.length)
  getProductByCategoryPagination(1);

}


function dotMakerPagination() {
  const dots = document.createElement("span");
  dots.id = "dots";
  dots.textContent = "....";
  return dots;
}

function oneMakerPagination() {

  const button = document.createElement("button");
  button.classList.add("page-btn");
  
  button.classList.add("page-rep");
  
   
  button.textContent = 1;
  button.id =  1 // `${pageNumber}`; // Assign ID to the button

  button.setAttribute("onclick", `getProductByPagination(${1})`) ;

  return button;
}

function lastButtonMakerPagination() {
  const lastPageButton = document.createElement("button");
   lastPageButton.classList.add("page-btn");
  lastPageButton.textContent = 10;
  lastPageButton.id = 10;
  lastPageButton.setAttribute("onclick", `getProductByPagination(${10})`);
   return lastPageButton;
  // pageNumbersDiv.appendChild(lastPageButton); 

}


let currentStart = 1; // The first visible page number
const maxPages = 10; // Total number of pages
const visibleButtons = 2; // Number of buttons visible at a time


// Function to update pagination.
async function updatePagination(direction,flag) {


  // Showing the offset that will get disappeared when infinite scrolling takes place 
    const offsetDiv = document.querySelector(".offset");

     
    const activeButton = document.querySelector("button.active");
    //  console.log(activeButton);
     
   console.log("Active button is ", activeButton);

  // Update the current start page based on direction

  
  
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");

  // Trigger API call for the current page
  if(flag===1 && direction===1){ 
  
  //  console.log(activeButton.id); 
   if(Number(activeButton.id)===9)  {
    // console.log("dekhte h ");
    
    nextButton.disabled = true;
    // await getProductByPagination(activeButton.id+1);
    
  }
  
  else{
    nextButton.disabled=false;
    // await getProductByPagination(activeButton.id+1);
  }

  await getProductByPagination(Number(activeButton.id)+1);

}

  else if(flag===1 && direction===-1) {

    if(Number(activeButton.id)===2 )  {
        // console.log("dekhte h ");
        
      prevButton.disabled= true;
      // await getProductByPagination(activeButton.id-1);
      
    }
    
    else{
      prevButton.disabled=false;
    }
    await getProductByPagination(Number(activeButton.id)-1);
  }

 

}

// Function to highlight the active button
function highlightActive(pageNumber) {
  // Remove 'active' class from all buttons
  const buttons = document.querySelectorAll('.page-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Add 'active' class to the clicked button
  const activeButton = document.getElementById(pageNumber);
  // console.log("In active",activeButton);
  
  if (activeButton) {
    activeButton.classList.add('active');
  }
}


function clearPrevPagination() {
  const pageNumbersDiv = document.getElementById("pageNumbers");
  // console.log(pageNumbersDiv);
  
  while (pageNumbersDiv.firstChild) {
    pageNumbersDiv.removeChild(pageNumbersDiv.firstChild);

  }
}

const observer = new IntersectionObserver((entries)=>{

console.log("Enteries are ", entries);
const cat = document.getElementById("categories");

// if(cat.value!=="Choose Category") {
// return;
// }



entries.forEach((entry)=>{
  if(entry.isIntersecting){

    console.log(entry.target.id/10);
  const   pageToBeHighlighted  = Math.ceil((entry.target.id/10)/10);
  highlightActive(pageToBeHighlighted);
  // getProductByPagination(pageToBeHighlighted,0,0,1,0)
  offset((pageToBeHighlighted-1)*10)
  // if(pageToBeHighlighted===1) {
    // }
    const active = document.querySelector("button.active")
    console.log(active);
    if(active.id==1){
    document.getElementById("prev").disabled = true;
   
  }
  

  }else{
    // highlightActive()
    
  }

})

// console.log(entries[1])

// if(entries[1].isIntersecting){
//   console.log(entry.target.id/10);
//     const   pageToBeHighlighted  = Math.ceil((entries[1].target.id/10)/10);
//     highlightActive(pageToBeHighlighted)
// }

// if()

},{
  root:document.getElementById("second"),
  threshold:0.5
});



// Function to fetch products based on the page number
async function getProductByPagination(pageNumber , fromOnLoadEvent = 0, fromInfiniteScrolling=0, scrollingDirection=0,fromObserver=0) {
   
    highlightActive(pageNumber); 
  const prevButton= document.getElementById("prev")

  const skipValue = (pageNumber - 1) * 10; // Assuming 10 products per page
  let products
  if(fromObserver === 0) {
    
    console.log("Inside Observer");
    
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skipValue}`);
    
    const data = await res.json();
    
    products = data.products;
    
    console.log(products);
    mapOfItemsInfiniteScrolling.set(pageNumber,JSON.stringify(products))
    
    console.log(`Key is ${pageNumber}`,JSON.parse(mapOfItemsInfiniteScrolling.get(pageNumber)));
  }
   
   
if(fromInfiniteScrolling===1 && scrollingDirection ===1) {
  products.map((product)=>displayProductOnUi(product,1))
}
else if(fromInfiniteScrolling===1 && scrollingDirection ===-1) {
  const reverseProductArray = products.reverse();
  reverseProductArray.map((product)=>displayProductOnUi(product,-1))

}

else{

  const parentDiv = document.getElementById("second");
  
  if (products) {
    
    // Clear previous products
    while (parentDiv.firstChild) {
      parentDiv.removeChild(parentDiv.firstChild);
    }
    
    // Display new products
    await products.map(displayProductOnUi);
  }
  }
  
// }
 
    //pagination changing logic
  // Here fromOnLoadEvent because when window is loading then page =1 so that below code dont run for first time.
  //  when user click 
  // on 2 or 3 then click on 1 then it should run.
    if(pageNumber===1  && fromOnLoadEvent===1) {
      prevButton.disabled = true;
      const e = document.getElementById('second');
      e.scrollTop=0

    }
    else if(pageNumber===1){
      const nextButton = document.getElementById("next");
      nextButton.disabled= false;
      prevButton.disabled = true;
      
    }
    else {
      prevButton.disabled = false;

    }


    if(pageNumber === 1 && fromOnLoadEvent===0) {
      const nextButton = document.getElementById("next");
      nextButton.disabled= false;
      const pageNumbersDiv = document.getElementById("pageNumbers");

        console.log("Onload");
      
        clearPrevPagination()

     for(let i =1; i<6;i++) {  // i is being used for position and for putting buttons

      if(i===3 || i===5) {
     
        pageNumbersDiv.appendChild(dotMakerPagination());
        continue;

      }
     
  
      const button = document.createElement("button");
     button.classList.add("page-btn");
    
      button.classList.add("page-rep");

      if(i===4) { //so that 5 gets printed 

        button.textContent = i+1;
        button.id =  i+1 // `${pageNumber}`; // Assign ID to the button
        button.setAttribute("onclick", `getProductByPagination(${i+1})`) ;
      } else{

        button.textContent = i;
        button.id =  i // `${pageNumber}`; // Assign ID to the button
        button.setAttribute("onclick", `getProductByPagination(${i})`) ;
      }
  
    pageNumbersDiv.appendChild(button);


   }
  //adding last element 
   
  pageNumbersDiv.appendChild(lastButtonMakerPagination()); 
   highlightActive(pageNumber)

  }

 else if (pageNumber>=5) {
 
   const nextButton =  document.getElementById("next");
  if(pageNumber ===10) {
   nextButton.disabled = true;
}
else{
  nextButton.disabled = false;
}

  const pageNumbersDiv = document.getElementById("pageNumbers");

    clearPrevPagination();
  
 

  // Adding 1 
  pageNumbersDiv.appendChild(oneMakerPagination());
  
  // Adding dot 

  pageNumbersDiv.appendChild(dotMakerPagination());

 
  for(let i = pageNumber-1; i<=9; i++) { // loop is  upto 9 because we have to print number from 4 to 9  


    if(i===pageNumber+2) {

      pageNumbersDiv.appendChild(dotMakerPagination());
      // continue;
      break;
    
    }
      const button = document.createElement("button");
      button.classList.add("page-btn");
      
      button.classList.add("page-rep");
      
      
      button.textContent = i;
      button.id =  i // `${pageNumber}`; // Assign ID to the button
      button.setAttribute("onclick", `getProductByPagination(${i})`) ;
       
    pageNumbersDiv.appendChild(button);

  }

    // adding last button
       const lastPageButton = document.createElement("button");
   
      pageNumbersDiv.appendChild(lastButtonMakerPagination()); 

      // console.log("Last Button");
      console.log(pageNumber);
      highlightActive(pageNumber); 

      
}

   // Rendering Updated Pagination. 
else if(pageNumber!==1 && pageNumber<5) {
    // highlightActive(pageNumber)

    const nextButton = document.getElementById("next");
    nextButton.disabled= false;
    
  const pageNumbersDiv = document.getElementById("pageNumbers");
 
  clearPrevPagination()
  
   // Adding 1 harded coded. 

  pageNumbersDiv.appendChild(oneMakerPagination());
 
  for(let i = pageNumber-1; i<=7; i++) {

    
    //user clicked on 5 and above 
    
    if(i===1) {
      continue;
    }

    if(i===7) {
      
      pageNumbersDiv.appendChild(lastButtonMakerPagination()); 
      continue;
      
    }
    
      const button = document.createElement("button");
      button.classList.add("page-btn");
      
      button.classList.add("page-rep");
      
      
      button.textContent = i;
      button.id =  i // `${pageNumber}`; // Assign ID to the button
      button.setAttribute("onclick", `getProductByPagination(${i})`) ;
    
    if(i===pageNumber+2) {
  
      pageNumbersDiv.appendChild(dotMakerPagination());
      continue;
   
      
    }

    if(i===6) {
  
      pageNumbersDiv.appendChild(dotMakerPagination());
      continue;

    } 

    pageNumbersDiv.appendChild(button);
    
    
  }

  highlightActive(pageNumber)




//   const allProductCard = document.querySelectorAll(".product-card")
//   console.log(allProductCard);
  
//   const arrayOfAllProductCard = Array.from(allProductCard)
//   // mapOfItemsInfiniteScrolling.forEach((value,key)=>{
//   //   // observer.observe(val)
//   //   console.log(`key is ${key} and value is ${value}`);
    
//   // });
//  arrayOfAllProductCard.forEach((productDiv)=>{
//   console.log(productDiv);
  
//   observer.observe(productDiv);
  

//  })


}

offset(skipValue);

// if(pageNumber===1  && fromOnLoadEvent===1) {
  // console.log("hello duniya");
  
  getAllItemFromCart();
  getAllItemFromWishList()



  
  const allProductCard = document.querySelectorAll(".product-card")
  console.log(allProductCard);
  
  const arrayOfAllProductCard = Array.from(allProductCard)
  // mapOfItemsInfiniteScrolling.forEach((value,key)=>{
  //   // observer.observe(val)
  //   console.log(`key is ${key} and value is ${value}`);
    
  // });

  mapOfItemsInfiniteScrolling.forEach((value,key)=>{
    const ninenthELement= JSON.parse(value)[9];
    const firstElement = JSON.parse(value)[0]
    console.log(firstElement);
    const idOfLastElement = Number(ninenthELement.id)*10;
    const idOfFirstElement = Number(firstElement.id)*10;


     const lastProductDiv = document.getElementById(`${idOfLastElement}`);

     const firstProductDiv = document.getElementById(`${idOfFirstElement}`);

     console.log(firstProductDiv);
     
    const categories = document.getElementById("categories");
    if(categories.value!=="Choose Category") {
     observer.disconnect()
    }

      observer.observe(firstProductDiv);
      observer.observe(lastProductDiv);


  })

//  arrayOfAllProductCard.forEach((productDiv)=>{
//   console.log(productDiv);
  
//   observer.observe(productDiv);
  

//  })

}

let count=0;

 async function getProductByCategoryPagination(pageNumber) {

  offset( (pageNumber-1)*10,1,productsByCategory.length,pageNumber);

  // In this there is not any api call
  // let productsByCategory = []; //stores all products when user click on specific category
  highlightActive(pageNumber);
  // const ac
  // const activeButton = document.querySelector("button.active");

  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");
  if(pageNumber=== Math.ceil(((productsByCategory.length))/10) )
    {
     nextButton.disabled=true;
    }
    else{
      nextButton.disabled=false;
    }
    if(pageNumber===1)
    {
      prevButton.disabled= true
    }
    else{
      prevButton.disabled=false;
    }



  clearUI()

  //optimisible
if( productsByCategory.length>10 && (productsByCategory.length)%10 === 0 ) {
  // console.log("true");
   
  clearUI();
 
  for(let i = (pageNumber-1)*10;i<= (pageNumber*10)-1;i++) {

    // console.log("Indide loop")
    // console.log(productsByCategory[i])
     
     

      displayProductOnUi(productsByCategory[i]);
      // offset()
  }
}


//for 24 ,25  products etc cases
else if(productsByCategory.length>10 && (productsByCategory.length)%10 !== 0 ){
    //  clearUI();
   

     if(productsByCategory.length-count<10) {

      for(let i=count; i<= productsByCategory.length-1;i++) {
      displayProductOnUi(productsByCategory[i])
      }

      count=0;

     }

     else{
      for(let i = (pageNumber-1)*10;i<= (pageNumber*10)-1;i++) {
         
         if(count>=productsByCategory.length){
           break;
          }
    // console.log("Indide loop")
    // console.log(productsByCategory[i])
    
    
    count++;
    displayProductOnUi(productsByCategory[i]);
    // offset()
  }
}
}
else{
  for(let i=count; i<= productsByCategory.length-1;i++) {
    displayProductOnUi(productsByCategory[i])
    }

}

highlightActive(pageNumber);


// offset( (pageNumber-1)*10,1,productsByCategory.length,pageNumber);

}


function updatePaginationInCategory(direction) {
  const activeButton = document.querySelector("button.active");
  
  if(direction===1) { //next is clicked
 
 getProductByCategoryPagination(Number(activeButton.id)+1);

//  console.log(Math.ceil(((productsByCategory.length))/10));
//  console.log()
  if(Number(activeButton.id)+1 === Math.ceil(((productsByCategory.length))/10) )
  {
   const nextButton = document.getElementById("next");
   nextButton.disabled=true;
  }


}
else{

  getProductByCategoryPagination(Number(activeButton.id)-1);

  // console.log(Math.ceil((productsByCategory.length))/10);
  // console.log()
   if(Number(activeButton.id)-1 === 1 )
   {
    const prevButton = document.getElementById("prev");
    prevButton.disabled=true;
   }
}


}

function newPaginationMaker(totalPages,pageNumber) {
 
  const pageNumbersDiv = document.getElementById("pageNumbers");
  
   const pagination = document.querySelector(".pagination");
   const prev = document.createElement('button');
   prev.classList.add("page-btn");

  prev.id="prev";
  prev.textContent="Prev"

  prev.setAttribute("onclick", "updatePaginationInCategory(-1)");

  pagination.replaceChild(prev,pagination.firstElementChild);

   const next = document.createElement('button');
   next.classList.add("page-btn");

  next.id="next";
  next.textContent="Next";

  next.setAttribute("onclick", "updatePaginationInCategory(1)");

  pagination.replaceChild(next,pagination.lastElementChild)

  //  clear Previous pagination
  pageNumbersDiv.innerHTML='';
   for(let i=1;i<=Math.ceil(totalPages/10);i++) {
    const button = document.createElement("button");
    button.classList.add("page-btn");
    button.classList.add("page-rep");
    button.textContent = i;
    button.id = i;
    button.setAttribute("onclick", `getProductByCategoryPagination(${i})`);
    pageNumbersDiv.append(button)

  }
  highlightActive(pageNumber)


}

// Function to update the offset display //totalProduct is needed onky when getSelectedValue is called
function offset(skipValue, fromgetSelectedValue=0,totalProduct=0,pageNumber) {
  // console.log("skip Value is ",skipValue)
  const newPara = document.createElement("p");
  if(fromgetSelectedValue===1) {
    let productOnOnePage;
    if((totalProduct-skipValue)%10!==0 && pageNumber===Math.ceil(totalProduct/10)) {
       productOnOnePage = totalProduct;
    }
    else{

      productOnOnePage = totalProduct<10  ? totalProduct:(skipValue+10);
    }

    newPara.textContent = `Showing ${skipValue + 1} to ${productOnOnePage} out of ${totalProduct} results`;
       newPaginationMaker(totalProduct,pageNumber);
  }
  else{

    newPara.textContent = `Showing ${skipValue + 1} to ${skipValue + 10} out of 100 results`;
  }

  const offsetElement = document.querySelector(".offset");

  if (offsetElement.firstChild) {
    offsetElement.firstChild.remove();
  }
  offsetElement.insertAdjacentElement("afterbegin", newPara);
}

// Load the first page on window load

let debounceTimer;

function searchProduct(event) {
  const inputValue = event.target.value.trim(); ///trim is not necessary check 
// console.log(inputValue);

  // Clear the previous timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Set a new timer
  debounceTimer = setTimeout(async () => {
    console.log("Searching for:", inputValue);

    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${inputValue}`);
      const data = await res.json();
      const products = data.products;
      console.log("Fetched data:", data);

 
       if(products) {
        clearUI();
       products.map(displayProductOnUi);
       getAllItemFromCart();
       getAllItemFromWishList();


       }
    } 
    catch (error) {
      console.error("Error fetching search results:", error);
    }
  },400); 
}

let pageCount=0;
let limit=0;


// Infinite scrolling
 function infiniteScrolling() {

  const element = document.getElementById("second");
 const e =  document.getElementById(pageCount) ;
 const categories =  document.getElementById("categories")

 let flag =0;
//  console.log("inside infinite",e);
 
 
 // Make sure the scroll event listener is inside the function and is properly added
 element.addEventListener("scroll", async() => {
   
  const activeButton = document.querySelector("button.active");

  // to toggle the visibilty of offset
   const offsetDiv = document.querySelector('.offset');

   const { scrollTop, clientHeight, scrollHeight } = element;

   // Check if the scroll position is near the bottom to trigger loading new content
   if (scrollTop + clientHeight >= scrollHeight ) {
     console.log("Scrolled to bottom, loading more products...");

      
    //  console.log(activeButton);
    //  console.log(activeButton.id);

     console.log(categories.value);
     if(categories.value!=="Choose Category") {
    //  updatePaginationInCategory(1)
     return
     }
     
     
     if(Number(activeButton.id)<10)
      { 
           pageCount++;
           limit++;
        //  getProducts(limit,pageCount);

          // updatePagination(1,flag);
   

          getProductByPagination(Number(activeButton.id)+1, 0, 1,1);
         
        }
        
      }
      
      if(scrollTop===0 && Number(activeButton.id)!==1){
        
         getProductByPagination(Number(activeButton.id)-1,0,1,-1) ;
       
    }
  });
}

infiniteScrolling();









