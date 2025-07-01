import express from "express";
import cors from "cors";
import pool from "./db.js"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(5000, ()=>{
    console.log("server on port 5000")
})

app.get("/", (req, res)=>{
    res.send("hello world")
})