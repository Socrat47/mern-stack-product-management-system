require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middleware/auth.js')
const authRoutes = require('./routes/auth.js')
const productRoutes = require('./routes/products.js')
const categoryRoutes = require('./routes/category.js')

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log(`MongoDB Connected Error! ${err}`))

app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/category', authMiddleware, categoryRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running! ${process.env.PORT}`)
})