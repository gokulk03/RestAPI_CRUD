const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const posts = [
    { id: 1, name: 'first post' },
    { id: 2, name: 'second post' },
    { id: 3, name: 'third post' }
];

app.get('/', (req, res) => {
    res.send("This is Gokul");
});

app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) res.status(404).send('the posts with the given id is not found');
    res.send(`post is of the id ${post.id} and the ${post.name}`);
});

app.post('/api/posts', (req, res) => {
    const { error } = validatePost(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const post = {
        id: posts.length + 1,
        name: req.body.name
    };
    posts.push(post);
    res.send(posts);
});

app.get('/api/posts', (req, res) => {
    res.send(posts);
});

app.put('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) res.status(404).send('the post with the given id is not existing');

    const { error } = validatePost(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    post.name = req.body.name;
    res.send(post);
});

function validatePost(post) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(post);
}


