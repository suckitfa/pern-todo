const express = require('express')
const app = express();
const cors = require('cors')
const pool = require('./db')
// middleware
app.use(cors());
app.use(express.json())

// Routes
app.get('/',(req,res) => {
    res.end('hello world')
})

// create a todo 
app.post('/todos', async (req,res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT into todo(description) VALUES($1) RETURNING *",[description])
        res.json(newTodo.rows[0])
    } catch (err){
        console.error(err.message)
    }
})

// get all todo
app.get('/todos',async (req,res) => {
    try {
        const allTodos = await pool.query('SELECT * from todo')
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message)
    }
})
// get a todo
app.get('/todos/:id',async (req,res) => {
    try {
        const {id} = req.params
        const todo =await pool.query('SELECT * from todo WHERE todo_id=$1',[id])
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// update a todo 
app.put('/todos/:id',async (req,res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const todo =await pool.query('UPDATE todo SET description=$1 WHERE todo_id=$2',[description,id])
        res.json('updated a todo!')
    } catch (error) {
        console.error(error.message)
    }
})

// delete a todo
app.delete('/todos/:id',async (req,res) => {
    try {
        const {id} = req.params
        const deletedTodo = await pool.query("DELETE from todo WHERE todo_id=$1",[id])
        res.json('deleted!')
    } catch (error) {
        console.error(error.message)
    }
})
app.listen(3000,() => {
    console.log("server on : http://localhost:3000")
})