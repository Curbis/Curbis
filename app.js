const express = require('express');
const session = require('express-session');
const app = express();
const http = require("http").Server(app);
const PORT = 8090;
const models = require("./models");

app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  })
);
app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.use('/uploads', express.static(__dirname + '/uploads')); // upload 폴더 접근 가능하게끔

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// [라우터 분리]
const indexRouter = require('./routes');
app.use('/', indexRouter);

app.get('*', (req, res) => {
    res.render('404');
});
http.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})