const jwt = require('jsonwebtoken');
const { getDb } = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

async function createUser(email, password) {
  const db = await getDb();
  const existing = await db.collection('users').findOne({ email });
  if (existing) throw new Error('User exists');
  const doc = { email, password, createdAt: new Date() };
  await db.collection('users').insertOne(doc);
  return { email };
}

async function authenticate(email, password) {
  const db = await getDb();
  const user = await db.collection('users').findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  if (user.password !== password) throw new Error('Invalid credentials');
  const token = jwt.sign({ sub: user._id.toString(), email }, JWT_SECRET, { expiresIn: '7d' });
  return token;
}

module.exports = { createUser, authenticate }; 