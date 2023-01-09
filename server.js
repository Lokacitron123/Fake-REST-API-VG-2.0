const express = require('express');
const app = express();
const fs = require('fs');
const { send } = require('process');


app.use(express.json());

app.post('/api/users', (req, res) => {
    fs.readFile("users.json", (err, data) => {
        if (err) {
            res.status(500).send("Server failed to read from file.");
            return;
        }
        const users = JSON.parse(data);
        const newUser = req.body;
        console.log(newUser);

        if (!newUser.hasOwnProperty("firstname")) {
            res.status(404).send("Kunde inte läsa in användaren");
            return;
        } 
        newUser.id = users.length;
        if (users.filter(user => Number(user.id) === Number(newUser.id)).length > 0) {
            newUser.id = Math.floor(Math.random() * 10000);
            // newUser.id += 1;
        }
        users.push(newUser);
        fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                res.status(500).send("Server failed to write to file.")
            } else {
                res.status(200).send(users);
            }
        });
    });
})


// Här hämtar jag alla användare
app.get('/api/users', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if (err) {
            res.status(500).send("Nåt gick fel när vi försökte läsa json-filen");
            return;
        }
        const users = JSON.parse(data);
        if (!users || users.length === 0) {
            res.status(404).send("Kunde inte hitta några användare");
            return;
        }
        res.status(200).send(users);
    });
    
});

//Här hämtar jag en användare via ID
app.get('/api/users/:id', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if (err) {
            res.status(500).send("Nåt gick fel när vi försökte läsa json-filen");
            return;
        }
        // Vi hämtar parsar får JSON
        const users = JSON.parse(data);
        // Vi sätter en variabel som ska vara lika med det som kommer in i body
        const specificUser = req.params.id;
        //Om det inte finns något i body utlöses 404
        if (!specificUser) {
            res.status(404).send("Vi kunde inte hitta någon användare");
        }
        // Vi letar upp en användare som liknar den användare som skickas med i body i vår variabel specificUser
        const user = users.find(user => user.id == specificUser);
        // Vi skriver ut vilken användare det är
        res.status(200).send(user);
    })
})

// Här ändrar jag på information hos en befintlig användare genom att leta upp ID

// app.put('/api/users/:id', (req, res) => {
//     fs.readFile("users.json", (err, data) => {
//         if (err) {
//             res.status(500).send("Nåt gick fel när vi försökte läsa json-filen");
//             return;
//         }
//         const users = JSON.parse(data);
//         const userIndex = users.findIndex(user => Number(user.id) === Number(req.body.id));
//         if (userIndex === -1) {
//             res.status(404).send("Vi kunde inte hitta någon unik användare med ID: " + req.body.id);
//             return;
//         }

//         users[userIndex] = {
//             id: req.body.id,
//             firstname: req.body.firstname,
//             lastname: req.body.lastname,
//             occupation: req.body.occupation,
//             age: req.body.age
//         };

//         fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
//             if (err) {
//                 res.status(500).send("Nåt gick fel när vi försökte skriva till json-filen")
//             } else {
//                 res.status(200).send(users[userIndex]);
//             }
//         });
//     })
// })

app.put('/api/users/:id', (req, res) => {
    fs.readFile("users.json", (err, data) => {
        let users = JSON.parse(data);
        if (err) {
            res.status(500).send("Nåt gick fel när försökte läsa json-filen");
            return;
        }
        let array = users.find(arrayItem => arrayItem.id == req.params.id);

        if (!array) {
            res.status(404).send("Vi kunde inte hitta några parametrar")
            return;
        } 

            
            
            array.firstname = req.body.firstname;
            array.lastname = req.body.lastname;
            array.occupation = req.body.occupation;
            array.age = req.body.age;
           


            fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.status(404).send("Något gick fel när vi försökte strängifiera datan")
                } else {
                    res.status(200).send(array);
                }    
            });
        });
    });



app.delete('/api/users/:id', (req, res) => {
    fs.readFile("users.json", (err, data) => {
        const users = JSON.parse(data);
        const deleteUser = users.find((user) => user.id == req.params.id);
        if (err) {
            res.status(500).send("Någt gick fel när vi försökte läsa json-filen");
        } else {
            
            let index = users.indexOf(deleteUser);
        
        // console.log(deleteUser)
            if(index >= 0) {
                users.splice(index, 1);
            } else {
                res.status(404).send("Kunde inte hitta någon användare att ta bort")
                return;
            }
        }
        
       

        fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                res.status(404).send("Något gick fel när vi försökte skriva till json-filen")
            } else {
                res.status(200).send(deleteUser)
            }
        });
    });
});

app.listen(3000, () => console.log("Server is up"));