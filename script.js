

//the first mistake
const itemsArray = 
localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):[]
console.log(itemsArray) 



function displayDate(){
    let date = new Date()
    date = date.toString().split(" ")
    // console.log(date)
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3]
}

function displayItems(){
    let items = ""
    for (let i = 0; i < itemsArray.length; i++){
            items += `<div class="item">
                        <div class="input-controller">
                            <textarea disabled>${itemsArray[i]}</textarea>
                            <div class="edit-controller">
                                <i class="fa-solid fa-check deleteBtn"></i>
                                <i class="fa-solid fa-pen-to-square editBtn"></i>
                            </div>
                        </div>
                        <div class="update-controller">
                            <button class="saveBtn">Save</button>
                            <button class="cancelBtn">Cancel</button>
                        </div>
                    </div>`
        
    }
    document.querySelector(".to-do-list").innerHTML = items
    //edit button
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}

//deleting an item from array by clicking the check icon
function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => { deleteItem(i)})
    })   
}
  
function deleteItem(i){
 itemsArray.splice(i, 1) // deleting only that element
 localStorage.setItem("items", JSON.stringify(itemsArray)) // update the localStorage
 location.reload() //refresh 
}

function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn") //choosing an edit icon
    const updateController = document.querySelectorAll(".update-controller") //choosing buttons
    const inputs = document.querySelectorAll(".input-controller textarea") // choosing textarea
    editBtn.forEach((eb, i)=>{
        eb.addEventListener("click", ()=>{
            updateController[i].style.display = "block" //visualize button
            inputs[i].disabled = false //can input inside textarea
        })
        
    })
}


function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn") //choosing button
    const inputs = document.querySelectorAll(".input-controller textarea") //choosing textarea
    saveBtn.forEach( (sb, i)=>{
        sb.addEventListener("click", ()=>{
            updateItem(inputs[i].value, i) // enter new info
        })
    })
}

function updateItem(text, i){
    itemsArray[i] = text //getting text
    localStorage.setItem("items", JSON.stringify(itemsArray)) // update localStorage
    location.reload()//refresh

}

function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb, i)=>{
        cb.addEventListener("click", ()=>{
            updateController[i].style.display = "none"
            inputs[i].disabled = true
        })
    })
   
}




function createItem(item){

    console.log(itemsArray) 
    itemsArray.push(item)
    console.log(item)
//setItem takes 2 arguments
    localStorage.setItem("items", JSON.stringify(itemsArray))
    console.log("After adding:", itemsArray); // Confirm item has been added
    location.reload()
}


window.onload = function(){
    displayDate()
    displayItems()
    
    document.querySelector("#enter").addEventListener("click", () => {
        const item = document.querySelector("#item").value
        // createItem(item)
        if (item) {
            createItem(item); // Proceed only if the input has a value
            document.querySelector("#item").value = "";
        } else {
            console.log("Input is empty. Please enter a value.");
        }
    })
    // localStorage.clear()

}   





// // Display the date
// function displayDate() {
//     let date = new Date();
//     date = date.toString().split(" ");
//     console.log(date);  // Check if this part prints anything in the console
//     document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
// }

// // Wait for the page to fully load
// window.onload = function() {
//     displayDate();

//     // Ensure localStorage items are fetched correctly
//     // const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
//     // console.log("Current items in localStorage:", itemsArray);  // Should print an empty array or the stored items

//     // Set up the event listener after the DOM is fully loaded
//     document.querySelector("#enter").addEventListener("click", () => {
//         const item = document.querySelector("#item").value; // Get the value from the input field
//         console.log("Input value:", item);  // Check if the input value is correctly fetched

//         // If input is not empty, proceed to add it to localStorage
//         if (item) {
//             createItem(item);
//         } else {
//             console.log("No input provided.");
//         }
//     });
// };

// // Function to add the item to the localStorage
// function createItem(item) {
//     const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
    
//     itemsArray.push(item);  // Add the new item to the array
//     localStorage.setItem("items", JSON.stringify(itemsArray));  // Save the updated array to localStorage

//     console.log(`Item "${item}" added to localStorage.`);
//     console.log("Updated localStorage items:", itemsArray);
// }






