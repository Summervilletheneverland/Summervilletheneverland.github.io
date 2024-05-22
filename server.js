const express= require("express");
const cors= require("cors");
const pool=require("./database");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const select =`SELECT * FROM ACCOUNTS WHERE EMAIL='${email}' AND PASSWORD='${password}'`
    try{
       const result= await pool.query(select)
       
         if(result.rowCount>0){
            res.json({rowCount:result.rowCount})
           // res.json({success:true,message:'Login successful'})
         }
        else{    
          res.status(401).json({success:false,message:'Invalid email or password',data:result.rows[0]})
          console.error('Invalid email or password')
        }
        console.log(req.body);
    }
    catch(err){
        console.log(err.message);
    }
})

app.post("/register",async(req,res)=>{
    const {username,email,password}=req.body;
    const select_email=`SELECT * FROM ACCOUNTS WHERE EMAIL='${email}';`
    try{
                 const result= await pool.query(select_email)
                console.log(result.rowCount)
                  if(result.rowCount==0){
                    const insert_accounts = `INSERT INTO ACCOUNTS VALUES('${username}','${email}','${password}');`
                    try{
                        const insert =await pool.query(insert_accounts).then((response1)=>{
                            console.log("Data saved");
                            res.json({rowCount:result.rowCount})
                        });
                    }
                    catch(err){
                        console.error(err.message);
                        res.json('duplicate email')
                    }
                }
                else{
                    res.json({rowCount:result.rowCount})
                }
            }
            catch(err){
                console.log(err.message)
            }  
});

app.post("/pointstable",async(req,res)=>{
    const {year}=req.body;
    console.log(year);
    if(year>2007){
        const select_points_table=`SELECT P.*,T.TEAM_NAME FROM POINTS_TABLE P NATURAL JOIN TEAMS T WHERE SEASON_ID IN (SELECT SEASON_ID FROM SEASON WHERE YEAR='${year}') ORDER BY POINTS DESC,NRR DESC;`
        const result=await pool.query(select_points_table);
        console.log(result.rows);
        res.json(result.rows);
}})

app.post("/teams",async(req,res)=>{
const team =`SELECT DISTINCT TEAM_NAME FROM TEAMS WHERE SEASON_ID='S03' ORDER BY TEAM_NAME;`
    const result = await pool.query(team);
    res.json(result.rows);
})
app.post("/teamplayers",async(req,res)=>{
    const {team_name,s_id}=req.body;
    console.log(team_name+":teamname")
    const select_player=`SELECT PLAYERS.PLAYER_NAME,AUCTION.SOLD_PRICE FROM PLAYERS NATURAL JOIN AUCTION WHERE AUCTION.SOLD_TO IN (SELECT TEAM_ID FROM TEAMS WHERE TEAM_NAME='${team_name}') AND AUCTION.SEASON_ID='${s_id}';`
    const result=await pool.query(select_player);
    console.log(result.rows);
    res.json(result.rows);
})
app.post("/admin_add", async (req, res) => {
    try {
        const p = req.body;
        console.log( `CALL ADD_PLAYER(
            '${p.name}','${p.dob}','${p.nationality}','${p.role}',
            '${p.team}',${p.year},${p.bp},${p.sp},
            ${p.runs},${p.balls},${p.innings},${p.notouts},
            ${p.fours},${p.sixes},${p.bowl_innings},${p.wickets},${p.overs},${p.dots},${p.maidens},${p.runs_given},
            ${p.runouts},${p.catches},${p.stumpings});`)
        const insert_player =`CALL ADD_PLAYER(
            '${p.name}','${p.dob}','${p.nationality}','${p.role}',
            '${p.team}',${p.year},${p.bp},${p.sp},
            ${p.runs},${p.balls},${p.innings},${p.notouts},
            ${p.fours},${p.sixes},${p.bowl_innings},${p.wickets},${p.overs},${p.dots},${p.maidens},${p.runs_given},
            ${p.runouts},${p.catches},${p.stumpings});`
        const result = await pool.query(insert_player);
        res.status(200).send('Player added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding player');
    }
});

app.listen(4000,()=>{
    console.log("Server on localhost: 4000");
})
 
