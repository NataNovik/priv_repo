import ancientsData from "./data/ancients.mjs";
import {
    brownCards,
    blueCards,
    greenCards
} from "./data/mythicCards/index.mjs";

const stages = [ 1,2,3 ]
const colorsInStage = ['green', 'blue', 'brown']
const anciens = document.querySelectorAll('.anciens-card');
const difficultyButton = document.querySelectorAll('.complexity');
const shuffleButton = document.querySelector('.shuffle-button');
const deckContainer = document.querySelector('.deck-container');
const currentState = document.querySelector('.current-state');
const deck = document.querySelector('.deck');
const card = document.querySelector('.last-card');
let selectedCard
let levelDifficulty
let currentDeckBlue
let currentDeckBrown
let currentDeckGreen
let currentStage = 1

const reset = () => {
    currentState.style.display = 'none'
    deck.style.display = 'none'
    card.style.backgroundImage = 'none'
    currentStage = 1
}

const arrayRemoveActive = (itemsArray) => {
    itemsArray.forEach(el => el.classList.remove('active'))
}

const chooseAncien = (currentId) => {
    reset()
    arrayRemoveActive(anciens);

    selectedCard = ancientsData.find(el => el.id === currentId)

    // to show difficulty level menu
    document.getElementById(currentId).classList.add('active');
    document.querySelector('.complexity-container').style.display = 'flex';
    shuffleButton.style.display = 'flex'
}

const chooseDifficulty = (difficulty) => {
    reset()
    arrayRemoveActive(difficultyButton);

    levelDifficulty = difficulty

    document.getElementById(difficulty).classList.add('active');
    shuffleButton.style.display = 'flex'
    deckContainer.style.display = 'flex'
}

const fillDotsInDeckContainer = () => {
    stages.forEach((el) => {
        colorsInStage.forEach((color) => {
            document.getElementById(`${color}-${el}-stage`).innerText = selectedCard[`${el}Stage`][`${color}Cards`]
        })
    })
}

const shuffleDeck = () => {
    shuffleButton.style.display = 'none'
    currentState.style.display = 'flex'
    deck.style.display = 'flex'
    card.style.display = 'flex'
    fillDotsInDeckContainer()

    if(levelDifficulty === 'easy') {
        currentDeckBlue = blueCards?.filter(el => el.difficulty !== 'hard')
        currentDeckBrown = brownCards?.filter(el => el.difficulty !== 'hard')
        currentDeckGreen = greenCards?.filter(el => el.difficulty !== 'hard')
    }
}
// =======================================================================================================

const getCard = () => {
    let colorArray = []

    if(document.getElementById(`green-${currentStage}-stage`).innerHTML !== '0') {
        colorArray.push('green')
    }
    if(document.getElementById(`blue-${currentStage}-stage`).innerHTML !== '0') {
        colorArray.push('blue')
    }
    if(document.getElementById(`brown-${currentStage}-stage`).innerHTML !== '0') {
        colorArray.push('brown')
    }

    let color = colorArray[Math.floor(Math.random()*colorArray.length)]

    let currentCounter = parseInt(document.getElementById(`${color}-${currentStage}-stage`).innerHTML)

    document.getElementById(`${color}-${currentStage}-stage`).innerHTML = (currentCounter - 1).toString()

    if(document.getElementById(`green-${currentStage}-stage`).innerHTML === '0' &&
        document.getElementById(`blue-${currentStage}-stage`).innerHTML === '0' &&
        document.getElementById(`brown-${currentStage}-stage`).innerHTML === '0') {
        currentStage = currentStage + 1
    }
    if(currentStage === 4) {
        deck.style.display = 'none'
    }

//todo refactor color
    if(color === 'green') {
        let resultCardGreen = currentDeckGreen[Math.floor(Math.random()*currentDeckGreen.length)].cardFace
        card.style.backgroundImage = `url('./assets/MythicCards/${color}/${resultCardGreen}.png')`
    }
    if(color === 'blue') {
        let resultCardBlue = currentDeckBlue[Math.floor(Math.random()*currentDeckBlue.length)].cardFace
        card.style.backgroundImage = `url('./assets/MythicCards/${color}/${resultCardBlue}.png')`
    }
    if(color === 'brown') {
        let resultCardBrown = currentDeckBrown[Math.floor(Math.random()*currentDeckBrown.length)].cardFace
        card.style.backgroundImage = `url('./assets/MythicCards/${color}/${resultCardBrown}.png')`
    }
}

anciens.forEach(el => el.addEventListener('click', (event) => chooseAncien(event.target.id)))
difficultyButton.forEach(el => el.addEventListener('click', (event) => chooseDifficulty(event.target.id)))
shuffleButton.addEventListener('click', () => shuffleDeck())
deck.addEventListener('click', () => getCard())


