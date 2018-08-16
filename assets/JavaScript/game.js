const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let wins = 0
let losses = 0
let guessedLetters = []
let guessesLeft = 10
let compChoice = compGuess ()
let gameState = true

console.log(compChoice)
//picks computers guess
function compGuess () {
    return letters[Math.floor(Math.random()*letters.length)]
}

//if you lose
function lose () {
    gameState = false
    losses++
    document.querySelector('#status').innerHTML = "You didn't guess my letter " + compChoice + ". Too bad"
    document.querySelector('#face').src ="assets/Images/wrong.png"
    document.querySelector('#losses').innerHTML = 'Losses: ' + losses 
    document.querySelector('#message2').innerHTML = "Press enter to play again."
}

//if you win
function win () {
    gameState = false
    wins++
    document.querySelector('#status').innerHTML = "Way to go! You guessed my letter " +compChoice + "."
    document.querySelector('#face').src ="assets/Images/right.png"
    document.querySelector('#wins').innerHTML = 'Wins: ' + wins
    document.querySelector('#message2').innerHTML = "Press enter to play again."
}

//if you guess wrong
function wrong () {
    document.querySelector('#message2').innerHTML = "Wrong! Try again"
}

//to reset game
function reset () {
    gameState = true
    compChoice = compGuess ()
    console.log(compChoice)
    guessesLeft = 10
    guessedLetters = []
    document.querySelector('#guesses').innerHTML = guessedLetters.toString()
    document.querySelector('#guess-left').innerHTML = "Guesses Left: " + guessesLeft
    document.querySelector("#message2").innerHTML = "Pick a Letter"
    document.querySelector('#face').src ="assets/Images/thinking.jpeg"
}

//make sure players choice is a letter from our array
function alphaCheck (letter) {
    let result = false
    for (let i=0; i < letters.length; i++) {
        if (letter === letters[i]){
            if (gameState === true) {
                return alreadyGuessed (letter)            
            } else {
                return false
            }           
        }
    }
    return result
}

//stopping duplicate letters
function alreadyGuessed (letter) {
    let result = true
    for (let i=0; i < guessedLetters.length; i++) {
        if (letter === guessedLetters[i]) {
            document.querySelector('#message2').innerHTML = "You already chose that letter."
            return false        
        }
    }
    return result
}

document.onkeyup = function (event) {
    //player picks a letter and it goes into the guessed letters array
    const letter = event.key
    document.querySelector('#guess').innerHTML = "Your Guess:"
    document.querySelector('#already').innerHTML = "You've Already Guessed:"
    if (letter !== 'Enter') {    
        if (alphaCheck(letter)) {
            guessedLetters.push(letter)
            document.querySelector('#your-guess').innerHTML = letter
            document.querySelector('#guesses').innerHTML = guessedLetters.toString()
    //check to see if letter matches and what to do
            guessesLeft--
            document.querySelector('#guess-left').innerHTML = "Guesses Left: " + guessesLeft
            letter === compChoice ? win(): (guessesLeft>0 ? wrong(): lose())
        }
    }
    else {
        reset()
    }
}
