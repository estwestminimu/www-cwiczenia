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
            res.status(500).json(
                {
                    "error :(": err.message
                })
        }
        if (!rows) {
            res.status(404).json(
                {
                    "message": "No users found"
                })
        }
    });

    return res.json(res)



})

//async function addUser() {

app.post("/addUser", (req, res) => {
    const { name, email } = request.body;

    //obsługa błędnych danych
    if (!name || !email) {
        req.status(404).json({ "error": "Lack of name or email. Two parameters are required" })
    }


    const sqlRequest = "INSERT INTO users (name, email) VALUES (?,?)"
    // db.all("INSERT INTO users (name, email) VALUES (?,?,)", [name, email], err

    db.run(sqlRequest, [name, email], err)
    {

        if (err) 
        {
            return res.status(500).json
            ({
                "error :(": err.message
            })
        }
        res.status(200).json
        ({
            message: "Użytkownik dodany"
        })
    }
})
//async function getUserById() {


app.get(`/getUserById`, (req, res) =>
//error idzie pierwszy
{
    const sqlRequest = "SELECT * FROM users WHERE id = ?"
    db.get(sqlRequest, [id], (err, rows) => {
        if (err) 
        {
            return res.status(500).json
            ({
                "error :(": err.message  
            })
        }
        if (!rows) 
        {
        res.status(404).json
        ({
        "message": "User of id" + id + "not found"
        })
        }
    });

    return res.status(200).json(res)
})

app.listen(port)
