import datetimeDifference from 'datetime-difference';

export default {
    getWaitingTime: (createdAt) => {
        const startDate = new Date(createdAt);
        const nowDate = new Date();
        const result = datetimeDifference(startDate, nowDate);
        return result;
    },
};
