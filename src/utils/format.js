/**
 * Formats a number to at most 2 decimal places and uses a comma as decimal separator.
 * @param {number|string} val - The value to format
 * @returns {string} The formatted string
 */
export const formatNumber = (val) => {
    if (val === undefined || val === null || isNaN(val)) return '0';

    // Convert to number if it's a string
    const num = typeof val === 'string' ? parseFloat(val) : val;

    // Format to max 2 decimal places
    // Using Intl.NumberFormat for locale-aware formatting if needed, 
    // but here specifically requested comma as separator.
    return new Intl.NumberFormat('no-NO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(num);
};
