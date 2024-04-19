const unnecessaryWords = ["</i>", "<br>", "<br>", "<i>","<b>", "</b>"];

export function filterString(text: string) {
    let filteredText = text;
    unnecessaryWords.forEach(word => {
        filteredText = filteredText?.replace(new RegExp(word, 'gi'), '');
    });
    return filteredText;
}