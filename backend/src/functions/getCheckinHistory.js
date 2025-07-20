const { app } = require('@azure/functions');
const { getDb } = require('../db');

app.http('getCheckinHistory', {
    methods: ['GET','OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        try {
            const db = await getDb();
            const history = await db.collection('checkins').find({}).toArray();
            return { status: 200, jsonBody: { checkins: history } };
        } catch (err) {
            context.log('DB query error', err);
            return { status: 500, body: 'Database error' };
        }
    }
}); 