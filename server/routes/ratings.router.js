const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
    
    const sqlQuery = `
        INSERT INTO "brewery" (brewery_name)
        VALUES ($1)
        RETURNING "id"
    `;
    pool.query(sqlQuery, [req.body.brewery])
        .then(res => {
            res.sendStatus(201)
        }).catch(error => {
            console.log('POST route error', error)
            res.sendStatus(500)
        })
});

module.exports = router;