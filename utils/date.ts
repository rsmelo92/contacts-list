export const formatDate = (dateString: string): string => {
  let date: Date;
  
  // Handle different date formats
  if (dateString.includes('T') || dateString.includes('Z')) {
    // ISO date string or already has time component
    date = new Date(dateString);
  } else {
    // Simple date string (YYYY-MM-DD, MM/DD/YYYY, etc.)
    // Append time to ensure it's treated as UTC
    date = new Date(dateString + 'T00:00:00.000Z');
  }
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString; // Return original string if invalid date
  }
  
  const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  
  // Add ordinal suffix to day
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
};

export const formatDateForInput = (dateString: string): string => {
  let date: Date;
  
  // Handle different date formats
  if (dateString.includes('T') || dateString.includes('Z')) {
    // ISO date string or already has time component
    date = new Date(dateString);
  } else {
    // Simple date string (YYYY-MM-DD, MM/DD/YYYY, etc.)
    // Append time to ensure it's treated as UTC
    date = new Date(dateString + 'T00:00:00.000Z');
  }
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return ""; // Return empty string if invalid date
  }
  
  // Format as YYYY-MM-DD for HTML date input using UTC methods
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};
