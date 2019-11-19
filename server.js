//CRUD: Create(POST), Read(GET), Update(PUT), Delete(DELETE)
const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
//example data
const users = [
{title: 'George', id: 1},
{title: 'Josh', id: 2},
{title: 'Tyler', id: 3},
{title: 'Alice', id: 4},
{title: 'Candice', id: 5}
]
//Read Request handler 23:00
//Display the message when the URL consist of '/'(what ever URL you want)
//req: from client side; res: from server side
app.get('/',(req, res) => {

  res.send("this is the rest api");

});
//Display list of users when URL consist of api users
app.get('/api/users', (req, res) =>{

  res.send(users);

});

app.get('/api/users/:id', (req, res) => {

  const user = users.find(c=> c.id === parseInt(req.params.id));
  //if no valid users
  if(!users) res.status(404).send('<h2 style="font-family:Malgun Gothic; color: darkred;">Ooops..cant find what you are looking for!</h2>');
  res.send(user);

});

app.post('api/users',(req, res)=>{


});
//Validate Information
function validateUser(user){

    const schema = {
      title: Joi.string().min(3).required()
    };
    return Joi.validate(user, schema);

    }
}

//post env variable
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
