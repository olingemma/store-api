require("dotenv").config();
const mongoose = require("mongoose");
const connect = () => {
  mongoose.connect(process.env.MONGO_CONNECTION_STR, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
}

module.exports = connect
