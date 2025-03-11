const express = require('express')
const app = express()

require('dotenv').config()
const cors = require('cors')

app.use(cors({
    origin: ['https://my-portfolio-11.vercel.app','http://localhost:5173', 'https://click-craft.vercel.app'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true,
}));

app.use(express.json())

const PORT = process.env.PORT || 3001;

const connectMongoDB = require("./DataBase/ConnectMongoDB")
connectMongoDB().then(()=>{
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

app.get('/', (req, res) => {
    res.send("Welcome to Click Craft")
})

const UserRouter = require("./routes/User")
app.use('/user', UserRouter);
const TemplatesRouter = require("./routes/Template")
app.use('/templates', TemplatesRouter);
