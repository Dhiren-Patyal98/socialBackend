const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user_route = require("./Routes/user-routes");
const postRoutes = require("./Routes/post-routes")
const likeRoutes = require('./Routes/like-routes')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/uploads', express.static('uploads'));

mongoose.connect("mongodb+srv://dhirenpatyal7:superpassword@cluster0.jo0de.mongodb.net/socials").then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const port = 5000;

app.use('/api/user', user_route);

app.use('/api/posts', postRoutes);

app.use('/api/likes', likeRoutes);

app.listen(port, function () {
    console.log(`Server connected to port ${port}`);
});
