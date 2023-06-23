const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080

app.use(bodyParser.json());
app.use('/', require('./routes'))
app.listen(port, function(){
    console.log('listening on 8080')
});