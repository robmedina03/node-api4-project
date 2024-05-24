const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000

app.use(cors());
app.use(express.json())

const  users = []

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.post('/api/register', (req, res) => {
    const {username, password} = req.body;
    const newUser = {id: users.length + 1, username, password}
    users.push(newUser)
    res.status(200).json(newUser)
})

app.post('/api/login', (req, res) => {
    const { username, password} = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        res.json({message: `welcome ${username} `})
    }else {
        res.status(401).json({message: ' Invalid credentials'})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})