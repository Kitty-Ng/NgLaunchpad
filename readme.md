NG Launchpad
============

![lift off!](http://history.nasa.gov/SP-432/p0.jpg)

Overview
--------
In this guide we'll set up a very simple client-side page that will use AngularJS. You'll need familiarity with HTML, and JS.

Steps:
------
* download AngularJS (1.5)
* set up basic project JS
* set up basic project HTML
* our first 2-way bind
* our first ng-click
* our first ng-repeat
* food for thought

download AngularJS (1.5)
========================

First, you'll need to download Angular JS from ajngularjs.org. As of the time of writing, Angular 1.5 is the current, stable release:

![anguarjs.org download link](images/00-installA.png)

Make sure you download Angular 1.5 and save "angular.min.js" in a place where it'll be accessible for this project as well as future ones.

![anguarjs.org download link](images/00-installA.png)

set up basic project: JS
========================
We'll need the absolute basics to take a peek at Angular:
* 'index.html'
* 'vendors' folder with 'angular.min.js' within
* 'scripts' folder
* create 'ngLaunchpad.js' within this folder
* src these files with in index.html and make sure to source angular prior to our script (ngLaunchpad.js)
![src files](images/02-src.png)

Next we'll set up some basic HTML scaffolding. Just an input field and a P tag
![basic html setup](images/03-htmlSetup.png)

Nothing special yet, but let's start adding some AngularJS:

In ngLaunchpad.js:
------------------
We'll be using the very basics of Angular first - we'll create an app and a controller for use within this app.

Add the following:
```var myApp = angular.module( 'myApp', [] );
```

This will create an AngularJS (AKA "ng", I guess because aNGular...) app. names 'myApp'.

We'll also need to create a controller for myApp. This controller will define the scope of any variables/objects/functions/etc. and connect the scripts to our DOM. If that sounds weird, don't worry. Let's get one spun up, see how it works, the pick it apart a bit.

(AngularJS.org's documentation of ng controllers: https://docs.angularjs.org/api/ng/directive/ngController)

First, let's add the controller to our client-side script.  Add the following at the bottom of the ngLaunchpad.js file:

```javascript
myApp.controller( 'LaunchpadController', function(){
  console.log( 'NG' );
}); // end LaunchpadControler
```
A few things are happening here:
* adding a controller to myApp
* naming the controller
* injecting the $scope dependency
* console log that angular is working within our 1st controller within our first app
 
```
var myApp = angular.module( 'myApp', [] );

// add a controller to our app:
myApp.controller( 'LaunchpadController', function(){
	// log out "NG" so we know angular is loaded
  console.log( 'NG' );
}); // end LaunchpadControler
```

set up basic project HTML
=========================
Now that we've got our JS set up we'll need to hook it up to our HTML.

* add an 'ng-app' tag to the body element of your html
* this will be set to the app in our js file ('myApp' in this case)
```html
<body ng-app='myApp'>
```
By doing that we've told the page to use 'myApp' for the entire body of the HTML, which is fine for right now. Now that we've got myApp in our HTML we'll also want to add a space where the our controller will be able to do some work. Add a div in which we can put the existing input and output elements:

```html
<div ng-controller='LaunchpadController as LC'>
  <h1>NG Launchpad</h1>
  What's your favorite movie? <input type="text" name="name" value="">
  <p>Your favorite movie is:</p>
</div>
```
That "as LC" is super important. It tells the page to use the cotnroller using the name "LC" throughout. This is called "controler as" syntax and the convention is to use the initials of the controller: "LaunchpadController" uses the appropriate initials "LC".

You html file should now have an ng-app element on the body that tells the page we'll be using "myApp" throughout the body. Also, it should have a div within the body that makes use of the controller "LaunchpadController":

When you open this file now and look at the console. you should see that NG is working from:

![updated html](images/05-htmlOutputa.png)

Now that we've got Angular hooked up, let's do some magic...

our first 2-way bind
====================

Alright, let's make this baby dance...

We're going to hook up a simple 2-way bind. We've seen that we've set the body to use 'myApp' as its ng-app and we've added a div which uses 'LaunchpadController' as its ng-controller. This will allow us to use Angular within this divv and manipulate it within our controller.

First, let's do some simple 2-way binding DOM manipulation. Update your LaunchpadControler div to read as follows:

```html
<div ng-controller='LaunchpadController as LC'>
  <h1>NG Launchpad</h1>
  What's your favorite movie? <input type="text" name="name" value="" ng-model='LC.movieName'>
  <p>Your favorite movie is: {{ LC.movieName }}</p>
</div>
```

This created an 'ng-model' and bound it to our input field. Now, anything input here by the user is held in the 'movieName' model that is part of our controller -thus LC.movieName. Check out those double curly braces in the bottom p element. That is an 'Angular expression'. It allows a 'two-way bind' from that expression to the "LC.movieName" model. Save and refresh your page. You'll notice that as you type in the input field the expression is automatically updated in real time!!!
M4G1C!!!!

our first ng-click
==================
Now that we've got an ng-model to or controller named "movieName" in the div that is controlled by the controller that is in our app and we've two-way bound it to the DOM, let's add a button that will use Angular's 'ng-click' and do something with the movieName field.

* add a button to the html
* give it an ng-click tag of 'getMovieName' as a function

```html
<button ng-click='LC.getMovieName()'>Get Movie Name</button>
```

'ng-click' is an angular event much like "onClick" in vanilla JS. Here it is telling our button to run the "getMovieName" function. Let's add that function in our JS. Update the controller to read as follows:

```
myApp.controller( 'LaunchpadController', function(){
  // hold our controller in a variable
  var vm = this;
  console.log( 'NG' );
  // two-way bound function expression to get more movies
  this.getMovieName = function(){
    console.log( 'in getMovieName():', this.movieName );
  }; // end getMovieName
}); // end LaunchpadControler
```

This will create the 'getMovieName' function within the scope of our controller. You'll note that we are able to access movieName from the HTML as "LC.movieName" in the js file. Also, 'LC.getMovieName()' is used in the HTML, but 'this.getMovieName()' is used in the js file. 

'this' in javascript = 'controller as initals' in HTML

Refresh the page now and you'll see that the same functionality happens as before, but we also have that new button. Click it and you'll see that the script logs out our favorite movie. Not only is our ng-model of movieName two way bound on the DOM through input and expression, but it is also available to our controller in the js file.

our first ng-repeat
===================
OK, let's do some DOM manipulation using ng-repeat. The syntax is completely different than JQuery, but it will use a 2-way bind to an array to repeat output on the DOM automatically. We'll first start by making an array in the js file:

```
this.favoriteMovies = [];
```

This will behave like any other array so we'll push movies into it on the button click:

```  
this.getMovieName = function(){
  console.log( 'in getMovieName():', this.movieName );
  this.favoriteMovies.push( $scope.movieName );
  console.log( 'favoriteMovies:', this.favoriteMovies );
}; // end getMovieName
```

Now let's make sure this works:
![scopeArray html](images/06-scopeArray.png)

OK. So we've got an array that can be 2-way bound to the DOM... so what?

Let's put 'em in an unordered list using ng-repeat:

```
<ul>
  <li ng-repeat='movie in LC.favoriteMovies'>
    {{ movie }}
  </li>
</ul>
```

HWAAAAAAAAAT?!?!?!?! We didn't even write any new javascript?!?!!?

![scopeArray html](images/07-DOM.png)

Next Steps:
===========
* recreate this!
* can you apply it to a Node/Express project?
* could you extend this to create an array of objects instead of just strings?
* how would you ng-repeat that info?
* can you think of other ways we could use ng-repeat (buttons? divs? what else?)