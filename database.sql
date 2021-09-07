
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "brewery" (
	"id" SERIAL PRIMARY KEY,
	"brewery" VARCHAR(80),
	"location_api" VARCHAR(256)
);

CREATE TABLE "ratings" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"brewery_id" INT REFERENCES "brewery" NOT NULL,
	"beer" VARCHAR(80),
	"type" VARCHAR(25),
	"rating" DECIMAL(5,2),
	"notes" VARCHAR(256),
	"date" DATE
);