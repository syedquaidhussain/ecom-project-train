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

    buttonAddToWish.textContent="Add To Wishlist";

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
   console.log(data);
   

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
    console.log(element.value);

    const res = await fetch(`https://dummyjson.com/products/category/${element.value}`)
  const data = await res.json();
  const product = data.products
    console.log(product);
  
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





// New Way R To U ----------------------------------------------------------------

async function getProductByPagination(btnVal) {

         const button = document.getElementById(`${btnVal}`);
        const settingValue = button.disabled ? false:true
         button.setAttribute ("disabled", true);

         
         console.log(button);
         
        const skipValue = btnVal * 10;  // Assuming 10 products per page

        const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skipValue}`);

        const data = await res.json(); 

        const products= data.products;

        console.log(data);  // Log the data to check the response

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
