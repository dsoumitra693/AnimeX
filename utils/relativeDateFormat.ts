export function formatRelativeDate(inputDate: { year: number; month: number; day?: number }) {
    const now = new Date();
    const date = new Date(inputDate.year, inputDate.month - 1, inputDate.day || 1);
    const diff = date.getTime() - now.getTime();
    const isPast = diff < 0;

    // Use absolute value of difference for calculation
    const absDiff = Math.abs(diff);

    if (absDiff > 31536000000) { // More than 1 year
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit' }).replace(/-/g, " ");
    }

    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const timeString = (n: number, unit: string) => {
        const quantifier = n !== 1 ? 's' : '';
        return isPast ? `${n} ${unit}${quantifier} ago` : `in ${n} ${unit}${quantifier}`;
    };

    if (seconds < 60) {
        return 'Just now';
    } else if (minutes < 60) {
        return timeString(minutes, 'minute');
    } else if (hours < 24) {
        return timeString(hours, 'hour');
    } else if (days < 7) {
        return timeString(days, 'day');
    } else if (weeks < 4) {
        return timeString(weeks, 'week');
    } else if (months < 12) {
        return timeString(months, 'month');
    } else {
        return timeString(years, 'year');
    }
}
