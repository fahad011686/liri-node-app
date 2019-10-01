require('dotenv').config();
var inquirer = require("inquirer");
var keys = require("./keys.js");
// console.log(keys);

// spotify this
var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
// above and below both seem to work now
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var spotifyThis = function () {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter a song title.",
            name: "choice"
        }
    ])
        .then(function (inquirerResponse) {
            spotifySearch = inquirerResponse.choice;

            spotify.search({ type: 'track', query: spotifySearch }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log(data.tracks.items[0].name);
                console.log(data.tracks.items[0].album.artists[0].name);
                console.log("Album: " + data.tracks.items[0].album.name + " (" + (data.tracks.items[0].album.release_date.split('-'))[0] + ")");
                console.log(data.tracks.items[0].external_urls);
            });
        })
};

//movie-this
var omdbThis = function () {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter a movie title.",
            name: "choice"
        }
    ])
        .then(function (inquirerResponse) {
            movieSearch = inquirerResponse.choice;
            var axios = require("axios");
            axios.get("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    console.log(response.data.Title + " (" + response.data.Year + ")");
                    console.log("Starring: " + response.data.Actors);
                    console.log("Directed by : " + response.data.Director);
                    console.log(response.data.imdbRating + " IMDB Rating");
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

        })
};
























//concert-this
//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"






































var runLiri = function () {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which application would you like to run?",
                choices: ["Spotify-This", "OMDB-This", "Concert-This"],
                name: "app"
            }
        ])
        .then(function (choice) {
            // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
            if (choice.app == "Spotify-This") {
                spotifyThis();
            }
            else if (choice.app == "OMDB-This"){
                omdbThis();
            }
        });
}

console.log("Hi, welcome to Liri, a simple app coded by Fahad to help pull information for you based on your input. \nThere three options available: a Spotify client that will return song data (including a link to the track!), \nan OMDB client to scrape movie data, and finally a concert app to search for upcoming shows via Bands in Town. \nChoose your client below and then enter a search query when prompted!");
runLiri();