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

   ```bash
   git clone https://github.com/oscar92i/epfbook_Oscar_MIGEON/tree/main
   ```
then

   ```bash
   npm install
   ```
then

   ```bash
   run npm dev
   ```
   or
   ```bash
   docker run -p 49160:3000 -d oscarmigeon/docker-epfbook
   ```

Your epfbook access will be on localhost:49160 if use docker or localhost:3000 if you use npm run dev.

## Rick and Morty

Set up and request in the Insomnia app:

-    Open Insomnia and create a new request.
-    Choose the HTTP method as GET.
-    Enter the URL as https://rickandmortyapi.com/api/character/5 (or replace 5 with any desired character ID).
-    Click the "Send" button in Insomnia to execute the request.

## Programmer

Oscar MIGEON
EPF Student

https://github.com/oscar92i