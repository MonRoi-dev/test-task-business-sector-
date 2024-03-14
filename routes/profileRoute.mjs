import { Router } from "express";
import profileController from '../controllers/profileController.mjs'
import handleFileUpload from '../middlewares/fileMiddleware.mjs'

const router = Router()

router.get('/', profileController.getProfiles)
router.get('/:id', profileController.getProfile)
router.patch('/:id', handleFileUpload, profileController.updateProfile)

export default router