# EPFBOOK Oscar MIGEON

# EPFBOOK

EPF Book is a social network for EPF students. Students can link with other students and sign up.
There is some features that are descibed below.
This project is delivered for a school project.

## CSS

The overall central theme is EPF colors, especially the purple. There is many shades of purple.
There is also the other color of the school: the red, that appears on some text/button.
Each webpage come with an image linked with its theme.

## Features characteristics

- You can sign up and sign in 
   -> storage through csv
- There is the list of each students registered on EPFBOOK
- Features are distibuted on different web pages.
- It runs with Docker

## Docker

There is a docker images, dockerfile and dockerignore.

In the terminal,

```
docker build . -t oscarmigeon/docker-epfbook
docker images
docker run -p 49160:3000 -d oscarmigeon/docker-epfbook
```

then connect to localhost:49160

## Setup authenfication

- the username and password:
admin/admin


## Technologies Used

- JavaScript
- Node.js
- Express.js
- HTML
- CSS
- Docker
- VisualStudio
- EJS
- Excel (CSV)

## Installation

1. 

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

## Programmer

Oscar MIGEON
EPF Student

https://github.com/oscar92i