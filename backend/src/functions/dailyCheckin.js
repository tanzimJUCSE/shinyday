const { app } = require('@azure/functions');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db');

app.http('dailyCheckin', {
    methods: ['POST','OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const data = await request.json();
        const { mood, habits, email } = data;
        if(!email) return {status:400, body:'email required'};

        if (!mood || !habits) {
            return {
                status: 400,
                body: "Please provide mood and habits in the request body."
            };
        }

        const checkin = {
            _id: uuidv4(),
            timestamp: new Date().toISOString(),
            mood,
            habits,
            email
        };

        try {
            const db = await getDb();
            await db.collection('checkins').insertOne(checkin);
        } catch (err) {
            context.log('DB insert error', err);
            return { status: 500, body: 'Database error' };
        }
        context.log('Stored check-in:', checkin);

        // In a real application, you would store this data in a database.
        // For this example, we'll just return the check-in data.

        return {
            status: 200,
            jsonBody: {
                message: "Check-in successful!",
                checkin: checkin
            }
        };
    }
});
