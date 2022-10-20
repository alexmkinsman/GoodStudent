const express = require("express");
const htmlRoute = require("./routes/html_route");
const apiRoute = require("./routes/api_route");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


//I need to make an api route
app.use('/api', apiRoute);
// I need to make an html route
app.use('/', htmlRoute);


app.listen(PORT, () => console.log(`Listening at ${PORT}`))