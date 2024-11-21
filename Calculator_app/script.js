const screen = document.getElementById("screen")

function showOnScreen(input){
    screen.value += input
}

function clearScreen(input){
    screen.value = ""
}

function calculate(input){
    try{
        //eval function works as calculator
        screen.value = eval(screen.value)
    }
    catch(error){
        screen.value = 'wrong action, try again'
    }
}  

