import { connectDB } from '@/app/lib/db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('🟦 Incoming request to /api/addSchool');

  const form = formidable({
    uploadDir: path.join(process.cwd(), '/public/schoolImages'),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(' Formidable error:', err);
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    console.log(' Fields:', fields);
    console.log(' Files:', files);

    const { name, address, city, state, contact, email_id } = fields;

    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    const imagePath = imageFile?.filepath
      ? `/schoolImages/${path.basename(imageFile.filepath)}`
      : null;

    try {
      const db = await connectDB();
      console.log(' Connected to DB');

      const [result] = await db.execute(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          name?.[0] || '',
          address?.[0] || '',
          city?.[0] || '',
          state?.[0] || '',
          contact?.[0] || '',
          imagePath || '',
          email_id?.[0] || '',
        ]
      );

      console.log(' Insert successful:', result);
      return res.status(200).json({ message: 'School added successfully' });
    } catch (dbError) {
      console.error(' Database error:', dbError);
      return res
        .status(500)
        .json({ message: 'Database insert failed', error: dbError.message });
    }
  });
}
