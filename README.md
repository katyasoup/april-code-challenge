# April Code Challenge

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

[Go v1.10](https://golang.org/doc/go1.10) 

### Install
- Download and install Go: [Golang Installation Guide](https://golang.org/doc/install)  
- Download and clone the project files: ```$ git clone https://github.com/katyasoup/april-code-challenge.git```  

### Run
- Spin it up! ```$ go run main.go types.go``` The project will be available on port 8080

## General Information
### Tech Used (and why)
- **Go (Golang)**, a language I have just started to learn and very much enjoy for its lightweight, modular, and scalable approach. I am generally more comfortable working in the backend so I wanted to challenge myself to continue building in this new language, and also learn how to integrate a frontend for a full-stack Go application. (I also use VS Code for my editor, which works beautifully with Go!)
- **Gin**, a web framework that makes http routing in Go a breeze. Cheers!
- **AngularJS**, a frontend framework that I learned at Prime, and am most comfortable working with. This project also benefits from Angular's two-way binding for quick and automatic updates between the model and view.

### Process
- **Design** decisions were made to attempt to keep the code separated into discrete, modular components. A separate route for each JSON file ensures that more data could easily be added and integrated into the existing architecture. All client-side http calls are made within main.service.js. All logic to manipulate data on the client-side is kept in main.controller.js and written in functions that are separated by concern and are reusable within the code. I tried to follow naming conventions that would clearly indicate purpose and avoid confusion.  
The UX decision to include a series of dropdown menus for selecting the variables was made with the intention of minimizing user input error.
- **Testing** - although I did not implement automated testing, I tried to ensure the correctness of my program by constantly testing in-browser in both Chrome and Firefox. During development I made liberal use of console.logs to aid in identifying where and how data was transformed, as well as the built-in debugger in VScode. I'd like to implement further error handling, especially on the front end. 

## Known Limitations & Next Steps
- The math done to convert time to relevant timezones is shaky. The Checkout template should display the correct checkout time according to the relevant company's timezone, but currently it displays the correct hour but incorrect timezone offset - always for the user's machine location (in my case, GMT-0600 (CST)). I'd like to implement Moment.js or a similar framework to better handle formatting date objects.
- I'd like to add more compelling styling, and find a better design for the custom template option
- In general, I'd like to add much more error handling on the front end, especially for user error with regard to the custom template field (for a blank entry, incorrect placeholders, etc). 
- I'd also like to implement automated tests; testing in Go and testing for frontend are both new to me!
