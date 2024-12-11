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


//  function getProductBySpecificNumber(btnVal) {
//     // let skipVal = skipValue;
//     return async (btnVal)=>{
//     //    here I can also do button value *10 fo skipping
//         const res =  await fetch(`https://dummyjson.com/products?limit=10&skip=${btnVal*10}`)
//         const data = res.json();
//         console.log(data)
//         skipVal = 10;
//     }
 
// }

// const getProductByPagination = getProductBySpecificNumber(btnVal)


// New Way R To U 
function getProductBySpecificNumber(btnVal) {
    return async () => {
        // Calculate the skip value based on the button number (for pagination)
        const skipValue = btnVal * 10;  // Assuming 10 products per page

        const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skipValue}`);
        const data = await res.json();  // You need to await the res.json() to get the data

        console.log(data);  // Log the data to check the response
        // Here you can implement logic to update the UI with the fetched products
    };
}

// Example of how to use the function
const getProductByPagination = (btnVal) => getProductBySpecificNumber(btnVal)();


