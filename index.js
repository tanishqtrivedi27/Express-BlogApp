import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import methodOverride from 'method-override';
import Article from './models/article.js';
import articleRouter from './routes/articles.js';


const app = express();
app.set('view engine', 'ejs')
dotenv.config();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(methodOverride('_method')) //to override method 

/* HOMEPAGE */
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

/* ROUTER */
app.use('/articles', articleRouter)


const PORT = process.env.PORT || 6001;

/* MONGO DB configuration */
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));