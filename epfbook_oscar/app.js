
const express = require('express')
const port = 3000
const fs = require("fs")
const path = require('path');
const app = require('express')()
const basicAuth = require('express-basic-auth')
app.use(express.urlencoded({ extended: true }));


app.use(
  basicAuth({
    //users: { admin: "supersecret"},
    //users: { [process.env.ADMIN_USERNAME]: process.env.ADMIN_PASSWORD },
    authorizer: clearPasswordAuthorizer,
    //authorizer: encryptedPasswordAuthorizer,
    authorizeAsync: true,
    challenge: true,
}))

const encryptedPasswordAuthorizer = (username, password, cb) => {
  if (!username || !password) {
    return cb(new Error("Username or password were not defined"), false);
  }
  // Parse the CSV file: this is very similar to parsing students!
  parseCsvWithHeader("./users.csv", (err, users) => {
    // Check that our current user belong to the list
    const storedUser = users.find((possibleUser) => {
      if (!possibleUser.username) {
        console.warn(
          "Found a user with no username in users-clear.csv",
          possibleUser
        );
        return false;
      }
      // NOTE: a simple comparison with === is possible but less safe
      return basicAuth.safeCompare(possibleUser.username, username);
    });
    if (!storedUser) {
      cb(null, false);
    } else if (!storedUser.password) {
      console.warn(
        "Found a user with no password in users-clear.csv",
        storedUser
      );
      cb(null, false);
    } else {
      // now we check the password
      // bcrypt handles the fact that storedUser password is encrypted
      // it is asynchronous, because this operation is long
      // so we pass the callback as the last parameter
      bcrypt.compare(password, storedUser.password, cb);
    }
  });
};

function clearPasswordAuthorizer(username, password, cb) {
  if (!username || !password) {
    return cb(new Error("Username or password were not defined"), false);
  }
  // Parse the CSV file: this is very similar to parsing students!
  parseCsvWithHeader("./users-cleaned.csv", (err, users) => {
    // Check that our current user belong to the list
    const storedUser = users.find((possibleUser) => {
      if (!possibleUser.index1) {
        console.warn(
          "Found a user with no username in users.csv",
          possibleUser
        );
        return false;
      }
      // NOTE: a simple comparison with === is possible but less safe
      return basicAuth.safeCompare(username, possibleUser.index1);
    });

    if (!storedUser) {
      
      cb(null, false);
    } else if (!storedUser.index2) {
      console.warn(
        "Found a user with no password in users-clear.csv",
        storedUser
      );
      cb(null, false);
    } else if (!basicAuth.safeCompare(password, storedUser.index2)) {
      cb(null, false);
    } else {
      // success: user is found and have the right password
      cb(null, true);
    }
  });
}
 

function parseCsvWithHeader(filepath, cb) {
  const rowSeparator = "\n";
  const cellSeparator = ",";
  // example based on a CSV file
  fs.readFile(filepath, "utf8", (err, data) => {
    //console.log("data",data);
    const rows = data.split(rowSeparator);
    // first row is an header I isolate it
    const [headerRow, ...contentRows] = rows;
    const header = headerRow.split(cellSeparator);

    const items = contentRows.map((row) => {
      const cells = row.split(cellSeparator);
      const item = {
        index1: cells[0].replace(/\r/g, ''),
        index2: cells[1].replace(/\r/g, ''),
      };
      return item;
    });
    return cb(null, items);
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"))
})

app.get('/api/students', (req, res) => {
	res.send([{ name: "Eric Burel", school: "EPF" }, { name: "HarryPotter", school: "Poudlard"}])
})

app.get('/students-csv', (req, res) => {
  fs.readFile("users.csv", "utf8", (err, data) => {
        if (err) {
                console.error("Erreur lors de la lecture du fichier :", err);
                return res.status(500).send("Erreur lors de la lecture du fichier");
        }
  const rows = data.split("\n");

	for (let row of rows) {
		const cells = row.split(",");
		if (cells.length === 2) {
			data.push({ name: cells[0], school: cells[1] });
		}
	}
	res.send(data);
  
  })
})

app.get('/students-csv-parsed', (req, res) => {
  fs.readFile("tp2.csv", "utf8", (err, data) => {
  	if (err) {
    		console.error("Erreur lors de la lecture du fichier :", err);
    		return res.status(500).send("Erreur lors de la lecture du fichier");
  	}
  const rows = data.split("\n");
	const students = [];

	for (let row of rows) {
		const cells = row.split(",");
		if (cells.length === 2) {
			students.push({ name: cells[0], school: cells[1] });
		}
	}
	res.send(students);
  })
})

app.use(express.json());


app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});

app.post('/api/students/create', (req, res) => {
  const { name, school } = req.body;

  console.log('New student:');
  console.log('Name:', name);
  console.log('School:', school);
  
  const csvLine = `\n${name},${school}`;

  // Utiliser fs.appendFileSync pour garantir que l'opération est synchrone
  try {
    fs.appendFileSync('students.csv', csvLine);
    console.log('Nouvel étudiant ajouté:', { name, school });
    res.status(201).send('Inscription réussie');
  } catch (err) {
    console.error('Erreur lors de l\'écriture dans le fichier:', err);
    res.status(500).send('Erreur lors de l\'inscription');
  }
});


app.get("/students", (req, res) => {
  getStudentsFromCsvfile((err, students) => {
    if (err) {
      console.error(err);
      res.send("ERROR");
    }
    res.render("students", {
      students,
    });
  });
});

app.set('views', './views'); 
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const getStudentsFromCsvfile = (cb) => {
  // example based on a CSV file
  parseCsvWithHeader("./students.csv", cb);
};




app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id)+1 ; // Convertir l'ID de l'étudiant en nombre entier

  // Lire le fichier CSV
  fs.readFile('students.csv', 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier CSV :', err);
      return res.status(500).send('Erreur lors de la lecture du fichier CSV');
    }

    // Diviser les lignes du fichier CSV
    const rows = data.split('\n');

    // Vérifier si l'ID fourni est valide
    if (studentId < 0 || studentId >= rows.length) {
      return res.status(404).send('Étudiant non trouvé');
    }

    // Obtenir les données de l'étudiant à partir de la ligne correspondant à l'ID
    const studentData = rows[studentId].split(',');
    const student = { id: studentId, name: studentData[0], school: studentData[1] };
    console.log()

    // Rendre la page de l'étudiant avec ses données
    res.render('students-id.ejs', { student: student });
  });
});


app.post('/students/:id/update', (req, res) => {
  const studentId = parseInt(req.params.id); 
  const { name, school } = req.body; 
  
  fs.readFile('students.csv', 'utf8', (err, data) => {
      if (err) {
          console.error('Erreur lors de la lecture du fichier CSV :', err);
          return res.status(500).send('Erreur lors de la lecture du fichier CSV');
      }

      const rows = data.split('\n');

      if (studentId < 0 || studentId >= rows.length) {
          return res.status(404).send('Étudiant non trouvé');
      }

      const updatedStudent = `${name},${school}`;
      console.log("up data:", updatedStudent, studentId)
      rows[studentId] = updatedStudent;

      fs.writeFile('students.csv', rows.join('\n'), 'utf8', (err) => {
          if (err) {
              console.error('Erreur lors de l\'écriture dans le fichier CSV :', err);
              return res.status(500).send('Erreur lors de la mise à jour des informations de l\'étudiant');
          }
          
          res.redirect(`/students/${studentId}`);
      });
  });
});



