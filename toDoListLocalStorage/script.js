/**
 
 * Сперва мы select нужный ID или класс какого-то тега, 
 * присваиваем его переменной 
 * и производим действие с этой переменной
 * 
 * Конкретно в этом коде через backtick пишем в формате строки
 * часть дом дерева в html
 * 
 * присваиваем его переменной и потом переменную присваиваем 
 * через InnerHtml классу или ID какого-то тега в DOM дереве html
 * файла. 
 * 
 * 
 * Затем можно писать функции которые могут выбирать посредством ID или
 * классов какие-то теги в строковом выражении участка дом дерева. И производим
 * действия с этим деревом в строковом выражении, которые мы ранее присвоили
 * тегу в реальном DOM дереве.
 *
 */


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
    //string of items is assigned to a div element in the tree with the selector ".to-do-list"
    document.querySelector(".to-do-list").innerHTML = items
    //edit button
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}


//DELETING (привязка к индексу)
//deleting an item from array by clicking the check icon, which is delete button
function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => { deleteItem(i)})
    })   
}
  // привязка к индексу
function deleteItem(i){
 itemsArray.splice(i, 1) // deleting only that element
 localStorage.setItem("items", JSON.stringify(itemsArray)) // update the localStorage
 location.reload() //refresh 
}



//EDITING (ADDING) INFO INSIDE THE TEXTAREA WITH BUTTONS 

function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn") //selecting an edit icon
    const updateController = document.querySelectorAll(".update-controller") //selecting save/cancel buttons div block
    const inputs = document.querySelectorAll(".input-controller textarea") // selecting textarea
    editBtn.forEach((eb, i)=>{
        eb.addEventListener("click", ()=>{
            updateController[i].style.display = "block" //on-click we visualize save/cancel buttons
            inputs[i].disabled = false //on-click we change the status of disabled inside textarea, so we can input
        })
        
    })
}


//SELECTING THE RIGHT BUTTON AND TEXTAREA AND RUNNING THROUHG THE STRING
function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn") //selecting SAVE button
    const inputs = document.querySelectorAll(".input-controller textarea") //selecting textarea
    //running through all the buttons in the item string and clicking on the index
    saveBtn.forEach( (sb, i)=>{
        sb.addEventListener("click", ()=>{
            updateItem(inputs[i].value, i) // entering new value in the right index of the items array
        })
    })
}

function updateItem(text, i){
    itemsArray[i] = text //ENTERING NEW VALUE (TEXT)
    localStorage.setItem("items", JSON.stringify(itemsArray)) // update localStorage
    location.reload()//refresh

}



//CLICKING CHECK ICON AND HIDING DIV BLOCKS WITH SAVE/CANCEL BLOCK AND TEXTAREA
function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll(".cancelBtn")//selecting cancel button
    const updateController = document.querySelectorAll(".update-controller") //selecting div with save/cancel button
    const inputs = document.querySelectorAll(".input-controller textarea") // selecting textarea
    cancelBtn.forEach((cb, i)=>{
        cb.addEventListener("click", ()=>{
            updateController[i].style.display = "none" // run through the whole string and hiding the clicked div block with save/cancel button
            inputs[i].disabled = true //hide the textarea
        })
    })
   
}


//ADDING ITEM(id from <input>)FROM INPUT TAG TO THE ARRAY

function createItem(item){

    console.log(itemsArray) 
    itemsArray.push(item)
    console.log(item)
    //setting VALUE TO LOCALSTORAGE(setItem takes 2 arguments)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    console.log("After adding:", itemsArray); // Confirm item has been added
    location.reload() //refreshing
}


window.onload = function(){
    displayDate() // show date
    displayItems() // display the whole string
    
    //selecting button  and clicking it will select item.value id, which is a part of input block
    document.querySelector("#enter").addEventListener("click", () => {
        const item = document.querySelector("#item").value
        // createItem(item)
        if (item) {
            // Proceed only if the input has a value
            //input block's id value is added to array
            createItem(item); 
            document.querySelector("#item").value = ""; // clean the input field
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






