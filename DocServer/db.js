var mongoose = require('mongoose');  
const User = new mongoose.Schema({
  userName : {type:mongoose.Schema.Types.String,index:true ,unique:true,required:true},
  passWord : String,
  userType : {type:String,enum:['Admin','User'],default:'User'},
  lastLogin : {type:Date,required:false},
  status : {type:String,default:'Active'}
});
mongoose.model('User', User);
mongoose.connect('mongodb://localhost:27017/docMgr',{ useNewUrlParser: true },function(err){
    if(!err)console.log(mongoose.connection.readyState);
});