const { app } = require('@azure/functions');
const { getDb } = require('../db');

function toCsv(rows) {
  if (!rows.length) return '';
  const header = Object.keys(rows[0]).filter(k=>k!=='_id').join(',');
  const lines = rows.map(r => Object.keys(r).filter(k=>k!=='_id').map(k => JSON.stringify(r[k]??'')).join(','));
  return [header, ...lines].join('\n');
}

app.http('exportCsv', {
  methods: ['GET','OPTIONS'],
  authLevel: 'anonymous',
  handler: async (req)=>{
    if(req.method==='OPTIONS') return {status:204};
    const email=req.query.get('email');
    if(!email) return {status:400, body:'email required'};
    const db = await getDb();
    const docs = await db.collection('checkins').find({email}).toArray();
    const csv = toCsv(docs);
    return {
      status:200,
      body: csv,
      headers: {
        'Content-Type':'text/csv',
        'Content-Disposition':'attachment; filename="shineday.csv"'
      }
    };
  }
}); 