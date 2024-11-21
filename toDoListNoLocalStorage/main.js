let addToDoButton = document.getElementById('addToDo') //selecting button id
let toDoContainer = document.getElementById('toDoContainer') //selecting div id under the input
let inputField = document.getElementById('inputField') //selecting input id

addToDoButton.addEventListener('click', function(){
    
    //this p is not in html file, so it is created dynamically
    var paragraph =document.createElement('p');
    //dynamic adding a class 
    paragraph.classList.add('paragraph-styling');
    //saving text from input
    paragraph.innerText = inputField.value;


    
    

    
    //place paragraph inside div block, which is empty in html file
    toDoContainer.appendChild(paragraph);

    //deleting the input value in the input field
    inputField.value = '';
    
    //adding click to virtual p and crossing the text
    paragraph.addEventListener('click', function(){
        paragraph.style.textDecoration = 'line-through'
    })
    
    //double click to remove the paragraph from the div block
    paragraph.addEventListener('dblclick', function(){
        toDoContainer.removeChild(paragraph);
    })
    
})



//SUGGESTIONS TO THE CODE: 

//1
// /*Templates: Instead of manually creating each element 
// with createElement, you can use HTML templates or template 
// literals to make the process easier and cleaner. Example:*/
// let template = `<p class="paragraph-styling">${inputField.value}</p>`;
// toDoContainer.innerHTML += template;

/**Let me explain the code and how event delegation works here.

2
The Code:

js

toDoContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'P') {
        event.target.style.textDecoration = 'line-through';
    }
});

How It Works:

    toDoContainer.addEventListener('click', function(event):
        You attach a click event listener to the toDoContainer (which is the parent <div> that holds all the paragraphs you create dynamically).
        The listener waits for any click event inside the toDoContainer.

    event.target:
        The event parameter represents the click event.
        event.target refers to the exact element that was clicked. In this case, it could be one of the paragraphs (<p>) that you've dynamically created.
        For example, if you clicked on a paragraph, event.target would point to that <p> element.

    if (event.target.tagName === 'P'):
        The code checks if the element that was clicked is a <p> tag.
        event.target.tagName returns the tag name (in all caps) of the clicked element.
        If the clicked element is indeed a <p>, the condition event.target.tagName === 'P' is true.

    event.target.style.textDecoration = 'line-through':
        If the clicked element is a paragraph (<p>), this line of code runs, applying a line-through style to the clicked paragraph, crossing out the text.

What's Happening?

In your original approach, you were attaching individual event listeners to each paragraph dynamically as you created them. However, this can become inefficient when you have a large number of elements.

With event delegation, you attach one event listener to a parent element (in this case, toDoContainer), and it listens for events on all its children (the paragraphs). When a click happens anywhere inside the toDoContainer, the event listener is triggered. You then check event.target to see what specific child element was clicked.
Why Use Event Delegation?

    Efficiency: Instead of adding a separate event listener to each paragraph, you only add one to the parent. This reduces memory usage and improves performance, especially with many elements.
    Handles Dynamic Content: Even if you add more paragraphs dynamically later, the single event listener on the parent (toDoContainer) will still handle clicks on those new paragraphs. You don’t need to reattach listeners.

Example:

Here’s how it would work in practice:

    Suppose you click on a paragraph inside the toDoContainer.
    The click event is triggered on toDoContainer.
    The event.target will be the paragraph that you clicked.
    The code checks if event.target.tagName === 'P' (to ensure the click is on a paragraph).
    If true, it crosses out the text by applying the line-through style.

Without Event Delegation:

Before, you were adding a click event listener to each paragraph when you created it. But if you added 100 paragraphs, that would mean 100 individual event listeners. With event delegation, you can manage it all with just one listener on the parent.
 */