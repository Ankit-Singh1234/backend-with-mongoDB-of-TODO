const mongoose=require("mongoose")
const Schema=mongoose.Schema
const ObjectId=mongoose.ObjectId

//defining the Schema of User and Todo

const User=new Schema({
    // email:String,
    email:{type:String, unique:true},
    password:String,
    name:String
})

const Todo=new Schema({
    title:String,
    done:Boolean,
    userId:ObjectId
})

const UserModel=mongoose.model("users",User) // users->collection name which is in Database, User->Schema
const TodoModel=mongoose.model("todos",Todo)  //todos->collection name, Todo->Schema


// now i will expor the UserModel and TodoModel from db.js so that it is imported in the index.js file to to CRUD operation

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel

}