export const createUnderScoreSlug = (inputString) => {
    const lowercaseString = inputString.toLowerCase();
    const words = lowercaseString.split(' ');
    const slug = words.join('_');
    return slug;
};

export const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}