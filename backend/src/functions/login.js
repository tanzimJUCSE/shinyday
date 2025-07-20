const { app } = require('@azure/functions');
const { authenticate } = require('../auth');

app.http('login', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (req) => {
    if (req.method === 'OPTIONS') return { status: 204 };
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) return { status: 400, body: 'Email and password required' };
    try {
      const token = await authenticate(email, password);
      return { status: 200, jsonBody: { token } };
    } catch (e) {
      return { status: 401, body: e.message };
    }
  },
}); 