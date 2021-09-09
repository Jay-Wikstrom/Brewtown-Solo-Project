const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let sqlQuery = `
    SELECT * FROM "brewery"
  `;
    pool.query(sqlQuery)
        .then(result => {
            console.log('GET data', result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('GET route error', error)
            res.sendStatus(500)
        })
});

router.post('/', (req, res) => {
    // const breweryName = [req.body.brewery]
    // const selectQuery = `
    //     SELECT *
    //     FROM "brewery"
    // `
    // const insertQuery = `
    //     INSERT INTO "brewery" (brewery)
    //     VALUES ($1)
    //     RETURNING "id"
    // `;
    // if (breweryName !== selectQuery) {
    //     pool.query(insertQuery, breweryName)
    //         .then(res => {
    //             res.sendStatus(201)
    //         }).catch(error => {
    //             console.log('POST route error', error)
    //             res.sendStatus(500)
    //         })
    // }

    const sqlQuery = `
        INSERT INTO "brewery" (brewery)
        VALUES ($1)
        RETURNING "id"
    `;
    pool.query(sqlQuery, [req.body.brewery])
        .then(res => {
            res.sendStatus(201)
        }).catch(error => {
            console.log('POST route error', error)
            //res.sendStatus(500)
        })

});

module.exports = router;