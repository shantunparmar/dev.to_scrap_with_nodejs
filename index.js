var http = require('http');
const axios = require('axios');
const cheerio = require('cheerio');
var express = require('express');
var fs = require('fs');
var app = express(); 
// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
// use res.render to load up an ejs view file
const url = 'https://dev.to';

axios.get(url)
	.then(response => {
		getData(response.data);
	})
	.catch(error=>{
		console.log(error);
	})

let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  $('a.crayons-story__hidden-navigation-link').each((i, elem) => {
    data.push({
      title : $(elem).text(),
      link:$(elem).attr('href')
    });

  }); 
  res.render('pages/index',data);
}

   
});

app.get('/web', function(req, res) {

	    let url = req.query.url;
console.log(url);
axios.get(url)
	.then(response => {
		getData(response.data);
	})
	.catch(error=>{
		console.log(error);
	})

let getData = html => {
  data = [];
fs.writeFile('./views/pages/web.ejs', html, function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});
//console.log(__dirname);
 res.render('pages/web');
}

   res.render('pages/web');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');
