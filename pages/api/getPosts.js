import fs from 'fs';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const fileContents = fs.readFileSync('data/post.json', 'utf-8');
    const posts = JSON.parse(fileContents);
    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error reading posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
}