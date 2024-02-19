# Express App cheat-sheet
1.Initial project
2. install nodemon as dev dependancy
3. Install and config Express in index.js
    *npm install express
    *start initial express server
    *add static routs
    *add resource to public folder
    *add body parser
    *add routes module
4. Install and config hendlebars
    *add views folder with resources
    *add main layout and add home page
    *add home controller
    *add parcials folder
5. Install and config database
    *install mongoose and setup db connection
    *add User model
6. Register
    *fix nav links
    *add register page(controller and view)
    *fix register form
    *add post register action,add authService
    *install bcrypt and hash password
    *check comfirm password
    *check if user exist
7. Login
    *install jsonwebtoken
    *install cookie-parser
    *add cookie parser middleware
    *convert to promice base
    *add login page and fix login form
    *add login post action
    *add authService
        *validate user and password
        *generate token
    *return cookie
    *Modify register for auto login
8. Logout
9. Authorization
    *add auth middleware
    *check token
    *verify token
    *attach user to req object and res.locals
    *use middleware in express
    *add isAuth route guard
10. Error Handling
    *add notifications
    *add getMessage function
    *add error handling in register
    *add error handling in login

11. Last fix
    *dinamic nav

    





