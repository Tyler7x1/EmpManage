const express = require('express');
const userRouter = require('./Routes/router');
const { connectMongo } = require('./DBconnect')
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectMongo('mongodb://127.0.0.1:27017/user?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1');

app.use('/users', userRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Server is hosted on url: http://localhost:${port}/users`);
}).on('error', (err) => {
    console.error('Failed to start server:', err.message);
});
