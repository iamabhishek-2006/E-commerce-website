const mongoose =require("mongoose");

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected successfully");
    } catch(error){
        console.log("database connected failed: ",error);
        process.exit(1);
    }
};

module.exports={connectDB};





