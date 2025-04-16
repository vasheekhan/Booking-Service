const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./src/config/serverConfig.js");
const apiRoutes = require("./src/routes/index.js");
const db=require("./src/models/index.js")
const app = express();
const settingUpAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, (req, res) => {
    console.log(`server is listening on PORT ${PORT} 🚀`);
    if(process.env.DB_SYNC){
        db.sequelize.sync({alter:true});
    }
  });
};
settingUpAndStartServer();
