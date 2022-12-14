const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
  // what is the value of req.user????
  console.log('req.user:', req.user);

  pool
    .query(`SELECT * FROM "secret" WHERE ${req.user.clearance_level}>="secret"."secrecy_level";`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
