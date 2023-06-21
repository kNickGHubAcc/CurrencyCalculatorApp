const {getCurrencies, getPairs, getConverteCurrencies, addNewPair, updatePair, deletePair} = require('../controllers/crudOperations')
const refreshTokenController = require('../controllers/refreshTokenController')
const auth = require('../middleware/authorization')
const express = require('express')

const router = express.Router()

router.get('/refresh', refreshTokenController.handleRefreshToken)
router.get('/currencies', getCurrencies)
router.get('/pairs', getPairs)
router.post('/rates', getConverteCurrencies)
router.post('/create', auth, addNewPair)
router.post('/read',auth, getPairs)
router.post('/update',auth, updatePair)   
router.delete('/delete',auth, deletePair)

module.exports = router