const connectDb = require('./db');
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const dotenv = require('dotenv')
require('dotenv').config()
const multer = require('multer')
const path = require('path')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const blogRouter = require('./routes/blogs')
connectDb();
const port = 8800;

const app = express();
// app.use(cors())
app.use("*", cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname,"/uploads")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("image"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

app.use('/auth', authRouter)
app.use('/blogs', blogRouter)
app.use('/users', userRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})