export function formatLikes(likes: number): string {
    if (likes >= 1000000000) {
        return (likes / 1000000000).toFixed(1) + 'B';
    } else if (likes >= 1000000) {
        return (likes / 1000000).toFixed(1) + 'M';
    } else if (likes >= 1000) {
        return (likes / 1000).toFixed(1) + 'k';
    } else {
        return likes?.toString();
    }
}