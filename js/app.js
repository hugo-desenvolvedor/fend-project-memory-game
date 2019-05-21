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
        card.addEventListener('click', function showCard() {
            /**
             * Set the self variables. It is important when we need to use some vars inside other contexts
             * @type {showCard}
             */
            const self = this

            /**
             * Save the card list instance to use in another context
             * @type {Array}
             */
            self.cardList = cardList

            /**
             * Save the funcion instance to use in another context
             * @type {showCard}
             */
            self.showCard = showCard

            /**
             * Remove the click event from this card
             */
            self.removeEventListener('click', showCard)

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
                    self.cardList[0].addEventListener('click', self.showCard)
                    self.cardList[1].addEventListener('click', self.showCard)
                }
                setMoves()
                cardList = []
            }
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
    for (const card of cards) {
        deck.push(`<li class="card" data-value="${card}"><i class="fa ${card}"></i></li>`)
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
    console.log('setting stars');
    document.querySelector(".stars").insertAdjacentHTML("beforeend", `<li><i class="fa fa-star"></i></li>`)
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