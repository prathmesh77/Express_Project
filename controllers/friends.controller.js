const friendsModel=require('../Models/friends.model');

function getFriends(req,res){
    res.status(200).json(friendsModel);
}

function getFriend(req,res){
    const friendId=Number(req.params.friendId);
    const friend=friendsModel[friendId];
    
    if(friend){
        res.json(friend);
    }else{
        res.status(404).json({
            error:"friend not found"
        });
    }
}

function postFriend(req,res){
    if(!req.body.name){
        return res.status(400).json({
            "error":"Missing friend name"
        });
    }
    const newFriend={
        id:friendsModel.length,
        name:req.body.name
        
    };
    friendsModel.push(newFriend);
    res.json(newFriend);
}

module.exports={
    getFriends,
    getFriend,
    postFriend
};