const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const authentication = require("./middlewares/authentication");
const AuthRoute = require("./routes/Auth");
const UserRoute = require("./routes/User");
const TweetRoute = require("./routes/Tweet");
const ReplyRoute = require("./routes/Reply");

require("./utils/MongoDB");

const app = express();
const PORT = 5000 || process.env.PORT;

dotenv.config();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    exposedHeaders: "Authorization",
  })
);

app.use("/auth", AuthRoute);

app.use(authentication);

app.use("/users", UserRoute);
app.use("/tweets", TweetRoute);
app.use("/tweets/replies", ReplyRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
