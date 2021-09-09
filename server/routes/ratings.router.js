const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
    const sqlQuery = `
        SELECT "brewery".brewery, 
        "ratings".id,
		"ratings".beer,
		"ratings".type,
		"ratings".rating,
        "ratings".notes,
		"ratings".date
        FROM "ratings"
        JOIN "user"
            ON "ratings".user_id = "user".id
        JOIN "brewery"
            ON "ratings".brewery_id = "brewery".id;
    `;
    pool.query(sqlQuery)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get', err);
            res.sendStatus(500)
        })
});

/**
 * POST route template
 */
// router.post('/', (req, res) => {
//     // const breweryName = [req.body.brewery]
//     // const selectQuery = `
//     //     SELECT *
//     //     FROM "brewery"
//     // `
//     // const insertQuery = `
//     //     INSERT INTO "brewery" (brewery)
//     //     VALUES ($1)
//     //     RETURNING "id"
//     // `;
//     // if (breweryName !== selectQuery) {
//     //     pool.query(insertQuery, breweryName)
//     //         .then(res => {
//     //             res.sendStatus(201)
//     //         }).catch(error => {
//     //             console.log('POST route error', error)
//     //             res.sendStatus(500)
//     //         })
//     // }

//     const sqlQuery = `
//         INSERT INTO "brewery" (brewery)
//         VALUES ($1)
//         RETURNING "id"
//     `;
//     pool.query(sqlQuery, [req.body.brewery])
//         .then(res => {
//             res.sendStatus(201)
//         }).catch(error => {
//             console.log('POST route error', error)
//             //res.sendStatus(500)
//         })

// });

router.delete('/:id', (req, res) => {
    // endpoint functionality
    let sqlQuery = `
    DELETE FROM "ratings"
    WHERE id = $1
  `;

    pool.query(sqlQuery, [req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('DELETE route error', error)
            res.sendStatus(500);
        })
});

module.exports = router;