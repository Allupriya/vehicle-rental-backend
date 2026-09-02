console.log('i am the coder to this project cunt');
console.log("updated");
const path=require("path");
const http=require("http");
const swagger=require("swagger-tools");
const jsyaml=require("js-yaml");
const fs=require('fs');
const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const {verifylogintoken}=require('./middlewares/tokenverify');

require('dotenv').config();
const app=express()
app.use(cors({
    origin: "*",
    methods:["GET","POST","PATCH","DELETE"]
})
);
const serverPort=process.env.PORT || 5000;
// Middleware setup
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: true }));

//load swagger YAML file
const spec=fs.readFileSync(path.join(__dirname,"api/swagger.yaml"),"utf8");
const swaggerDoc=jsyaml.load(spec);
//swagger rpute location
const options={
    controllers: path.join(__dirname,"./api/Controller"),
    };
//healthcheck enpoint

app.get("/api/healthcheck",async(req,res)=>{
    return res.status(200).send({msg:"everthing works fine"})
})
// app.use(verifylogintoken);
swagger.initializeMiddleware(swaggerDoc, (middleware) => {
    app.use(middleware.swaggerMetadata());
    app.use(middleware.swaggerValidator());
  
    // Dynamically route requests
    app.use(verifylogintoken);
    app.use(middleware.swaggerRouter(options));
  
    // Swagger UI setup
    app.use("/api", middleware.swaggerUi());

    //start the server
    http.createServer(app).listen(serverPort, "0.0.0.0", () => {
        console.log(
          `Your server is listening on port ${serverPort} (http://localhost:${serverPort})`
        );
        console.log(
          `Swagger-ui is available on http://localhost:${serverPort}/api/docs`
        );
      });
});