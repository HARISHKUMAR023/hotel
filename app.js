const path = require('path');
const fs = require('fs');
const uuid = require('uuid');


const express = require('express');
const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//static file serving

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


//requesest
app.get('/index', function (req, res) {
    res.send('<h1>welcome the website is working fine</h1>')
});
app.get('/restanet', function (req, res) {
    const filepath = path.join(__dirname, 'data', 'rec.json');
    const filedata = fs.readFileSync(filepath);
    const storedrestaurants = JSON.parse(filedata);
    res.render('restaurants', { numberofres: storedrestaurants.length, restanet: storedrestaurants });
})
//index
app.get('/', function (req, res) {
    //const htmlfilepath = path.join(__dirname, 'views', 'index.html');
    res.render('index');

})
//coform
app.get('/conform', function (req, res) {
    //const htmlfilepath = path.join(__dirname, 'views', 'confirm.html')
    //res.sendfile(htmlfilepath)
    res.render('confirm');
})
//about
app.get('/about', function (req, res) {
    res.render('about');
})
//recommend 
app.get('/recommand', function (req, res) {
    res.render('recommend');
})
//restarel-detial
app.get('/restaurants/:id', function (req, res) {
    // /resturants/r1
    const restaurantID = req.params.id;
    const filepath = path.join(__dirname, 'data', 'rec.json');
    const filedata = fs.readFileSync(filepath);
    const storedrestaurants = JSON.parse(filedata);

    for (const restaurant of storedrestaurants) {
        if (restaurant.id === restaurantID) {
            return res.render('restaurants-detial', { rid: restaurantID });
        }
    }

});
//post request
app.post('/recommand', function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const filepath = path.join(__dirname, 'data', 'rec.json');
    const filedata = fs.readFileSync(filepath);
    const storedrestaurants = JSON.parse(filedata);
    storedrestaurants.push(restaurant);
    fs.writeFileSync(filepath, JSON.stringify(storedrestaurants));
    res.redirect('/conform');


})

app.listen(3000);