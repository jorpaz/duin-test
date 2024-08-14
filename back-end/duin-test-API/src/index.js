require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentsRouter = require('./routes/studentsRoutes');
const app = express();
const port = process.env.PORT || 7000;

//middleware
app.use(cors());
app.use(express.json());
app.use('/api/v1', studentsRouter);

//Rutas
app.get('/', (req, res) => {
    res.send('API Duin Test');
});

//MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a mongo!'))
    .catch((err) => console.log(err));

app.listen(port, () => console.log(`Listening on port ${port}`));