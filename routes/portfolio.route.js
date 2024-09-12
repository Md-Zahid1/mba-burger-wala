import express from 'express'
import { createPortfolio, getPortfolio, portfolioDetail, updatePortfolioById, deletePortfolioById, migratePortfolioById, getPortfolioList } from '../controllers/portfolio.controller.js'
import { isAuthenticated } from '../middlewares/auth.js'


const router = express.Router()

router.post('/create-portfolio', isAuthenticated, createPortfolio)
router.post("/update-portfolio/:id", isAuthenticated, updatePortfolioById)
router.get("/portfolio-list", getPortfolioList)
router.get("/portfolios", getPortfolio)
router.get('/portfolio-detail/:id', portfolioDetail) 
router.delete('/delete-portfolio/:id', isAuthenticated, deletePortfolioById) 
router.post('/migrat-portfolio', migratePortfolioById) 

export default router  