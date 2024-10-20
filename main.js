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