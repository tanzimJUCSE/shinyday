const { app } = require('@azure/functions');
const { getDb } = require('../db');

app.http('getCheckinHistory', {
    methods: ['GET','OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        try {
            const db = await getDb();
            const email = request.query.get('email');
            if(!email) return {status:400, body:'email query required'};
            const history = await db.collection('checkins').find({ email }).toArray();
            return { status: 200, jsonBody: { checkins: history } };
        } catch (err) {
            context.log('DB query error', err);
            return { status: 500, body: 'Database error' };
        }
    }
}); 