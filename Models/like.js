const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    postid:{
        type: mongoose.Schema.Types.ObjectId,
         ref:'post'
    }
   

  
       
    
},
{
    timestamps: true
});

module.exports = mongoose.model('like', likeSchema);


