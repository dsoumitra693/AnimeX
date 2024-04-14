export function bitwise(str: string): number {
    let hash = 0;

    if (str.length === 0) return hash;

    for (let i = 0; i < str.length; i++) {
        const ch = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash; // Convert to 32-bit integer
    }

    return hash;
}

export function binaryTransfer(integer: number, binary?: number): string {
    binary = binary || 62;
    const stack: string[] = [];
    let num: number;
    let result = '';
    const sign = integer < 0 ? '-' : '';

    function table(num: number): string {
        const t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return t[num];
    }

    integer = Math.abs(integer);

    while (integer >= binary) {
        num = integer % binary;
        integer = Math.floor(integer / binary);
        stack.push(table(num));
    }

    if (integer > 0) {
        stack.push(table(integer));
    }

    for (let i = stack.length - 1; i >= 0; i--) {
        result += stack[i];
    }

    return sign + result;
}

export function unique(text: string): string {
    const id = binaryTransfer(bitwise(text), 61);
    return id.replace('-', 'Z');
}
