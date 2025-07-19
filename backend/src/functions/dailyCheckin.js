const { app } = require('@azure/functions');
const { v4: uuidv4 } = require('uuid');

const checkins = [];

app.http('dailyCheckin', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const data = await request.json();
        const { mood, habits } = data;

        if (!mood || !habits) {
            return {
                status: 400,
                body: "Please provide mood and habits in the request body."
            };
        }

        const checkin = {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            mood,
            habits
        };
        
        checkins.push(checkin);
        context.log('Received check-in:', checkin);

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

module.exports.checkins = checkins;
