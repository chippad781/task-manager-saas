const pool = require("../db/db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req,res)=>{
 const {email,password} = req.body

 const hash = await bcrypt.hash(password,10)

 const user = await pool.query(
  "INSERT INTO users(email,password) VALUES($1,$2) RETURNING *",
  [email,hash]
 )

 res.json(user.rows[0])
}

exports.login = async (req,res)=>{
 const {email,password} = req.body

 const user = await pool.query(
  "SELECT * FROM users WHERE email=$1",
  [email]
 )

 const valid = await bcrypt.compare(password,user.rows[0].password)

 if(!valid) return res.status(401).json({error:"Invalid password"})

 const token = jwt.sign({id:user.rows[0].id},"secret")

 res.json({token})
}