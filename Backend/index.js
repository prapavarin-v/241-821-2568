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
app.get('/users', (req, res) => {
    res.json(users);
})

// path = POST /user
app.post('/users', async(req, res) => {
    let user = req.body;
    const results = await conn.query('INSERT INTO users SET ?',user);
    console.log('results:',results);
    res.json({
        message: 'User created successfully',
        data: results[0]
    });
})

// path = PUT /user/:id
app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;

    let seletedIndex = users.findIndex(user.id == id);

    if(updatedUser.name){
        user[seletedIndex].name = updatedUser.name;
    }

    if(updatedUser.email){
        user[seletedIndex].email = updatedUser.email;
    }

    users[seletedIndex].name = updatedUser.name|| users[seletedIndex].name;
    users[seletedIndex].email = updatedUser.email|| users[seletedIndex].email;

    res.json({
        message: 'User updated successfull',
        data:{
            user: updatedUser,
            indexUpdated: seletedIndex
        }
    })
});

app.delete('/user/:id',(req, res) => {
    let seletedIndex = users.findIndex(user => user.id == id);
    users.splice(seletedIndex,1);

    res.json({
        message: 'User deleted successfull',
            indexDeleted: seletedIndex
    });
})

app.listen(port, async () => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`)
});