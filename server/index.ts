import express from "express";
import cors from "cors";
import initializeDatabase from "./database/db";
import seedDatabase from "./database/seed";
import organizationRoutes from "./routes/organizations";
import accountRoutes from "./routes/accounts";
import dealRoutes from "./routes/deals";

const app = express();
const port = process.env.PORT || 3000;

/**
 * Welcome to the Fullstack Challenge for the Server!
 *
 * This is a basic express server.
 * You can customize and organize it to your needs.
 * Good luck!
 */
const db = initializeDatabase();

seedDatabase(db);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/organizations", organizationRoutes(db));
app.use("/accounts", accountRoutes(db));
app.use("/deals", dealRoutes(db));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
