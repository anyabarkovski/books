let books = [
    {
        title: 'Brott och straff',
        author: 'Fjodor Dostojevskij',
        format: 'storpocket',
        price: 199,
        id: 1,
    },
    {
        title: 'Idioten',
        author: 'Fjodor Dostojevskij',
        format: 'storpocket',
        price: 209,
        id: 2,
    },
    {
        title: 'Oliver Twist',
        author: 'Charles Dickens',
        format: 'häftad',
        price: 169,
        id: 3,
    },
    {
        title: 'Doktor Glas',
        author: 'Hjalmar Söderberg',
        format: 'pocket',
        price: 105,
        id: 4,
    },
    {
        title: 'The Hobbit',
        author: 'J. R. R. Tolkien',
        format: 'inbunden',
        price: 349,
        id: 5,
    },
]



// funktionen för att skapa ett tom kort-container
function createCard(book) {

    const card = document.createElement('div')
    card.classList.add('book-card')

    card.innerHTML += `
        <h1>${book.title}</h1>
        <p>${book.author}</p>
        <p>${book.format}</p>
        <p>${book.price} kr</p>
        <button class="btn-card">Lägg till</button>
        <button class="btn-delete">Ta bort</button>
    `
    //addEventListener måste vara här, annars när lista med böckerna uppdateras - knapparna fungerar inte
    const cardButton = card.querySelector('.btn-card')


    //BUTTON 
    let clicks = 1
    cardButton.addEventListener('click', () => {

        card.classList.toggle('active')
        
        //växlar texten på knappen 
        if(clicks % 2 === 0 ){
            cardButton.textContent = 'Lägg till'
        } else {
            cardButton.textContent = 'Tillagd'
        }
        clicks++

    })

    //DELETE BUTTON
    const deleteButton = card.querySelector('.btn-delete') 

    deleteButton.addEventListener('click', () => {
        books = books.filter(chosenBook => chosenBook.id !== book.id)
        displayBooks(books)
    })

    return card
}


// //funktionen med loopen för att fylla i kort-container med data från objekten

function displayBooks(booksToShow) {

    const container = document.querySelector('.books-container')
    container.innerHTML = ''

    booksToShow.forEach(book => {
        let card = createCard(book)
        container.append(card)
    })
}
displayBooks(books)

// // FILTRERA CARDS
const filter = document.getElementById('filter')

filter.addEventListener('change', () => {

    if(filter.value === 'alla'){
        displayBooks(books)
    } else {
        let filteredBooks = books.filter(book => book.format === filter.value)
        displayBooks(filteredBooks)
    }
})


// //formulär
let nextId = 6 //annars det blir ett problem med 'ta bort' logiken
const form = document.getElementById('add-book-form')
const format = document.getElementById('format')

form.addEventListener ('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const newBook = Object.fromEntries(formData)
    newBook.price = Number(newBook.price)
    newBook.id = nextId++

    books.push(newBook)

    filter.value = 'alla'
    displayBooks(books)

    form.reset()
})

// MENU
const menu = { //skapar ett objekt
    toggleMenu: function() { // skapar en method
        let nav = document.querySelector('.nav')
        nav.classList.toggle('active')
    }
}

let hamb = document.querySelector('.hamburger')
hamb.addEventListener('click', function() {
    menu.toggleMenu()
})

