import dotenv from "dotenv"
import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import methodOverride from "method-override"
import expressEjsLayouts from "express-ejs-layouts"
import MongoStore from "connect-mongo"
import MainRoutes from "./server/routes/main.js"
import connectDb from "./server/config/db.js"

dotenv.config()
const app = express()
connectDb()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));


app.use(express.static("public"));

//Templating Engine
app.use(expressEjsLayouts)
app.set("layout","./layouts/main");
app.set("view engine","ejs");

//route function
const mainRoutes = MainRoutes()

app.get("/",mainRoutes.root)

app.get("/about",mainRoutes.getAbout)

app.get("/contact",mainRoutes.getContact)

app.get("/post/:id",mainRoutes.getPosts)


app.post("/search",mainRoutes.search)









const port = process.env.PORT || 3019;

app.listen(port,()=>{
    console.log(`App listening on port http://localhost:${port}`)
})


