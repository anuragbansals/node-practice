// import express from 'express';
const express = require('express')
const Joi = require('joi');
const app = express();
// const cors = require('cors')

app.use(express.json());

const courses = [
    {
        id: 1,
        name: "Mathematics"
    },
    {
        id: 2,
        name: "Physics"
    },
    {
        id: 3,
        name: "Accounts"
    }
]

// app.use(cors())


app.get('/', (req, res) => {
    res.send('hello World');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send("The course with given ID is not present")
    res.send(course)
})

app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(req.body)
    console.log(result)

    if (result.error) {
        // 400 Bad Request

        res.status(400).send(result.error.details[0].message)
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
})

app.listen(3001, () => console.log('listening on port 3000'));
// app.post();
// app.put();
// app.delete();