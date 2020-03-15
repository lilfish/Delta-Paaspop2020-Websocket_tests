const path = require('path');
const express = require('express');
const vueRenderer = require('@doweb/vuexpress').vueRenderer;

const app = express();

let options = {
  views: './views',
  cache: false,
  watch: true,
  onError: (err) => {
    console.log(err)
  },
  onReady: () => {
    console.log('Ready')
  }
};


const renderer = vueRenderer(options);
app.use(renderer);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('example', {myVar: 'Hello World!'});
});

app.get('/plain', function(req, res) {
    // render template without html head and body
    res.render('example', { myVar1: 'my variable one' }, { plain: true, inlineCSS: false });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});