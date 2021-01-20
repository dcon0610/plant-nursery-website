
var express= require("express")
var router = express.Router();
const getPlants = require('../controllers');

router.get('/api/plants',getPlants.findAll)
router.get('/api/plants/one',getPlants.findOne)


module.exports = router;