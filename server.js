const express=require("express");
const friendsController= require('./controllers/friends.controller');

const app=express();
const PORT=3000;

/**
 * Middleware for calculate response time
 */
app.use((req,res,next)=>{
    const start=Date.now();
    next();
    const delta=Date.now()-start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
});

/**
 * Middleware to parse json 
 */
app.use(express.json());

/**
 * Routes 
 */
app.get('/friends',friendsController.getFriends);
app.get('/friends/:friendId',friendsController.getFriend);
app.post('/friends',friendsController.postFriend);

app.listen(PORT);
