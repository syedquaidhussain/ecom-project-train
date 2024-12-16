let counterOfCart = 0;
let counterOfWishList = localStorage.length;
let cartStatus = false;
let wishlistStatus = false;
let cartItems = []; // contains  complete product object {id,title,....}
let wishlistItems = []; // contains  complete product object{id:,title,....}


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

// Find Can be optimsed 
function displayProductOnUi(product)   {

    const newDiv = document.createElement("div");
    const titleDiv = document.createElement('div');

// Add the p element using innerHTML
  titleDiv.innerHTML = `<p>${product.title}</p>`;


    // newDiv.id = `${product.id}`;  -----------------------div and button inside div has same id 

    newDiv.className = "image-class";
    
    const img = document.createElement("img");
    
    img.src= product.thumbnail
    img.width = 150; // Set width (optional)
    img.height = 150;
    img.classList.add("product-images")

    
    const iconsDiv = document.createElement("div");
    iconsDiv.id = "nav-icons-container"

    const buttonAdd = document.createElement("button");

    const buttonAddToWish = document.createElement("button");

    buttonAdd.textContent="Add To Cart";
    buttonAdd.classList.add("AddTC");
    buttonAdd.id = `btn-${product.id}` ////////////////////////////////////
      
  

    // Add To Cart Functionality
    buttonAdd.addEventListener("click",(event)=>{
      
    

      toggleCart(event.target.id,product);
      
    });


    // Add To WishList
    buttonAddToWish.textContent="Add To WishList";
    buttonAddToWish.classList.add("AddTW");
    // buttonAddToWish.setAttribute("data-type","wishlist")


        buttonAddToWish.id=`btn-${product.id}`;  //card button and wish list button has same id 

      // console.log(buttonAddToWish);
    
    
    // Add To wishlist Functionality
    buttonAddToWish.addEventListener("click",(event)=>{
      
    
      toggleWishList(event.target.id,product)
      
 
    })



    
      iconsDiv.append(buttonAdd)

      iconsDiv.append(buttonAddToWish)

    newDiv.appendChild(img);
    newDiv.appendChild(titleDiv);


    
    newDiv.appendChild(iconsDiv);

    const e =  document.getElementById("second")
    e.append(newDiv)

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
    // console.log(product);
  
    // clearing the previous products in ui 
    const parentDiv= document.getElementById("second")

     if(product){

         // Find Alternative 
         while (parentDiv.firstChild) {
            parentDiv.removeChild(parentDiv.firstChild);
        }
     }

    product.map(displayProductOnUi)
    getAllItemFromCart();
    getAllItemFromWishList();
      


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
     console.log(activeButton);
     
   console.log("Active button is ", activeButton);

  // Update the current start page based on direction

  
  
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");

  // Trigger API call for the current page
  if(flag===1 && direction===1){ 
  
   console.log(activeButton.id); 
   if(Number(activeButton.id)===9)  {
    console.log("dekhte h ");
    
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
        console.log("dekhte h ");
        
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
  console.log("In active",activeButton);
  
  if (activeButton) {
    activeButton.classList.add('active');
  }
}


function clearPrevPagination() {
  const pageNumbersDiv = document.getElementById("pageNumbers");
  console.log(pageNumbersDiv);
  
  while (pageNumbersDiv.firstChild) {
    pageNumbersDiv.removeChild(pageNumbersDiv.firstChild);

  }
}

// Function to fetch products based on the page number
async function getProductByPagination(pageNumber , fromOnLoadEvent = 0) {
   
    highlightActive(pageNumber); 
    const prevButton= document.getElementById("prev")

  const skipValue = (pageNumber - 1) * 10; // Assuming 10 products per page

  const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skipValue}`);

  const data = await res.json();

  const products = data.products;




// logic for displaying the products on UI
  const parentDiv = document.getElementById("second");

  if (products) {

    // Clear previous products
    while (parentDiv.firstChild) {
      parentDiv.removeChild(parentDiv.firstChild);
    }

    // Display new products
   await products.map(displayProductOnUi);
  }
  

  // Here fromOnLoadEvent because when window is loading then page =1 so that below code dont run for first time.
  //  when user click 
  // on 2 or 3 then click on 1 then it should run.
    if(pageNumber===1  && fromOnLoadEvent===1) {
      prevButton.disabled = true;
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

      console.log("Last Button");
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


}

offset(skipValue);

// if(pageNumber===1  && fromOnLoadEvent===1) {
  console.log("hello duniya");
  
  getAllItemFromCart();
  getAllItemFromWishList()


// toggleCart()
// getAllItemFromCart()
// getAllItemFromWishList()

 

}

// Function to update the offset display
function offset(skipValue) {
  const newPara = document.createElement("p");
  newPara.textContent = `Showing ${skipValue + 1} to ${skipValue + 10} out of 100 results`;

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

 let flag =0;
 console.log("inside infinite",e);
 
 
 // Make sure the scroll event listener is inside the function and is properly added
 element.addEventListener("scroll", async() => {
   
  const activeButton = document.querySelector("button.active");

  // to toggle the visibilty of offset
   const offsetDiv = document.querySelector('.offset')
   const { scrollTop, clientHeight, scrollHeight } = element;
    
  //     console.log("scrollTop", scrollTop);
  //  console.log("clientHeight", clientHeight);
  //  console.log("scrollHeight", scrollHeight);

   // Check if the scroll position is near the bottom to trigger loading new content
   if (scrollTop + clientHeight >= scrollHeight ) {
     console.log("Scrolled to bottom, loading more products...");

      
     console.log(activeButton);
     console.log(activeButton.id);
     
     if(Number(activeButton.id)<=10)
      { 
         pageCount++;
        limit++;
        //  getProducts(limit,pageCount);
          // updatePagination(1,flag);
          // getProductByPagination(Number(activeButton.id)+1);
         
        }
        
      }
      
      if(scrollTop===0 && Number(activeButton.id)!==1){
        
        //  getProductByPagination(Number(activeButton.id)-1);
       
    }
  });
}

infiniteScrolling();









// //  fetching cart items []

// for(let i=0;i<sessionStorage.length;i++) {

//   const key = sessionStorage.key(i);
//   console.log(key);
  
//   const value = JSON.parse(sessionStorage.getItem(key));
//   console.log(value);
// }


