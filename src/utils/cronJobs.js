const cron = require('node-cron');
const syncAirbnb = require('../services/syncAirbnb');
const syncBooking = require('../services/syncBooking');
const Property = require('../models/Property');

cron.schedule('0 0 * * *', async () => {
    try {
        const properties = await Property.find();
        for (let property of properties) {
            await syncAirbnb(property);
            await syncBooking(property);
        }
        console.log('Синхронизация завершена');
    } catch (error) {
        console.error(`Ошибка синхронизации: ${error.message}`);
    }
});
