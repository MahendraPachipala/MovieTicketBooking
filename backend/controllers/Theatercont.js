import Theater from "../models/Theater.js";

export const insertTheaterdata = async(req,res)=>{
    try{
        const {name,location,availableDates,currentMovie} = req.body;
        const newTheater = new Theater({
            name,
            location,
            currentMovie,
            availableDates,
        });
        newTheater.save();
        res.status(400).json({sucess:true,message:"Theater data inserted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({sucess:false,message:"Internal Server Error"});
    }
}

export const updateMovieData = async (req, res) => {
    try {
        const { id } = req.params; 
        const { currentMovie } = req.body;
        const theater = await Theater.findById(id);
        
        if (!theater) {
            return res.status(404).json({ success: false, message: "Theater not found" });
        }

        theater.currentMovie = currentMovie;
        await theater.save(); 
        res.status(200).json({ success: true, message: "Movie data updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getAlltheaters = async (req, res) => {
    try {
        const data = await Theater.find();
        res.status(200).json({ success: true, theatersdata: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
