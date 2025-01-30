const express=require("express")
const {UserModel,TodoModel}=require("./db") //import the models fron db.js
const jwt=require("jsonwebtoken")
const { default: mongoose } = require("mongoose")
const JWT_SECRET="tokenGeneratorSecret"

mongoose.connect("")


const app=express();

app.use(express.json())

app.post("/signup", async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    await UserModel.insertMany({
        email:email,
        password:password,
        name:name

    })

    res.json({
        message:"You are logged in"
    })


})

app.post("/signin",async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    //now check that the user credentials given is exist in database or not
    const user=await UserModel.findOne({
        email:email,
        password:password
    })

    console.log(user);

    if(user){
        //if user found then return to the token
        const token=jwt.sign({
            _id:user._id.toString()
        },JWT_SECRET)

        res.json({
            token
        })
    }
    else{
        res.json({
            message:"your Credentials is Invlid"
        })
    }



})

function auth(req,res,next){
    const token=req.headers.token;
    const decodedData=jwt.verify(token,JWT_SECRET);
    if(decodedData){
        req.userId=decodedData._id;
        next();
        
    }
    else{
        res.json({
            message:"You are not signed in"
        })
    }

}

app.post("/todo",auth,async (req,res)=>{//to create a todo in DB
    const title=req.body.title;
    const done=req.body.done;
    const userId=req.userId;

    //pass the token in the header
    //pass the title and done as json in body while using with postman

    await TodoModel.create({
        title:title,
        done:done,
        userId:userId
    })

    res.json({
        message:"todo is created",
        userId
    })   

})

app.get("/todos",auth,async (req,res)=>{// to get all the todos // display all the todos
    //ge thte userId of the user data you want to see
    //it is done only when the userr in signe in , if the user is signe in then it means it has the token
    //it has the token means it has the userId
    //now find the userId and prin the related data

    const userId=req.userId;
    const todos=await TodoModel.find({userId})

    res.json({
        todos
    })   
})

app.listen(3000)
