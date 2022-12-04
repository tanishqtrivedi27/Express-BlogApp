import express from "express";
import mongoose from "mongoose";
export const saveArticleAndRedirect = (path) => {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
  
      try {
        article = await article.save()
        res.redirect(`/articles/${article._id}`)
      } catch (error) {
        res.render(`articles/${path}`, { article: article })
      }
    }
}
