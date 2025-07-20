const { app } = require('@azure/functions');
const { getDb } = require('../db');

app.http('deleteMyCheckins', {
  methods: ['DELETE','OPTIONS'],
  authLevel: 'anonymous',
  handler: async (req)=>{
    if(req.method==='OPTIONS') return {status:204};
    const email = req.query.get('email');
    if(!email) return {status:400, body:'email query required'};
    const db = await getDb();
    await db.collection('checkins').deleteMany({email});
    return {status:200, body:'deleted'};
  }
}); 