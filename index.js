import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/", async (req,res) => {
    try {
        // console.log(req.body.flags);
        var url = "https://v2.jokeapi.dev/joke/" + req.body.category;
        if (req.body.flags && (req.body.flags).length > 0) {
            if (Array.isArray(req.body.flags)){
                url += "?blacklistFlags=" + (req.body.flags).join(',');
            }
            else {
                url += "?blacklistFlags=" + req.body.flags;
            }
        }
        
        const response = await axios.get(url);
        console.log(response.data);
        res.render("index.ejs", {content: response.data});

    } catch (error) {
        console.log(error);
        res.render("index.ejs", {content: error});
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});