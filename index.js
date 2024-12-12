let counterOfCart = 0;
let counterOfWishList = localStorage.length;
let cartStatus = false;
let wishlistStatus = false;


function clearUI() {

  const parentDiv= document.getElementById("second")


      while (parentDiv.firstChild) {
          parentDiv.removeChild(parentDiv.firstChild);
      
  }
    

}
// BUg =======================================================================querySelector lagna 
function toggleCart(id) {
  const e = document.getElementById(`${id}`)
  if(!cartStatus){
    e.textContent= "Remove From Cart"
    cartStatus = true;
  }
  else{
    e.textContent= "Add To Cart";
    cartStatus= false;

  }

}

function toggleWishList(id) {

}

// Find Can be optimsed 
function displayProductOnUi(product){

    const newDiv = document.createElement("div");

    newDiv.id = `${product.id}`;
    newDiv.className = "image-class";
    
    const img = document.createElement("img");
    img.src= product.thumbnail
    img.width = 150; // Set width (optional)
    img.height = 150;
    
    const buttonAdd = document.createElement("button");

    const buttonAddToWish = document.createElement("button");

    buttonAdd.textContent="Add To Cart";
    buttonAdd.classList.add("AddTC");
    buttonAdd.id = product.id;
    
  

    // Add To Cart Functionality
    buttonAdd.addEventListener("click",(event)=>{
      
      console.log(event.target.id);
      const element = document.getElementById("cart"); // element is span
        
      sessionStorage.length;
      // element.innerHTML= ++counterOfCart;
      sessionStorage.setItem(`${product.id}`,`${product}`)
      element.innerHTML = sessionStorage.length ? sessionStorage.length:0
      toggleCart(event.target.id);
      
    });
    
    buttonAddToWish.textContent="Add To Wishlist";
    
    buttonAddToWish.id="AddTW";
    
    // Add To wishlist Functionality
    buttonAddToWish.addEventListener("click",(event)=>{
      
      console.log(event.target.id);
      const element = document.getElementById("wish");

      if(localStorage.length){
        counterOfWishList= localStorage.length

        element.innerHTML = counterOfWishList;
      }
      localStorage.setItem(`${product.id}`,`${product}`)
      element.innerHTML = localStorage.length ? localStorage.length:counterOfWishList
      
      // element.innerHTML= ++counterOfWishList;



    
      
    })

    newDiv.appendChild(img);

    newDiv.appendChild(buttonAdd);
    
    newDiv.appendChild(buttonAddToWish);

    const e =  document.getElementById("second")
    e.append(newDiv)

}


// limit lagai h is function m 
async function getProducts() {

    
    const res = await fetch('https://dummyjson.com/products?limit=10')
    const  data =  await res.json()
     const products =  await data.products;
    //  console.log(products);

    //  products.map((product)=>{
        
    //  })
    products.map(displayProductOnUi)
     
     
}

getProducts();
    



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
      


}

// To change the color of selected button on pagination 
function highlightActive(button) {
  // Remove 'active' class from all buttons
  const buttons = document.querySelectorAll('.page-rep');
  // console.log(buttons);
  
  buttons.forEach(btn => btn.classList.remove('active'));

  // Add 'active' class to the clicked button
  button.classList.add('active');
}


// New Way R To U ----------------------------------------------------------------

async function getProductByPagination(btnVal) {

         const button = document.getElementById(`${btnVal}`);


         highlightActive(button);
          
        //  console.log(button);
         
        const skipValue = btnVal * 10;  // Assuming 10 products per page

        const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skipValue}`);

        const data = await res.json(); 

        const products= data.products;

        // console.log(data);  // Log the data to check the response

        const parentDiv= document.getElementById("second")


        if(products){ //if on pagination new product exist then clear the ui 
            while (parentDiv.firstChild) {
                parentDiv.removeChild(parentDiv.firstChild);
            }
        }
          
        products.map(displayProductOnUi)
       

    };


    
    // Example of how to use the function

let currentStart = 1; // Tracks the starting number of the first two buttons
const maxPages = 10; // Total number of pages
const visibleButtons = 2; // Number of buttons visible at a time


function updatePagination(direction) {
  currentStart += direction * visibleButtons;

  // Ensure numbers stay within valid ranges
  if (currentStart < 1) {
    currentStart = 1;
  } else if (currentStart > maxPages - visibleButtons) {
    currentStart = maxPages - visibleButtons + 1;
  }

  // Clear the existing page buttons except "dots" and other static elements
  const pageNumbersDiv = document.getElementById("pageNumbers");
  while (pageNumbersDiv.firstChild) {
    pageNumbersDiv.removeChild(pageNumbersDiv.firstChild);
  }

  // Create new page buttons dynamically
  for (let i = 0; i < visibleButtons; i++) {
    const newPageNumber = currentStart + i;

    const button = document.createElement("button");
    button.classList.add("page-btn");
    button.textContent = newPageNumber;
    button.setAttribute("onclick", `getProductByPagination(${newPageNumber})`);
    pageNumbersDiv.appendChild(button);
  }

  // Add the dots back
  const dots = document.createElement("span");
  dots.id = "dots";
  dots.textContent = "........";
  pageNumbersDiv.appendChild(dots);

  // Adding the last two buttons dynamically
  for (let i = maxPages - 1; i <= maxPages; i++) {
    const button = document.createElement("button");
    button.classList.add("page-btn");
    button.textContent = i;
    button.setAttribute("onclick", `getProductByPagination(${i})`);
    button.id = i;
    pageNumbersDiv.appendChild(button);
  }

  // Enable/disable Prev and Next buttons
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  prevButton.disabled = currentStart === 1;
  nextButton.disabled = currentStart + visibleButtons - 1 >= maxPages;
}





//Searching Feature 

//  function debounceFunction(inputValue,delay){
//   console.log(inputValue);
  
//      let timer = null;
//   return async (inputValue)=>{

//        if(timer) clearTimeout(timer);
//       timer =  setTimeout(async() => {
      
//       const res = await fetch(`https://dummyjson.com/products/search?q=${inputValue}`);
//       const data = res.json();
//       console.log("fetching",data);
//     }, delay);
//   }
  

// }

// const  searchProduct = debounceFunction(event.target.value,2000)

// function fetchSearchResults(event) {
// searchProduct(event.target.value)

// }


let debounceTimer;

function searchProduct(event) {
  const inputValue = event.target.value.trim();
console.log(inputValue);

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

       }
    } 
    catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, 500); // Delay of 2 seconds
}
