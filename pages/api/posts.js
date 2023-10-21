import fs from 'fs';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'data','posts.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const rawData = fs.readFileSync(postsFilePath, 'utf8');
    const posts = JSON.parse(rawData);
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const rawData = fs.readFileSync(postsFilePath, 'utf8');
    const posts = JSON.parse(rawData);
    const newPost = { id: Date.now(), ...req.body };
    posts.push(newPost);
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
    res.status(201).json(newPost);
  } else if (req.method === 'PUT') {
    const { id, ...updatedFields } = req.body;
    const rawData = fs.readFileSync(postsFilePath, 'utf8');
    const posts = JSON.parse(rawData);
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, ...updatedFields } : post
    );
    fs.writeFileSync(postsFilePath, JSON.stringify(updatedPosts, null, 2));
    res.status(200).json({ message: 'Post updated successfully' });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    const rawData = fs.readFileSync(postsFilePath, 'utf8');
    const posts = JSON.parse(rawData);
    const updatedPosts = posts.filter((post) => post.id !== id);
    fs.writeFileSync(postsFilePath, JSON.stringify(updatedPosts, null, 2));
    res.status(200).json({ message: 'Post deleted successfully' });
  }
}

