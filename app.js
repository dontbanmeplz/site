const express = require('express')
const bodyParser = require('body-parser')
const https = require("https"),
	fs = require("fs");
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};
const app = express()
const port = 80

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

// Routes
const newsRouter = require('./src/routes/news')

app.use('/', newsRouter)
app.use('/about', newsRouter)
app.use('/article', newsRouter)


/*app.use((req, res, next) => {
  if(req.protocol === 'http') {
    fs.appendFile('l.txt', req.headers.host, error => {
      if(error) console.log(error)
      console.log('Appended!')
    })
    res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});*/
// Listen on port 5000
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))
https.createServer(options, app).listen(443);
