export const orderStatus = {
    in_delivery: 'In Delivery',
    over_delivery: 'Over Delivery',
    completed: 'Completed',
};

export function getOrderStatus(order) {
    const status = order.status === 'completed'
        ? 'completed'
        : new Date(order.deliveryTime).getTime() > new Date().getTime()
            ? 'in_delivery'
            : new Date(order.deliveryTime).getTime() < new Date().getTime()
                ? 'over_delivery'
                : orderStatus[order.status];
    return status;
}
