import { formatDate, formatDateForInput } from '../date';

describe('formatDate', () => {
  it('should format a valid ISO date string correctly', () => {
    expect(formatDate('2024-01-15')).toBe('January 15th, 2024');
    expect(formatDate('2024-02-01')).toBe('February 1st, 2024');
    expect(formatDate('2024-03-02')).toBe('March 2nd, 2024');
  });

  it('should handle ISO date-time strings', () => {
    expect(formatDate('2024-01-15T10:30:00Z')).toBe('January 15th, 2024');
    expect(formatDate('2024-01-15T10:30:00.000Z')).toBe('January 15th, 2024');
  });

  it('should return original string for invalid dates', () => {
    expect(formatDate('invalid-date')).toBe('invalid-date');
    expect(formatDate('')).toBe('');
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});

describe('formatDateForInput', () => {
  it('should format a valid ISO date string for HTML date input', () => {
    expect(formatDateForInput('2024-01-15')).toBe('2024-01-15');
    expect(formatDateForInput('2024-02-01')).toBe('2024-02-01');
    expect(formatDateForInput('2024-12-31')).toBe('2024-12-31');
  });

  it('should handle ISO date-time strings and convert to YYYY-MM-DD', () => {
    expect(formatDateForInput('2024-01-15T10:30:00Z')).toBe('2024-01-15');
    expect(formatDateForInput('2024-01-15T10:30:00.000Z')).toBe('2024-01-15');
  });

  it('should handle single digit months and days', () => {
    expect(formatDateForInput('2024-01-01')).toBe('2024-01-01');
    expect(formatDateForInput('2024-02-05')).toBe('2024-02-05');
    expect(formatDateForInput('2024-12-09')).toBe('2024-12-09');
  });

  it('should return empty string for invalid dates', () => {
    expect(formatDateForInput('invalid-date')).toBe('');
    expect(formatDateForInput('')).toBe('');
    expect(formatDateForInput('not-a-date')).toBe('');
  });
}); 
