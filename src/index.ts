import { createClient, createPool, types } from "@vercel/postgres";
import express, { Request, Response }  from "express";

/*
* CONNESSIONE DB
*/
const client = createClient({
    connectionString: "postgres://default:Qa9HAS6gPIoG@ep-rapid-sun-a2ap4zrr.eu-central-1.aws.neon.tech:5432/verceldb"
})

client.connect();





/*****************************
 *  INIZIALIZZAZIONE SERVER  *
 *****************************/
const app = express();
const port = 3000
const server = express.json();

app.use(server)

/*****************************
 *  INIZIALIZZAZIONE SERVER  *
 *****************************/


// app.get("/", (req:Request, res: Response) => {
//     res.status(200).json({message: "hello world"})
// })

app.post("/posts",  (req:Request, res: Response) => {
    const response = client.query(`INSERT INTO posts(title, content) VALUES($1, $2)`,[req.body.title,req.body.content],(error,result) => {
        error ? res.status(400).json({error}) : res.status(200).json(result)})
})

app.get("/posts", (req:Request, res: Response) => { 
    const response = client.query("SELECT * FROM posts",[],(error,result) => {
        error ? res.status(400).json({error}) : res.status(200).json(result)
    })
})

app.get("/posts/:idposts", (req:Request, res: Response) => {
    const response = client.query(`SELECT * FROM posts WHERE id = $1`, [req.params.idposts], (error,result) => {
        error ? res.status(400).json({ciao: error}) : res.status(200).json(result)
    })
})

app.delete("/posts/:idposts",(req:Request, res: Response) => {
    const response =  client.query(`DELETE FROM posts WHERE id = $1`, [req.params.idposts], (error,result) => {
        error ? res.status(400).json({error}) : res.status(200).json(result)
    })
})


app.put("/posts/:idposts", (req:Request, res: Response) => {
    // const idPosts = req.params.idPosts
    // const nome = req.body.nome
    // res.status(200).json({
    //     post:idPosts,
    //     nome
    // })

})

app.patch("/posts/:idposts", (req:Request, res: Response) => {
    const idPosts = req.params.idPosts

})









/*****************************
 *  INIZIALIZZAZIONE SERVER  *
 *      su cui runnare       *
 *****************************/
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})