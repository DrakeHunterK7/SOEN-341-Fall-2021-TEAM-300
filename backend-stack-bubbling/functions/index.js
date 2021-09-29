// Email:       SOEN341T300@Gmail.com
// Password:    Soen_341_T_300

const functions = require("firebase-functions");
const admin = require("firebase-admin")

admin.initializeApp();

const express = require("express");
const app = express();

app.get("/Questions", (req, res) => {
    admin.firestore().collection("Questions")
        .get()
        .then(data => {
            let questions = [];
            data.forEach(doc => {
                questions.push(doc.data())
            }
            );
            return res.json(questions)
        })
        .catch((err) => console.error(err));
});

app.post("/Questions", (req, res) => {
    const newQuestion = {
        Title: req.body.Title,
        Description: req.body.Description
    };
    admin.firestore()
        .collection("Questions")
        .add(newQuestion)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully` })
        })
        .catch(err => {
            res.status(500).json({ error: "Something was wrong" })
            console.error(err)
        });
});

exports.api = functions.https.onRequest(app)
