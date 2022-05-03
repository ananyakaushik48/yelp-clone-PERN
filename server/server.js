require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3006;
const app = express();
const db = require('./db');
// now we have access to pool.query from pg
const morgan = require('morgan');
const { rows } = require('pg/lib/defaults');

// express.json lets us access the body param of a request.
// The request body contains the data we have to store in a database
app.use(express.json())
//req res are the final stage middlewares.
// We access many middlewares to complete a request/response cycle.

// Get all restaurants
app.get('/api/v1/restaurants', async (req,res) => {
    try{
    const results = await db.query("select * from restaurants")
    console.log(results);
    res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
        restaurants: results.rows
        }
        // the rows property is storing all the db results
    })
    }catch(err){
        console.log(err);
    }
    
});
// Get one restaurant
app.get('/api/v1/restaurants/:id', async (req,res)=>{
    try {
        const results = await db.query("select * from restaurants where id = $1", [req.params.id]); 
        // you can add as many params as you want just have to map them according to the number in the main string and the index of the dependency array, like how its done in C  
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
                // we put rows[0] because this request will always return only a single value which is stored at the first index of the rows array in the server response/
            }
    })
        } catch (error) {
        console.log(error);
    }
});

// Create a Restaurant add info in the body of the payload in the http request.
app.post('/api/v1/restaurants', async (req,res) => {
    try {
    const results = await db.query("insert into restaurants (name,location,price_range) values ($1, $2, $3) returning *",[req.body.name, req.body.location, req.body.price_range])
    // the returning * at the end of the insert query returns all the data postgres just added to the database
    console.log(results)
    res.status(201).json({
        status: "success",
        data: {
            restaurant: results.rows[0]
        }
    })
    } catch (error) {
        console.log(error)
    }
});

app.put('/api/v1/restaurants/:id', async (req,res) => {
    try {
    const results = await db.query("UPDATE restaurants SET name=$1, location= $2, price_range=$3 where id=$4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id])
    console.log(results.rows[0]);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: results.rows[0]
        }
    });
    } catch (error) {
        console.log(error);
    }

    
});

app.delete('/api/v1/restaurants/:id', async (req, res) => {
    // 204 is successful delete operation response in HTTP
    try {
        const results = await db.query("delete from restaurants where id = $1 returning *", [req.params.id]);  
        console.log(results.rows[0]); // returns the deleted value.
        res.status(204).json({
        status: "success"
    });   
    } catch (error) {
        console.log(error)
    }
});


app.listen(3001, () => {
    console.log(`Listening on ${port}`)
})