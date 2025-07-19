const { app } = require('@azure/functions');

const checkins = require('./dailyCheckin').checkins;

app.http('getCheckinHistory', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        return {
            status: 200,
            jsonBody: {
                checkins: checkins
            }
        };
    }
}); 