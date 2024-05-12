export const createUnderScoreSlug = (inputString) => {
    const lowercaseString = inputString.toLowerCase();
    const words = lowercaseString.split(' ');
    const slug = words.join('_');
    return slug;
};