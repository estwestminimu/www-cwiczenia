const express = require("express");
const path = require("path");
const db = require("./db");//sciezka

const app = express();
const port = 3000;

app.use(express.json())


app.use(express.static(path.join(__dirname,  "public")))




//async function loadUsers() {
app.get(`/users`, (req, res) =>
//error idzie pierwszy
{

    db.all(`SELECT * FROM users`, (err, rows) => {
        if (err) {
            return res.status(500).json( //Błąd 1 - nic nie zwracało
                {
                    "error :(": err.message
                })
        }
        if (!rows) {
            return res.status(404).json( //Błąd 2 - nic nie zwracało
                {
                    "message": "No users found"
                })
        }
        return res.json(rows) // return był poza pętlą lol
    });




})

//async function addUser() {

app.post("/users", (req, res) => {
    const { name, email } = req.body; //request zmieniono na req

    //obsługa błędnych danych
    if (!name || !email) {
        //dodano return
        return  res.status(400).json({ "error": "Lack of name or email. Two parameters are required" })
    }


    const sqlRequest = "INSERT INTO users (name, email) VALUES (?,?)"
    // db.all("INSERT INTO users (name, email) VALUES (?,?,)", [name, email], err

    db.run(sqlRequest, [name, email], (err) => 
    {

        if (err) 
        {
            return res.status(500).json({
                "error :(": err.message
            })
        }
        return res.status(200).json({
            message: "Użytkownik dodany"
        })
    })
})
//async function getUserById() {


app.get("/users/:id", (req, res) => //braowało id
//error idzie pierwszy
{
    const { id } = req.params //bo nie bylo id w parametrze pobrany,
    const sqlRequest = "SELECT * FROM users WHERE id = ?"
    db.get(sqlRequest, [id], (err, row) => { //literowka z rows na row
        if (err) 
        {
            return res.status(500).json
            ({
                "error :(": err.message  
            })
        }
        if (!row) 
        {
        return res.status(404).json
        ({
        "message": "User of id" + id + "not found"
        })
        }
        return res.status(200).json(row) //znowu poza funkcja
    });

})

app.listen(port)
