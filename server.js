require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Database Error:', error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.json());

const studentRouter = require('./routes/student');
const adminRouter = require('./routes/admin');

app.use('/api/students', studentRouter);
app.use('/api/admin', adminRouter);



const reservationRouter = require('./routes/reservation'); 
app.use('/api/reservation', reservationRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.listen(3000, () => console.log('🚀 Server running on port 3000'));