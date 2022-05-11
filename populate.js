require("dotenv").config()
const mongoose= require("mongoose");
const Product= require("./models/product");
const jsonProducts= require("./products.json")
const url = process.env.MONGO_CONNECTION_STR
function connectDB() {
  mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true},
     (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Connected to Mongodb...")
        }
  })
}

const start = async ()=>{
  try{
    await connectDB()
    await Product.deleteMany();
    await Product.create(jsonProducts)
    console.log("success!!!")
  }catch(err){
    console.log(err)
  }
}

start()
