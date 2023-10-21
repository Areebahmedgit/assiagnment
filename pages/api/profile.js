// In your API route for profile (api/profile.js)

import fs from 'fs';
import path from 'path';
import { getSession } from 'next-auth/react';

const profileFilePath = path.join(process.cwd(), 'data', 'profile.json');

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const profileData = JSON.parse(fs.readFileSync(profileFilePath, 'utf8'));
    return res.json(profileData);
  } else if (req.method === 'PUT') {
    const { name, imageUrl } = req.body; // Include imageUrl in the request body

    const existingData = JSON.parse(fs.readFileSync(profileFilePath, 'utf8'));
    const updatedData = { ...existingData, name, imageUrl }; // Include imageUrl in the updated data
    fs.writeFileSync(profileFilePath, JSON.stringify(updatedData, null, 2));

    return res.json({ message: 'Profile updated successfully' });
  } else if (req.method === 'DELETE') {
    // Implement your logic for deleting the user's profile
    // For example, you can reset the data in the profile.json file
    fs.writeFileSync(profileFilePath, JSON.stringify({}, null, 2));

    return res.json({ message: 'Profile deleted successfully' });
  }

  return res.status(400).json({ error: 'Invalid request method' });
}
