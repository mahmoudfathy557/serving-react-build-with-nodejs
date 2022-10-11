const router = require('express').Router()
const {
  addNewProject,
  getAllProjects,
} = require('../controllers/projectsController')

router.post('/addNewProject', addNewProject)
router.get('/getAllProjects', getAllProjects)

module.exports = router
