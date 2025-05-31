export const formatPhone = (phone) => {
    return `+7 (${phone.slice(2, 5)}) ${phone.slice(5, 8)} ${phone.slice(8, 10)} ${phone.slice(10)}`
}

export const formatPhoneNumberInput = (input) => {

    const digits = input.replace(/\D/g, '');
  
    let prefix = '';
    let number = digits;
  
    if (digits.startsWith('7')) {
      prefix = '+7';
      number = digits.slice(1);
    } else if (digits.startsWith('8')) {
      prefix = '8';
      number = digits.slice(1);
    } else if (digits.length > 0) {
      prefix = '+7';
      number = digits;
    }
  
    number = number.slice(0, 10);
  
    let formatted = prefix;
    if (number.length >= 1) {
      formatted += ' ' + number.slice(0, 3);
    }
    if (number.length >= 4) {
      formatted += ' ' + number.slice(3, 6);
    }
    if (number.length >= 7) {
      formatted += ' ' + number.slice(6, 8);
    }
    if (number.length >= 9) {
      formatted += ' ' + number.slice(8, 10);
    }
  
    const raw = prefix.replace('+', '') + number;
  
    return { formatted, raw };
  }