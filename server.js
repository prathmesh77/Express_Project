const express=require("express");
const app=express();
const PORT=3000;

const friends=[
    {
     id:0,
     name:"Aarya Stark"   
    },
    {
    id:1,
    name:"Sansa Stark"   
    }
]

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
app.get('/friends',(req,res)=>{
    res.status(200).json(friends);
});

app.get('/friends/:friendId',(req,res)=>{
    const friendId=Number(req.params.friendId);
    const friend=friends[friendId];
    
    if(friend){
        res.json(friend);
    }else{
        res.status(404).json({
            error:"friend not found"
        });
    }
});

app.post('/friends',(req,res)=>{
    if(!req.body.name){
        return res.status(400).json({
            "error":"Missing friend name"
        });
    }
    const newFriend={
        name:req.body.name,
        id:friends.length
    };
    friends.push(newFriend);
    res.json(newFriend);
});

app.listen(PORT);
