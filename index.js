const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

const miniDb = { users: [], genres: [], books: [], descriptions: [], authors: [] }

miniDb.users.push({
  username: 'Muhire',
  password: '123'
})

miniDb.authors = ["Seneca", "John Muhire", "Sarah Kirezi", "Oscar Shema", "Catullus", "Alfred Manzi", "William Blake", "Charles Uwase", "Uriho Keats", "Akabazo Herzl", "Utatsineza Bysshe Shelley", "Mutoni Hemingway", "Akimana Obama", "Anton Chekhov", "Henry Wadsworth Longfellow", "Arthur Schopenhauer", "Jacob De Haas", "George Gordon Byron", "Jack London", "Robert Frost", "Abraham Lincoln", "O. Henry", "Ovid", "Robert Louis Stevenson", "John Masefield", "James Joyce", "Clark Ashton Smith", "Aristotle", "William Wordsworth", "Jane Austen", "Niccolò Machiavelli", "Lewis Carroll", "Robert Burns", "Edgar Rice Burroughs", "Plato", "John Milton", "Ralph Waldo Emerson", "Margaret Thatcher", "Sylvie d'Avigdor", "Marcus Tullius Cicero", "Banjo Paterson", "Woodrow Wilson", "Walt Whitman", "Theodore Roosevelt", "Agatha Christie", "Ambrose Bierce", "Nikola Tesla"]
miniDb.descriptions = ["U Rwanda, amateka yagiye yandikwa, avuga ko rwatangiye ari agahugu gato, kari i Gasabo mu Karere ka Gasabo kuri ubu, muri ako karere ubu niho ",
  " kari i Gasabo mu Karere ka Gasabo kuri ubu, muri ako karere ubu niho", "U Rwanda, amateka yagiye yandikwa, avuga ko rwatangiye ari agahugu gato", "Breaking news and analysis from TIME.com. Politics, world news, photos, video, tech reviews, health, science and entertainment news."]


var FILES_COUNT = 21
var COVER_COUNT = 25
var GENRES_TYPES = ["Amateka", "Inkuru Mpimbano", "Abazungu", "Urukundo", "Byenda Gusetsa", "Ubushakashatsi", "Iyobokamana", "Politiki", "Ibizaza."]
var USED_BOOK_COVERS = [];
var USED_GENRE_COVERS = [];
generateLib()

app.use(express.static('public'))

app.use(bodyParser.json())

app.post('/comment', function (req, res) {



  miniDb.genres[req.body.genreId].books[req.body.bookId].comments.push({ username: req.body.username, message: req.body.message, date: req.body.date })

  return res.json({ data: "success" })
});


app.get('/comments/:genreId/:bookId', function (req, res) {
  console.log(req.params.genreId, req.params.bookId)
  var comments = miniDb.genres[req.params.genreId].books[req.params.bookId].comments

  return res.json(comments)
});


app.get('/genres', (req, res) => {

  return res.json(miniDb.genres)
})


function generateBooksByGenre(genre) {
  var maxBooks = Math.floor(Math.random() * 25);
  var books = []
    USED_BOOK_COVERS = []
 
  for (var i = 0; i < maxBooks; i++) {
    var book = {}

    book.title = "Book " + (i + 1) + " in " + genre + " !"
    book.description = miniDb.descriptions[Math.floor(Math.random() * miniDb.descriptions.length)]
    book.author = miniDb.authors[Math.floor(Math.random() * miniDb.authors.length)]
    book.pages = Math.floor(Math.random() * 1000);
    book.genre = genre
    book.pdfPath = Math.floor(Math.random() * FILES_COUNT) + ".pdf"

    book.cover = getUniqueBookCoverId() + ".jpg"
    book.comments = []
    books.push(book)
  }
  return books
}



function getUniqueBookCoverId() { 
  var coverId = Math.floor(Math.random() * COVER_COUNT)
  if (coverId in USED_BOOK_COVERS) {
    getUniqueBookCoverId()
  }
  else {
    USED_BOOK_COVERS.push(coverId)
    console.log("returned "+coverId)
    return coverId
  }

}

function getUniqueGenreCoverId() {
  var coverId = Math.floor(Math.random() * COVER_COUNT)
  if (coverId in USED_GENRE_COVERS) {
    getUniqueGenreCoverId()
  }
  else {
    USED_GENRE_COVERS.push(coverId)
    return coverId
  }

}


function generateLib() {
  var usedCovers = [Math.floor(Math.random() * COVER_COUNT)]

  for (var i = 0; i < GENRES_TYPES.length; i++) {

    miniDb.genres[i] = { genre: GENRES_TYPES[i], books: [] }
    miniDb.genres[i].books = generateBooksByGenre(GENRES_TYPES[i])

 

    miniDb.genres[i].featuredImg = getUniqueGenreCoverId() + ".jpg"

  }
}

app.listen(port)
console.log(`app started on port: ${port}`)



