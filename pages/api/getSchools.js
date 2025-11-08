import { connectDB } from '@/app/lib/db';

export default async function handler(req, res) {
  const db = await connectDB();
  const [rows] = await db.execute('SELECT * FROM schools');
  res.status(200).json(rows);
}
