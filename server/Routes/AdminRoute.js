import express from 'express'
import db from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const router=express.Router()

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Admin entry check
router.post('/adminlogin',(req,res)=>{
    const q="SELECT * FROM admin WHERE Email=? AND Password=?"
    db.query(q,[req.body.email,req.body.password],(err,result)=>{
        if(err) return res.json({loginStatus:false,Error:"Error in Query"});
        if(result.length > 0){
            const email=result[0].Email;
            const adminId = result[0].Id; 
            const token=jwt.sign({role:"admin",Email:email},
            "jwt_admin_key",{expiresIn:'1d'});
            res.cookie('token',token)
            res.cookie('id',adminId)
            return res.json({loginStatus:true});
        }else{
           return res.json({loginStatus:false,Error:"Wrong email or password"});
        }
    });
});
//Details of Category Page
router.get('/category',(req,res)=>{
    const q="SELECT * FROM category";
    db.query(q,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,Result:result})
    })
})
//Adding Category
router.post('/add_category',(req,res)=>{
    const q="INSERT INTO category(Name) VALUES(?)"
    db.query(q,[req.body.category],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true})
    })
})
//Image storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Public/Images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})
//Details of Employee Page
router.get('/employee',(req,res)=>{
    const q="SELECT * FROM employee";
    db.query(q,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,Result:result})
    })
})
//
router.get('/users',(req,res)=>{
    const q="SELECT * FROM users";
    db.query(q,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,Result:result})
    })
})

router.post('/add_employee',upload.single('image'),(req,res)=>{
    const q="INSERT INTO employee(Name,Email,Password,Salary,Address,Phone,Degree,Department,Category_id,Image) VALUES(?)";
    bcrypt.hash(req.body.password, 5,(err,hash)=>{
        if(err) return res.json({Status:false,Error:"Hash Error"})
        const val=[
            req.body.name,req.body.email,hash,req.body.salary,
            req.body.address,req.body.phone,req.body.degree,req.body.dept,
            req.body.category_id,req.file.filename
        ]
        db.query(q,[val],(err,result)=>{
            if(err) return res.json({Status:false,Error:err})
            return res.json({Status:true})
        })
    })
})
//For Attedance Page
router.post('/auth_employee',(req,res)=>{
    const q="SELECT * FROM employee WHERE Email=?"
    db.query(q,[req.body.email],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    })
})

router.get('/employee/:id',(req,res)=>{
    const id=req.params.id;
    const q="SELECT * FROM employee WHERE Id=?";
    db.query(q,[id],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    });
})
//For Attendance Page
router.post('/auth_users',(req,res)=>{
    const q="SELECT * FROM users WHERE Email=?"
    db.query(q,[req.body.email],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data}) 
    })
})

router.put('/edit_employee/:id',upload.single('image'),(req,res)=>{
    const id=req.params.id;
    const cid=req.body.category_id;
    const q1="SELECT Name FROM category WHERE Id=?"
    const q2="SELECT Image FROM employee WHERE Id=?"
    const q="UPDATE employee SET Name=?,Email=?,Salary=?,Address=?,Phone=?,Category_id=?,Image=?,Department=? WHERE Id=?";
    const val=[
     req.body.name,req.body.email,req.body.salary,
     req.body.address,req.body.phone,req.body.category_id,
     req.file.filename,
    ]
    db.query(q1,[cid],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        val.push(data[0].Name)
        db.query(q2,[id],(err,data)=>{
            if(err) return res.json({Status:false,Error:err})
            const imgPath=path.resolve(__dirname,'../Public/Images/',data[0].Image)
            fs.unlink(imgPath,(err)=>{
                if(err){
                console.log(err);
                }
                else{
                    console.log("Image deleted successfully")
                }
            })
        db.query(q,[...val,id],(err,data)=>{
            if(err) return res.json({Status:false,Error:err})
            return res.json({Status:true,Result:data})
        })
    }) 
    })
})

router.delete('/delete_employee/:id',(req,res)=>{
    const id=req.params.id;
    const q="DELETE FROM employee WHERE Id=?"
    db.query(q,[id],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    })
})

router.get('/admin_count',(req,res)=>{
    const q="SELECT COUNT(Id) AS admin FROM admin"
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    })
})

router.get('/employee_count',(req,res)=>{
    const q="SELECT COUNT(Id) AS employee FROM employee"
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    })
})

router.get('/salary_count',(req,res)=>{
    const q="SELECT SUM(Salary) AS salary FROM employee"
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    })
})

router.get('/admin_records',(req,res)=>{
    const q="SELECT * FROM admin"
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    })
})

router.get('/admin/:id',(req,res)=>{
    const id=req.params.id;
    const q="SELECT * FROM admin WHERE Id=?"
    db.query(q,[id],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    })
})

