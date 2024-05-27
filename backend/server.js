import app from "./app.js";
import cloudinary from "cloudinary";


const port = process.env.PORT || 4000;

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLIENT, 
    api_key:process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUDINARY_SECRET_API 
  });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

