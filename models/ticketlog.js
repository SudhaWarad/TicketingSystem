var restful = require('node-restful');
var mongoose = restful.mongoose;


var ticketSchema =  new mongoose.Schema({
	          repComments: String,
            status: String,
            assignTo: String,
            area: String,
            customerInfo: {
                name: String,
                address: String,
                phNo: Number,
                custComments: String
             }
    });


/*var ticketSchema =  new mongoose.Schema({
     tickets : {
      type: Array,
      items: {
        type: Object,
        properties: {
          ticketNo: type:  String
          repComments: String
          status : String
          assignTo : String
          area: String
          customerInfo: {
            type: object,
            properties: {
              name : String
              address : String
              phNo : String
              custComments: String
              }
            }
           }
        }

       }
});
*/

module.exports = restful.model('',ticketSchema);
