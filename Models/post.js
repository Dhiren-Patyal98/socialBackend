const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    comment:{
        type:String,
        required:true,

    },
    image: {
        type: String,
        default: '' ,
       
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('post', postSchema);


