console.log( 'js' );
// create our angular app
var myApp = angular.module( 'myApp', [] );
// add a controller to our app:
myApp.controller( 'LaunchpadController', function(){
  // hold our controller in a variable
  var vm = this;
  console.log( 'NG' );
  // // add a two-way bound array to hold movies
  // this.favoriteMovies = [];
  // // two-way bound function expression to get more movies
  // this.getMovieName = function(){
  //   console.log( 'in getMovieName():', this.movieName );
  //   // push new info into this array
  //   this.favoriteMovies.push( this.movieName );
  //   console.log( 'favoriteMovies:', this.favoriteMovies );
  // }; // end getMovieName
}); // end LaunchpadControler
