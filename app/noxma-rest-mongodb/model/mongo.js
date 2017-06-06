var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/noxmaDb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
var userSchema  = {
	  "uid":String,
          "token": String,
          "displayName": String,
          "photoURL": String,
          "email": String,
          "login": {
            "signin": String
          },
          "staus": String,
          "additionalUserInfo": {
			"profile":{
				"age_range":{
					"min":String
				},
				"birthday":String,
				"email":String,
				"first_name":String,
				"gender":String,
				"id":String,
				"last_name":String,
				"link":String,
				"locale":String,
				"location":{
					"id":String,
			        "name":String  
				},
				"middle_name":String,
				"name":String,
				"picture":{
				    "data":{
					    "is_silhouette":String,
						"url":String
					}
				},
				"timezone":String,
				"updated_time":String,
				"verified":String
			},
			"providerId":String
		  }
};
// create model if not exists.
module.exports = mongoose.model('user_login',userSchema);
