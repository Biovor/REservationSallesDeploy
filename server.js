const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const port = process.env.PORT || 5000;

routes(app);


if (process.env.NODE_ENV === 'production') {

    app
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .use("/reservation", bodyParser)
        .use(express.static(path.join(__dirname, 'client/build')))
        .get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));