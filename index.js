const express = require('express');
const app = express();
app.use(express.json());
let books  =[
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1000', author: 'George ' },
    { id: 4, title: 'hey Mockingbird', author: ' Lee' },
]

app.get('/books',(req,res)=>{
    res.json(books);
})
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

app.post('/books',(req,res)=>{
    const {title,author} = req.body;
    const newBook = {
        id:books.length +1,
        title,
        author
    }
    books.push(newBook);
    res.status(201).json(newBook);
})

app.listen(3000,()=>{
    console.log("app is listen  at 3000");
})