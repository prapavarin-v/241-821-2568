const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8000;

app.use(bodyParser.json());

let users = []
let counter = 1;

// path = GET /users
app.get('/users', (req, res) => {
    res.json(users);
});

// path = POST /user
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1;
    users.push(user);
    res.json({
        message: 'User added successfully',
        user: user
    });
});

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});