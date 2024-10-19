




// Display the date
function displayDate() {
    let date = new Date();
    date = date.toString().split(" ");
    console.log(date);  // Check if this part prints anything in the console
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}

// Wait for the page to fully load
window.onload = function() {
    displayDate();

    // Ensure localStorage items are fetched correctly
    // const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
    // console.log("Current items in localStorage:", itemsArray);  // Should print an empty array or the stored items

    // Set up the event listener after the DOM is fully loaded
    document.querySelector("#enter").addEventListener("click", () => {
        const item = document.querySelector("#item").value; // Get the value from the input field
        console.log("Input value:", item);  // Check if the input value is correctly fetched

        // If input is not empty, proceed to add it to localStorage
        if (item) {
            createItem(item);
        } else {
            console.log("No input provided.");
        }
    });
};

// Function to add the item to the localStorage
function createItem(item) {
    const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
    
    itemsArray.push(item);  // Add the new item to the array
    localStorage.setItem("items", JSON.stringify(itemsArray));  // Save the updated array to localStorage

    console.log(`Item "${item}" added to localStorage.`);
    console.log("Updated localStorage items:", itemsArray);
}

