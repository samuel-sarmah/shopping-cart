/**
 * Sanitize user input by removing HTML tags and trimming whitespace
 * @param {string} input - The input to sanitize
 * @returns {string} - The sanitized input
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    return input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/['"\\]/g, '') // Remove potentially dangerous quotes
        .trim()
        .substring(0, 100); // Limit to 100 characters
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}