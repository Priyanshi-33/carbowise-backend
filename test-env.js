// test-env.js
import dotenv from "dotenv";

// Load the .env file explicitly from server/
dotenv.config({ path: "./.env" });

// Print debug info
console.log("==== ENV TEST START ====");
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("PORT:", process.env.PORT);
console.log("==== ENV TEST END ====");

