const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/db_curd_with_node");
module.export = mongoose;