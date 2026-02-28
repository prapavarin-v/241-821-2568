const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2/promise');
const port = 8000;

app.use(bodyParser.json());

let users = []
let counter = 1;

let conn = null
const initDBConnection = async() => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    })
}
//path = GET /users สำหรับ get ข้อมูล user ทั้งหมด
app.get('/users',async (req,res) => {
    const results = await conn.query('SELECT * FROM users');
     res.json(results[0]);
})

// app.get('/testdb',(req,res) => {
//     mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: 'webdb',
//         port: 8821
//     }).then((conn) => {
//         conn.query('SELECT * FROM users')
//         .then((results) => {
//             res.json(results[0]);
//         }).catch((err) => {
//             console.error(err);
//             res.status(500).json({ error: 'Database query error'});
//         });
//     })
// })
//ในงานจริงไม่ได้เขียนแบบนี้

//app.get('/testdb-new', async (req, res) => {
//   try {
//       const conn = await mysql.createConnection({
//           host: 'localhost',
//           user: 'root',
//           password: 'root',
//           database: 'webdb',
//          port: 8821
//      });
//        const [results] = await conn.query('SELECT * FROM users');
//        res.json(results[0]);

//   } catch (err) {
//       console.error(err);
//        res.status(500).json({ error: 'Database query error' });
//   }
//}


// path = GET /users
//app.get('/users', (req, res) => {
//   res.json(users);
//})

//path: = GET /users/:id สำหรับดึงข้อมูล user ตาม id
app.get('/users/:id', async (req, res) => {
     try {
         let id = req.params.id;
         const results = await conn.query('SELECT * FROM users WHERE id = ?', id);
         if (results[0].length == 0) {
             throw { statusCode : 404, message: 'User not found'};
         }
         res.json(results[0][0]);
     } catch (error) {
         console.error('Error fetching user:' ,error);
         let statusCode = error.statusCode || 500;
         res.status(statusCode).json({
            message:'Error fetching user',
            error: error.message  
        });
     }
 })

// path = POST /user
// app.post('/users', async(req, res) => {
//     let user = req.body;
//     const results = await conn.query('INSERT INTO users SET ?',user);
//     console.log('results:',results);
//     res.json({
//         message: 'User created successfully',
//         data: results[0]
//     });
// })

//path: = POST /users/:id สำหรับเพิ่ม user ใหม่
 app.post('/users', async (req, res) => {
    try {
         let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user);
         res.json({
             message: 'User added successfully',
            data: results[0]
         });
    } catch (error) {
        console.error('Error inserting user:' ,error);
        res.status(500).json({ 
            message: 'Error createing user',
            error: error.message
        });
     }
 })

// path = PUT /user/:id
// app.patch('/user/:id', (req, res) => {
//     let id = req.params.id;
//     let updatedUser = req.body;
//     // user จาก id ที่ส่งมา
//     let seletedIndex = users.findIndex(user => user.id == id);
//     // อัพเดตข้อมูล user
//     if(updatedUser.name){
//         user[seletedIndex].name = updatedUser.name;
//     }

//     if(updatedUser.email){
//         user[seletedIndex].email = updatedUser.email;
//     }

//     //users[seletedIndex].name = updatedUser.name|| users[seletedIndex].name;
//     //users[seletedIndex].email = updatedUser.email|| users[seletedIndex].email;

//     //เอาข้อมูลที่ update ส่ง response กลับไป
//     res.json({message: 'User updated successfull',
//         data:{
//             user: updatedUser,
//             indexUpdated: seletedIndex
//         }
//     });
// })

//new put
//path: = PUT /users/:id สำหรับอัพเดทข้อมูล user ตาม id
app.put('/users/:id', async (req, res) => {
     try {
        let id = req.params.id;
        let updateUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser,id])
        if (results[0].affectedRows == 0) {
            throw { statusCode : 404, message: 'User not found'};
        }
        res.json({
            message: 'User updated successfully',
            data: updateUser
        })
     } catch (error) {
        console.error('Error updating user:' ,error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message:'Error updating user',
            error: error.message
         });
     }
 })


// path = DELETE /user/:id // สำหรับการลบข้อมูล
// app.delete('/user/:id', (req, res) => {
//     let id = req.params.id;
//     // หา index ที่จะลบจาก id 
//     let seletedIndex = users.findIndex(user => user.id == id);
//     // ลบ user จาก array
//     users.splice(seletedIndex, 1);

//     res.json({
//         message: 'User deleted successfully',
//         indexDeleted: seletedIndex
//     });
// })

// app.listen(port, async () => {
//     await initDBConnection();
//     console.log(`Server is running on port ${port}`)
// });

//new delete
//path: = DELETE /users/:id สำหรับลบข้อมูล user ตาม id
app.delete('/users/:id', async (req, res) => {
     try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM users WHERE id = ?', id);
        if (results[0].affectedRows == 0) {
            throw { statusCode : 404, message: 'User not found'};
        }
        res.json({
            message: 'User deleted successfully',
        });
     } catch (error) {
        console.error('Error deleting user:' ,error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message:'Error deleting user',
            error: error.message
        });
    }
})

app.listen(port, async () => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`)
});

//try new  by myself !!!
//creste database or work with AI