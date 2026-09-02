require("dotenv").config();
const mongoose = require("mongoose");
 
let connections = {};
let timeouts = {};
let clusterConnection = {};
async function ClusterConnection() {
  try {
    clusterConnection = await mongoose.createConnection(
      process.env.MONGODB_URI,
    );
    // console.log(clusterConnection);
    console.log("Connected to MongoDB Cluster");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
// Connect to MongoDB cluster
ClusterConnection();

async function dbConnect(databaseName) {
  // Wait until the cluster connection is established
  if (!clusterConnection) {
    console.error("Cluster connection is not initialized. Reconnecting...");
    await ClusterConnection(); // Establish connection if it's not available
  }

  try {
    const db = clusterConnection.useDb(databaseName);
    console.log(`Connected to database: ${databaseName}`);

    return db;
  } catch (error) {
    console.error("Error switching to database:", error);
    return null;
  }
}

// Export the function to use it elsewhere
module.exports = dbConnect;
