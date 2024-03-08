import app from "@/app";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(
    process.env.SERVICE_NAME + "is running on port " + process.env.PORT
  );
});
