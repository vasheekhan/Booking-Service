const express=require("express");
const {PORT}=require("./src/config/serverConfig.js")
const app=express();
app.listen(PORT,(req,res)=>{
console.log(`server is listening on PORT ${PORT} 🚀`);
})