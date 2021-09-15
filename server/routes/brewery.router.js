const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get the brewery select from the database
router.get('/', (req, res) => {
    let sqlQuery = `
        SELECT * FROM "brewery"
        WHERE "brewery"= $1;
  `;
    pool.query(sqlQuery, [req.query.brewery])
        .then(result => {
            res.send(result.rows[0])
        }).catch(error => {
            console.log('GET route error', error)
            res.sendStatus(500)
        })
});

//Post the selected brewery to the database if the brewery doesn't already exist.
router.post('/', (req, res) => {
    const selectQuery = `
        SELECT *
        FROM "brewery"
        WHERE "brewery" = $1
    `
    pool.query(selectQuery, [req.body.brewery])
        .then(dbRes => {
            if (dbRes.rows.length === 0){
                console.log('Next line')
                const sqlQuery = `
                    INSERT INTO "brewery" (brewery)
                    VALUES ($1)
                    RETURNING "id"
                `;
                pool.query(sqlQuery, [req.body.brewery])
                    .then(dbRes => {
                        console.log('dbRes is:', dbRes)
                        dbRes.sendStatus(201)
                    }).catch(error => {
                        console.log('POST route error', error)
                        //res.sendStatus(500)
                    })
            }
            console.log('******', dbRes.rows)
            res.sendStatus(200)
        }).catch(error => {
            console.log('POST route error', error)
            //res.sendStatus(500)
        })
});

module.exports = router;