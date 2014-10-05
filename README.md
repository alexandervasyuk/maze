==Maze

===Problem:

Included below are the instructions for the challenge, along with markup for the coding test. Please complete and send back at your earliest convenience. Your solution will be evaluated based on the correctness, elegance, readability, and performance of your CSS, HTML, and Javascript. There is no official time limit for the coding test. Please do not post your solution in a publicly accessible location on the internet. 


Puzzle

Given the width and height values, draw a maze using javascript. (Refer to the screenshot for how it should look like)

1) There should be always a way that connects entrance to   exit where the entrance and exit are at a fixed location. 
2) The maze should be randomly generated (Which means, each time user clicks the change button, it should generate a whole new maze) 
3) Properly comment your code 
4) The width and height of each maze cell is 10 pixels 
5) You may structure your code however you like, but everything should be under a global namespace 


FAQ

1) You may use 3rd party library such as jQuery, YUI, Backbone, etc 
2) It should support all modern browsers, IE10+, latest version of Chrome and Firefox 
3) It does not have to match the image pixel for pixel 


Bonus

1) Use CSS3 
2) Object Oriented Javascript, CSS 
3) Use preprocessor: Coffeescript, Sass/Less 
4) Use framework such as Backbonejs, Emberjs, Angular 
5) Able to take large input values for width and height 
6) Draw a path that connects entrance to exit

===Solution:
A quick summary of my solution

0. Uses depth first search implemented using recursive backtracking to generate a maze.

1. Third party libraries: jQuery and D3.js

2. Uses Object Oriented Javascript.

3. Uses preprocessor Sass. 

4. Does not use Backbone.js In my experience I justify using Backbone when I have many js objects that react to user input and need to be synced with a database. I could not find a reason to apply this here. An instance where it could be used in my opinion would occur when a user wanted to click on a part of a maze and see whether it is possible to reach the end from that particular point. 

5. Is able to take larges input values.

6. Draws a path that connects entrance and exit. 