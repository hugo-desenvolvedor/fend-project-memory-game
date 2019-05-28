/**
 * Create a list that holds all of your cards
 */
let allCards = document.getElementsByClassName("card")
let cardList
let matches = 0

initGame()

function initGame() {
    initCards();
    allCards = document.getElementsByClassName("card")
    cardList = []
    document.querySelector(".moves").innerHTML = "0"
    document.querySelector(".moves").insertAdjacentText("beforeend", " Move")

    /**
     * Set the cards click event
     */
    for (const card of allCards) {
        card.addEventListener('keypress', function showCard (e) {
            const key = event.key || event.keyCode
            const self = this

            if (key == 13 || key == 'Enter') {
                self.showCard = showCard
                self.event = 'keypress'
                makeMove(self)
            }
        });

        card.addEventListener('click', function showCard() {
            const self = this
            self.showCard = showCard
            self.event = 'click'
            makeMove(self)
        })
    }
}

/**
 * Restart the game
 */
document.querySelector('.restart').addEventListener('click', () => {
    initGame()
})

document.querySelector('.modal p').addEventListener('click', () => {
    document.querySelector(".overlay").style.display = "none"
    document.querySelector(".modal").style.display = "none"

    initGame()
})

/**
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function initCards() {
    /**
     * Set the array contents
     * @type {string[]}
     */
    let cards = [
        'fa-diamond',
        'fa-paper-plane-o',
        'fa-anchor',
        'fa-bolt',
        'fa-cube',
        'fa-leaf',
        'fa-bomb',
        'fa-credit-card'
    ]

    /**
     * Duplicate the array contents
     */
    cards = shuffle(cards.concat(cards))

    /**
     * Set the HTML deck
     * @type {Array}
     */
    const deck = []
    let i = 0
    for (const card of cards) {
        i++
        deck.push(`<li class="card" data-value="${card}" tabindex="${i}"><i class="fa ${card}"></i></li>`)
    }
    document.querySelector('.deck').innerHTML = deck.join('')
}

/**
 * Update the moves value
 */
function setMoves() {
    const me = document.querySelector(".moves");
    let move = parseInt(me.textContent);
    move++;
    me.innerHTML = move;
    me.insertAdjacentText("beforeend", move == 1 ? " Move" : " Moves")
}

/**
 * Set one star for each match
 */
function setStars() {
    document.querySelector(".stars").insertAdjacentHTML("beforeend", `<li><i class="fa fa-star"></i></li>`)
}

function makeMove(self) {
    self.removeEventListener(self.event, self.showCard)
    self.cardList = cardList

    /**
     * Save the function instance to use in another context
     * @type {showCard}
     */

    /**
     * Save the actual event instance
     */
    self.cardList.push(self)

    /**
     * Show the card
     */
    self.classList.add('open', 'show');

    /**
     * When we have two cards, compare the results
     */
    if (self.cardList.length == 2) {
        if (self.cardList[0].dataset.value == cardList[1].dataset.value) {
            /**
             * If the results match, maintains the card opened
             */
            self.cardList[0].classList.add('match')
            self.cardList[1].classList.add('match')
            setStars()

            /**
             * Show the modal
             */
            matches++
            if (matches == 8) {
                document.querySelector(".overlay").style.display = "block"
                document.querySelector(".modal").style.display = "block"
            }
        } else {
            /**
             * If the results don't match, hide the card
             */
            setTimeout(function () {
                self.cardList[0].classList.remove('open', 'show')
                self.cardList[1].classList.remove('open', 'show')
            }, 1000)

            /**
             * Set the event listener previously removed
             */
            self.cardList[0].addEventListener(self.event, self.showCard)
            self.cardList[1].addEventListener(self.event, self.showCard)
        }
        setMoves()
        cardList = []
    }
}

/**
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}