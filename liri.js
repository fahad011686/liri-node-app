require('dotenv').config();
var inquirer = require("inquirer");
var keys = require("./keys.js");
console.log(keys);

// spotify this
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: spotify.id,
    secret: spotify.secret
});

//movie-this
var axios = require("axios");
var movieSearch = "Die Hard";
axios.get("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
        // console.log(response);
    })
    .catch(function (error) {
        if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });







//concert-this
//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

