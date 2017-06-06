var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/noxmaDb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
var stocktraderSchema  = {
	  "funds":Number,
          "stockportfolio": [{
		             id: String,
                             name: String,
                             price: String,
                             quantity: String
                            }],
          "stocks": [{
                     "name": String,
                     "price": String
	            }]
};
// create model if not exists.
module.exports = mongoose.model('stocktrader',stocktraderSchema);
