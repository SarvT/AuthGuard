import mongoose, { connection } from "mongoose"
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log("Mongoose connected successfully");
        });
        connection.on('errors', (err)=>{
            console.log(`Mongoose error: ${err}`);
            process.exit();
        });
    } catch (error) {
        console.log("error here! ");
        console.log(error);
    }
}