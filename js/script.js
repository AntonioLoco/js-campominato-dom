/*
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/

const btnPlay = document.getElementById("btn-play");
const resultText = document.getElementById("result-text");


let arrayNumbers = [];
let arrayBombs = [];
let squareClicked = [];
let gameEnded = false;

// Al click dell bottone generiamo la griglia
btnPlay.addEventListener("click", generateGrid);





// FUNCTION
/**
 * Description: Funzione che genera un array di lunghezza pari ad arrayLenght rimpita con numeri progressivi da 1 a arrayLenght
 * @param {number} arrayLenght la lunghezza dell'array da creare
 * @returns {Object} Ritorna un array con i numeri che vanno progressivamente da 1 a arrayLenght
 */
function generateNumbersArray(arrayLength){
    let arrayGenerate = [];
    for(let i = 0; i < arrayLength; i++){
        arrayGenerate.push(i + 1);
    }
    return arrayGenerate;
}

/**
 * Description: Funzione che ci genera un array di lunghezza pari a arrayLength con valori random che vanno da 1 a maxNumberGenerate senza doppioni
 * @param {number} arrayLength - lunghezza dell array che vogliamo creare
 * @param {number} maxNumberGenerate - il numero massimo random che possiamo generare da inserire all'interno dell array
 * @returns {Array} Ritorna un array con numeri random non ripetuti
 */
function generateRandomNumbersArray(arrayLength, maxNumberGenerate){
    let arrayGenerate = [];

    while( arrayGenerate.length < arrayLength){
        const randomNumber = getRndInteger(1, maxNumberGenerate);
        
        if(!arrayGenerate.includes(randomNumber)){
            arrayGenerate.push(randomNumber);
        }
    }

    return arrayGenerate;
}

/**
 * Description: Funzione che genera un numero random compreso tra min e max
 * @param {number} min - valore minimo che possiamo generare
 * @param {number} max - valore massimo che possiamo generare
 * @returns {number} Ritorna il numero random generato
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}



// UI FUNCTION
/**
 * Description: Funzione che ci crea l'elemento square
 * @returns {object} ritorna l'elemento square creato
 */
function generateSquare(){
    const generateSquare = document.createElement("div");
    generateSquare.classList.add("square");

    return generateSquare;
}


function squareHandlerClick(){

    // Prendo tutti i quadrati
    const squareList = document.getElementsByClassName("square");

    // Se il quadrato non è stato già cliccato
    if(!(this.classList.value).includes("active") && !gameEnded && squareClicked.length < (arrayNumbers.length - arrayBombs.length) - 1){


        if(!arrayBombs.includes(parseInt(this.textContent))){
            this.classList.add("active");
            squareClicked.push(this.textContent);
        } else {

            // Scopriamo tutte le bombe
            for(let i = 0; i < arrayNumbers.length; i++){
                if(arrayBombs.includes(parseInt(squareList[i].textContent))){
                    squareList[i].classList.add("bomb");
                }
            }

            //Diciamo che il gioco è finito
            gameEnded = true;

            // Mostriamo il messaggio del risultato
            resultText.textContent = `Hai perso con ${squareClicked.length} mosse!`;
            resultText.classList.remove("hidden");
        }               //33                       //49                //16
    } else {
        gameEnded = true;

        // Scopriamo tutte le bombe
        for(let i = 0; i < arrayNumbers.length; i++){
            if(arrayBombs.includes(parseInt(squareList[i].textContent))){
                squareList[i].classList.add("bomb");
            }
        }

        // Mostriamo il messaggio del risultato
        resultText.textContent = `Complimenti Hai Vinto!!!!`;
        resultText.classList.remove("hidden");
    }
}

/**
 * Description: Funzione che genera la griglia di quadrati
 */
function generateGrid(){
    const mainTitle = document.getElementById("main-title");
    const gridSquare = document.querySelector(".grid");
    const userDifficulty = document.getElementById("difficulty");

    //svuoto la griglia
    resultText.textContent = "";
    resultText.classList.add("hidden");
    gridSquare.innerHTML = "";
    gameEnded = false;
    squareClicked = [];
    
    // Difficoltà dell'utente
    const userDifficultyChoice = parseInt(userDifficulty.value);

    // Genero un array di numeri
    arrayNumbers = generateNumbersArray(userDifficultyChoice);

    //Generare array di bombe
    arrayBombs = generateRandomNumbersArray(16,userDifficultyChoice);
    console.log(arrayBombs);

    // Generiamo la griglia
    for(let i = 0; i < arrayNumbers.length ; i++){
        const item = generateSquare();

        if(userDifficultyChoice === 49){
            item.classList.add("hard");
        } else if(userDifficultyChoice === 81){
            item.classList.add("medium");
        } else {
            item.classList.add("easy");
        }

        item.innerHTML = arrayNumbers[i];
        

        item.addEventListener("click", squareHandlerClick);

        gridSquare.append(item);

        // Aggiungo la classe hidden al titolo
        mainTitle.classList.add("hidden");

        // Rimuovo la classe hidden dalla griglia
        gridSquare.classList.remove("hidden");
    }
}

