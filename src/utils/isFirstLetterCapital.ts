export function isFirstLetterCapital(str: string) {
    if (str.length === 0) {
        return false; // Handle empty string case
    }
    
    const firstLetter = str.charAt(0); // Get the first character
    return firstLetter === firstLetter.toUpperCase();
}