import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB")
    }).catch((error) => {
        console.log(`Error Occurred while connecting to DB ${error}`)
    })
};

// export const dbConnect = async () => {
//     try{
//        const connection = await mongoose.connect(process.env.MONGODB_URL);
//        console.log("MongoDB Connected",connection)
//     }catch(error){
//         console.log("Error While Connecting To Database",error)
//     }
// };