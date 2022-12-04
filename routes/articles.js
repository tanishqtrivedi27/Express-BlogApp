import express from "express";
import Article from './../models/article.js';
import { saveArticleAndRedirect } from "../middleware/function.js"; 

const router = express.Router()

/* CREATE A NEW ARTICLE*/
router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

/* SAVE A NEW ARTICLE */
router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

/* EDIT AN ARTICLE */
router.get('/edit/:id', async (req, res) => {
  const article = await Article.findOneAndUpdate(req.params.id)
  res.render('articles/edit', { article: article })
})

/* SAVE  AN EDITED ARTICLE */
router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

/* GET AN INDIVIDUAL ARTICLE */
router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

/* DELETE AN ARTICLE*/
router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})


export default router;