router.put('/edit_admin/:id',(req,res)=>{
    const id=req.params.id;
    const q="UPDATE admin SET Email=?,Password=? WHERE Id=?"
    const val=[req.body.email,req.body.new_password]
    db.query(q,[...val,id],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    })
})

router.post('/login_attendance',(req,res)=>{
    const q="INSERT INTO login_attendance(Emp_Name,Emp_Image,Emp_Id,Date,Time) VALUES(?)"
    const val=[req.body.name,req.body.image,req.body.eid,req.body.date,req.body.time]
    db.query(q,[val],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    })
})

router.get('/login_attendance',(req,res)=>{
    const q="SELECT * FROM login_attendance"
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})  
    })
})

router.post('/findlogin_date',(req,res)=>{
    const date=req.body.date;
    const q="SELECT * FROM login_attendance WHERE Date=?"
    db.query(q,[date],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})  
    })
})

router.post('/findlogin_id',(req,res)=>{
    const id=req.body.id;
    const q="SELECT * FROM login_attendance WHERE Emp_Id=?"
    db.query(q,[id],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})  
    })
})

router.post('/findlogin',(req,res)=>{
    const q="SELECT * FROM login_attendance WHERE Emp_Id=? AND Date=?"
    db.query(q,[req.body.id,req.body.date],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})  
    })
})

router.post('/logout_attendance',(req,res)=>{
    const q="INSERT INTO logout_attendance(Emp_Name,Emp_Image,Emp_Id,Date) VALUES(?)"
    const val=[req.body.name,req.body.image,req.body.eid,req.body.date]
    db.query(q,[val],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})
    })
})

router.get('/logoutattendance',(req,res)=>{
    const q="SELECT * FROM logout_attendance"
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})  
    })
})

router.post('/findlogout_date',(req,res)=>{
    const date=req.body.date;
    const q="SELECT * FROM logout_attendance WHERE Date=?"
    db.query(q,[date],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})  
    })
})

router.post('/findlogout_id',(req,res)=>{
    const id=req.body.id;
    const q="SELECT * FROM logout_attendance WHERE Emp_Id=?"
    db.query(q,[id],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})  
    })
})

router.post('/findlogout',(req,res)=>{
    const q="SELECT * FROM logout_attendance WHERE Emp_Id=? AND Date=?"
    db.query(q,[req.body.id,req.body.date],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})  
    })
})

router.put('/logout/:id',(req,res)=>{
    const id=req.params.id
    const q="UPDATE logout_attendance SET Time=? WHERE Emp_Id=? AND Date=?"
    db.query(q,[req.body.time,id,req.body.date],(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        res.clearCookie('token')
        return res.json({Status:true})  
    })
})

router.post("/users",(req,res)=>{
    const q = "INSERT INTO users(Name,Email,Password) VALUES(?)";
    bcrypt.hash(req.body.password, 10,(err,hash)=>{
        if(err) return res.json({Status:false,Error:"Hash Error"})
        const values = [req.body.name,req.body.email,hash];
        db.query(q,[values],(err,data)=>{
            if(err) return res.json({Status:false,Error:err})
            return res.json({Status:true,Result:data})
        });
    })
});

router.post("/userlogin",(req,res)=>{
    const q="SELECT * FROM employee WHERE Email=?";
    db.query(q,[req.body.email],(err,result)=>{
        if(err) return res.json({loginStatus:false,Error:"Error in Query"});
        if(result.length > 0){
            const user=result[0].Password;
            bcrypt.compare(req.body.password,user,(err,isMatch)=>{
                if(err){
                    return res.json({loginStatus:false,Error:"Error in Match"});
                }
                if(isMatch){
                    return res.json({loginStatus:true});
                }
                else{
                    return res.json({loginStatus:false,Error:"Invalid"});
                }
            })
        }else{
           return res.json({loginStatus:false,Error:"Wrong email or password"});
        }
    })
})

router.get('/profile/:id',(req,res)=>{
    const id=req.body.id;
    const q="SELECT * FROM profile WHERE Id=?"
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:err})
        return res.json({Status:true,Result:data})  
    })
})

router.put('/edit_profile',upload.single('image'),(req,res)=>{
    const q="UPDATE profile(Name,Address,Phone,Email,Password,Degree,Department,Emp_Image) VALUES(?)";
    bcrypt.hash(req.body.password, 5,(err,hash)=>{
        if(err) return res.json({Status:false,Error:"Hash Error"})
        const val=[
            req.body.name,req.body.address,req.body.phone,
            req.body.email,hash,req.body.degree,req.body.dept,
            req.file.filename
        ]
        db.query(q,[val],(err,result)=>{
            if(err) return res.json({Status:false,Error:err})
            return res.json({Status:true})
        })
    })
})

export {router as adminRouter}