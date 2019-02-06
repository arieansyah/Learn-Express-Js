var express = require('express');
var router = express.Router();

let siswaMigration = require('../migration/siswaMigration');

router.post('/siswa', siswaMigration.create);
router.post('/siswa-index', siswaMigration.indexColumn);

//can access on browser on alter table
router.get('/last-login', siswaMigration.lastLogin);
router.get('/last-activity', siswaMigration.lastActivity);

module.exports = router;