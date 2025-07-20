const { app } = require('@azure/functions');
const { createUser } = require('../auth');

app.http('register', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (req, ctx) => {
    if (req.method === 'OPTIONS') return { status: 204 };
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) return { status: 400, body: 'Email and password required' };
    try {
      await createUser(email, password);
      return { status: 201, jsonBody: { message: 'User created' } };
    } catch (e) {
      return { status: 400, body: e.message };
    }
  },
}); 