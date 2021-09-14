const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const {
//     rejectUnauthenticated,
// } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    
    let sqlParams = [req.user.id]
    let sqlQuery = `
        SELECT "brewery".brewery
        FROM "ratings"
        JOIN "user"
            ON "ratings".user_id = "user".id
        JOIN "brewery"
            ON "ratings".brewery_id = "brewery".id
        WHERE user_id = $1
        GROUP BY "brewery".brewery;
`
    pool.query(sqlQuery, sqlParams)
        .then(result => {
            res.send(result.rows)
        }).catch(error => {
            console.log('GET route error', error)
            res.sendStatus(500)
        })
});

module.exports = router;