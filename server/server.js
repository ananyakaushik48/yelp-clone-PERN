require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3006;
const app = express();
const morgan = require('morgan');

// express.json lets us access the body param of a request.
// The request body contains the data we have to store in a database
app.use(express.json())
//req res are the final stage middlewares.
// We access many middlewares to complete a request/response cycle.

// Get all restaurants
app.get('/api/v1/restaurants', (req,res) => {
    console.log("Route Handler accessed")
    res.status(200).json({
        status: "success",
        data: {
        restaurant: ['arbys','mcdonalds','kfc']
        }
    })
});
// Get one restaurant
app.get('/api/v1/restaurants/:id', (req,res)=>{
    console.log(req.params);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "chucky cheez"
        }
    })
});

// Create a Restaurant add info in the body of the payload in the http request.
app.post('/api/v1/restaurants', (req,res) => {
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: {
            restaurant: "chucky cheez"
        }
    })
});

app.put('/api/v1/restaurants/:id', (req,res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "chucky cheez"
        }
    });
});

app.delete('/api/v1/restaurants/:id', (req, res) => {
    // 204 is successful delete operation response in HTTP
    res.status(204).json({
        status: "success"
    });
});


app.listen(3001, () => {
    console.log(`Listening on ${port}`)
})