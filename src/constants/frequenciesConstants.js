const frequencies = [
    {
        cron: '* * * * *',
        interval: 'hourly',
        label: 'Hourly'
    },
    {
        cron: '0 9 * * *',
        interval: 'daily',
        label: 'Daily'
    }
];

module.exports = {frequencies};