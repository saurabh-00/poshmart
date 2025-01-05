const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

/* CONFIGURATIONS */
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log('Server PORT: ' + PORT));
    })
    .catch((e) => console.log(e));
