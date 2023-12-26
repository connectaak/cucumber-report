export const getGidBgColor = (status) => {
    switch(status) {
        case 'passed':
            return "#4caf50";
        case 'failed':
            return "#f44336";
        case 'skipped':
            return "#0088FE";
        case 'pending':
            return "#8609F5";
        case 'undefined':
            return "#9F1090";
        default:
            return '#FFFFFF';
    }
};