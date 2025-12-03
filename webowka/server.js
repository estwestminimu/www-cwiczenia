const express = require("express");
const path = require("path");
const db = require("./db");//sciezka

const app = express();
const port = 3000;

//async function loadUsers() {
app.get(`/users`, (req, res) =>
//error idzie pierwszy
{

    db.all(`SELECT * FROM users`, (err, ros) => {
        if (err) {
            res.status(500).json(
                {
                    "error :(": err.message
                })
        }
        if (!ros) {
            res.status(404).json(
                {
                    "message": "No users found"
                })
        }
    });

    return res.json(ros)



})

//async function addUser() {

//async function getUserById() {


