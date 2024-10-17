const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set('views', path.join(__dirname,'views'));
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
});

app.post('/create',(req,res)=>{
    let  title = `${req.body.title.split(' ').join('')}.txt`;
    if(title==='.txt'){
        title =Math.floor(Math.random()*100)+1+'.txt';
    }
    fs.writeFile(`./files/${title}`,req.body.detail,(err)=>{
        console.log(err);
    });
    res.redirect('/');
});
app.get('/Edits/:name',(req,res)=>{
    res.render('Edits',{Filename:`${req.params.name}`});
})
app.post('/Edits',(req,res)=>{
    console.log(req.body);
    const changes  = req.body.EditText;
    const FileName = req.body.file_name;
    fs.readFile(`./files/${FileName}`, 'utf8', (err, data) => {
        if (err) {
          return console.error('Error reading file:', err);
        }
        const concatenatedData = data + " "+changes;
            fs.writeFile(`./files/${FileName}`, concatenatedData, 'utf8', (err) => {
                if (err) {
                  return console.error('Error writing to file:', err);
                }
            });
        });
    res.redirect(`/`);
})
app.listen(3000,()=>{
    console.log("app is listen  at 3000");
})