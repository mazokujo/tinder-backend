if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import express from 'express';
import mongoose from 'mongoose'
import Card from './dbCards.js'
import Cors from 'cors'
//App config
const app = express();
const port = process.env.PORT || 8001
const connection_url = process.env.DB_URL
//Middleware 
app.use(express.json())
app.use(Cors())
//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//API endpoint
app.get('/', (req, res) => res.status(200).send('Hello world'))

app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;
    Card.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
app.get('/tinder/card', (req, res) => {
    Card.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
//listener
app.listen(port, () => console.log(`listening on localhost ${port}`))
