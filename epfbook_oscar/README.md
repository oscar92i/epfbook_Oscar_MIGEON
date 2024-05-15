# MMMDE4IN19-22-EPFBOOK-montagnon-hugo

# EPFBook

EPFBook is a social network developed as part of the Web Programming course at EPF. This project allows EPF students to share their experiences, check the latest school information, and chat with other members of the EPF community.

Here not all features are functional, but those that can be used are detailed below.

## Features

- User registration and login (via information stored in CSV files)
- Assistance form (information assigned to variables that can be stored or processed)
- Consultation of registered school students on the platform
- Functional and available assistance ChatBot to improve the user experience.
- Interactive and non-static buttons
- Clickable Instagram logo to access the EPF account

## Available Pages

- Login popup to your account, for example:

id: you

password: passw0rd$

- Home Page (endpoint "/"):

A menu to access different pages is available in the top right corner. In addition, the buttons provide access to the contact part or to the list of registered students (endpoint "/students"). Students and their information can be edited in this menu.

- Register a Student Page (endpoint "/register"):

Allows entering a name and a school. The latter will be added to the database using a POST method (and the endpoint "/api/students/create").

- About Page:

Explains the purpose of the website and points to the associated GitHub repository (endpoint "/a-propos").

## Technologies Used

- Node.js
- Express.js
- HTML
- CSS
- JavaScript
- VoiceFlow

## Installation

1. Clone the GitHub repository or download and unzip the zip:

   ```bash
   git clone https://github.com/EPF-MDE/MMMDE4IN19-22-EPFBOOK-montagnon-hugo.git
   ```


2. Install dependencies (if needed), for example:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   nodemon app.js
   ```

4. Access the application in your browser at  [http://localhost:3000](http://localhost:3000).

## Character with id 5 in the Rick and Morty API

The character with the ID number 5 in the Rick and Morty API is recognized as Jerry Smith.

This character was identified by making modifications to our app.js file within our application. Specifically, we added a new route with the following URL:

```javascript
app.get('/rickandmorty/character/:id', function (req, res) {
 axios.get(`https://rickandmortyapi.com/api/character/${req.params.id}`)
 .then(function (response) {
     res.send(response.data);
 })
 .catch(function (error) {
     console.log(error);
 });
});

Once this route was added, when the user navigates to http://localhost:3000/rickandmorty/character/5 (or replace "localhost" with the machine's IP address), our application executes a GET request to the aforementioned Rick and Morty API URL. 
Consequently, it retrieves and presents the data of the character assigned with id 5.


```

## Author

This project was developed by [Hugo Montagnon](https://github.com/hmtgn).


