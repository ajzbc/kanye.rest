const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());

var quotes = require("./quotes.json");

app.get('/', function (req, res) {
    res.send({
        quote: quotes[Math.floor(Math.random() * (quotes.length))]
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});