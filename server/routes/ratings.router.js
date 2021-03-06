const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//Join brewery and user table with ratings table
//Get the ratings table from the database
router.get('/', rejectUnauthenticated, (req, res) => {
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
            ON "ratings".brewery_id = "brewery".id
        WHERE user_id = $1
        ORDER BY "id" DESC;
        
    `;
    let sqlParams = [req.user.id]
    pool.query(sqlQuery, sqlParams)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get', err);
            res.sendStatus(500)
        })
});

//Post ratings from user inputs into the database
router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
        INSERT INTO "ratings" ("user_id", "brewery_id", "beer", "type", "rating", "notes")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING "id"
    `;
    pool.query(sqlQuery, 
    [
        req.body.userId,
        req.body.breweryId,
        req.body.beer,
        req.body.type,
        req.body.rating,
        req.body.notes 
    ])
        .then(dbRes => {
            dbRes.sendStatus(201)
        }).catch(error => {
            console.log('POST route error', error)
            dbRes.sendStatus(500)
        })
});

//Delete row from the database
router.delete('/:id', rejectUnauthenticated, (req, res) => {
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