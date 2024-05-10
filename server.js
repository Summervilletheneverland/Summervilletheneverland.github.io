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
// app.post("/register_email",async(req,res)=>{
//     const {email1}=req.body;
//     const select_email1=`SELECT * FROM ACCOUNTS WHERE EMAIL='${email1}';`
//     try{
//         const result= await pool.query(select_email1)
//        console.log(result.rowCount)
//          if(result.rowCount>0){
//             res.json({row:result.rows[0]})
        
//          }
//         else{    
//           res.status(401).json({success:false,message:'Inval',data:'fhvhj'})
//         //  console.error('Invalid email or password')
//         }
//        // console.log(req.body);
//     }
//     catch(err){
//         console.log(err.message)
//     }
// })
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
app.listen(4000,()=>{
    console.log("Server on localhost: 4000");
})
 
