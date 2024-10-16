const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,file)=>{
        res.render("index",{Files:file});
    });
})
app.get("/files/:fileName",(req,res)=>{
    fs.readFile(`./files/${req.params.fileName}`,"utf-8",(err,fileData)=>{
        res.render('show',{filename:req.params.fileName,data:fileData});
    })
})
app.get('/delete/:fileName',(req,res)=>{
    fs.unlinkSync(`./files/${req.params.fileName}`);
    res.redirect('/');
})
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.detail,(err)=>{
        console.log(err);
    });
    res.redirect('/');
})
app.listen(3000,()=>{
    console.log("app is listen  at 3000");
})