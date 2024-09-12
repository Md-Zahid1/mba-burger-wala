import express from 'express'
import { category, updateCategoryById, deleteCategoryById, categoryDetail, getCategory, getCategories } from '../controllers/category.controller.js'
import { isAuthenticated } from '../middlewares/auth.js'


const router = express.Router()
router.post("/category", isAuthenticated, category)
router.post('/update-category/:id', isAuthenticated, updateCategoryById)
router.get('/list-category', getCategory)
router.get('/categories', getCategories) 
router.get('/category-info/:id', categoryDetail)
router.delete('/delete-category/:id', isAuthenticated, deleteCategoryById)

export default router 