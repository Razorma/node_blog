import mongoose from "mongoose";

export default async function connectDb(){
    try {
        mongoose.set("strictQuery",false)
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`Database connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}