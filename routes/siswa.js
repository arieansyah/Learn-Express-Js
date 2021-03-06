var express = require('express');
var router = express.Router();

const siswaController = require('../controller/siswaController');

/* GET home page. */
router.post('/store', siswaController.createSiswa);
router.get('/data', siswaController.dataSiswa);
router.post('/update', siswaController.updateData);
router.get('/mantap', siswaController.mantapSiswa);
router.get('/mainarray', siswaController.mainArray);
router.get('/mainarrayberkelipatan', siswaController.mainArrayBerkelipatan);
//router.put('/update:id', siswaController.updateData);

module.exports = router;
