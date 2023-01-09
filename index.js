const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const { User } = require('./models/User');

app.use(express.json()); //For JSON requests, application/json 분석해서 가져올수 있도록
app.use(express.urlencoded({extended: true}));//application/x-www-form-urlencoded 분석해서 가져올수 있도록




// 몽고db 연결
mongoose
    .connect('mongodb+srv://minhwan:a12345@cluster0.mi9fstm.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('안녕하세요')
})

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}!`)
})