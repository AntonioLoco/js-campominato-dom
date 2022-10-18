/*
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/

const btnPlay = document.getElementById("btn-play");

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


/**
 * Description: Funzione che genera la griglia di quadrati
 */
function generateGrid(){
    const mainTitle = document.getElementById("main-title");
    const gridSquare = document.querySelector(".grid");
    const userDifficulty = document.getElementById("difficulty");

    //svuoto la griglia
    gridSquare.innerHTML = "";
    
    // Difficoltà dell'utente
    const userDifficultyChoice = parseInt(userDifficulty.value);

    // Genero un array di numeri
    let arrayNumbers = generateNumbersArray(userDifficultyChoice);

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
        
        item.addEventListener("click", function(){
            item.classList.add("active");
            console.log(item.textContent);
        })

        gridSquare.append(item);

        // Aggiungo la classe hidden al titolo
        mainTitle.classList.add("hidden");

        // Rimuovo la classe hidden dalla griglia
        gridSquare.classList.remove("hidden");
    }
}