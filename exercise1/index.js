const express = require('express');
const app = express();
const PORT =   5000;

app.use(express.json());

let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 4, title: 'Moby-Dick', author: 'Herman Melville' }
]

app.get("/books",(req, res)=>{
    res.json(books)
})

app.get("/books/:id", (req, res)=>{
    const book = books.find(book => book.id == req.params.id)
    if(book){
        res.json(book)
        return
    }else{
        res.status(404).json(book)
    }
})

// post

app.post("/books",(req, res)=>{
    const newBook ={
        id: books.length +1,
        title: req.body.title,
        author: req.body.author
    }
    books.push(newBook)
    res.json(books)
})

// put
app.put("/books/:id", (req, res)=>{
    const book = books.find(book=> book.id == req.params.id)

    if( book ){ 
        book.title = req.body.title
        book.author = req.body.author
        res.json(book)
    }else{
        res.status(404).json({message: "Book not found"})
    }
})

// delete

app.delete("/books/:id", (req, res)=>{
    const book = books.filter(book=> book.id != req.params.id)
    res.send(book)
})






app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});