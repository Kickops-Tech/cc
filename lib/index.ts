/**
 * @kickops/cc
 * ----------------------------------------------------------------------
 * Credit card validation library, based on `creditcard.js`. Still aiming
 * to be simple.
 *
 * @author    Fabio Y. Goto
 * @license   MIT
 */

// #region [TYPES]

/**
 * Supported credit card flags.
 */
export type Flag =
  | 'amex'
  | 'diners'
  | 'discover'
  | 'elo'
  | 'aura'
  | 'mastercard'
  | 'visa'
  | 'jcb'
  | 'hipercard'
  | 'banescard'
  | 'maxxvan'
  | 'cabal'
  | 'goodcard'
  | 'credz'
  | 'sorocred'
  | 'personal'
  | 'valecard';

/**
 * Credit card flag list item.
 */
type FlagListItem = {
  flagName: string;
  pattern: RegExp;
  cvvLength?: number;
};

// #endregion

// #region [CONSTANTS]

/**
 * Default CVV length.
 */
const DEFAULT_CVV_LENGTH: number = 3;

/**
 * Credit card flag patterns and configurations.
 */
const FLAG_DATA_LIST: Record<Flag, FlagListItem> = {
  amex: {
    flagName: 'American Express',
    pattern: /^3[47]\d{13}$/,
    cvvLength: 4,
  },
  aura: {
    flagName: 'Aura',
    pattern: /^50\d{14,17}/,
  },
  banescard: {
    flagName: 'Banescard',
    pattern: /^(603182)[0-9]{10,12}/,
  },
  cabal: {
    flagName: 'Cabal',
    pattern: /^(604324|604330|604337|604203|604338)[0-9]{10,12}/,
  },
  credz: {
    flagName: 'Credz',
    pattern: /^636760\d{10}/,
  },
  diners: {
    flagName: 'Diners Club',
    pattern: /^3(?:0[0-5]|[68]\d)\d{11}$/,
  },
  discover: {
    flagName: 'Discover',
    pattern:
      /^6(?:011|5[0-9]{2}|4[4-9][0-9]{1}|(22(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[01][0-9]|92[0-5]$)[0-9]{10}$))[0-9]{12}$/,
    cvvLength: 4,
  },
  elo: {
    flagName: 'Elo',
    pattern:
      /^(401178|401179|431274|438935|451416|457393|457631|457632|504175|627780|636297|636368|(506699|5067[0-6]\d|50677[0-8])|(50900\d|5090[1-9]\d|509[1-9]\d{2})|65003[1-3]|(65003[5-9]|65004\d|65005[0-1])|(65040[5-9]|6504[1-3]\d)|(65048[5-9]|65049\d|6505[0-2]\d|65053[0-8])|(65054[1-9]|6505[5-8]\d|65059[0-8])|(65070\d|65071[0-8])|65072[0-7]|(6509[0-9])|(65165[2-9]|6516[6-7]\d)|(65500\d|65501\d)|(65502[1-9]|6550[3-4]\d|65505[0-8]))[0-9]{10,12}/,
  },
  goodcard: {
    flagName: 'GoodCard',
    pattern: /^(606387|605680|605674|603574)[0-9]{10,12}/,
  },
  hipercard: {
    flagName: 'Hipercard',
    pattern: /^(606282\d{10}(\d{3})?)|(3841\d{12})|(637\d{13})$/,
  },
  jcb: {
    flagName: 'JCB',
    pattern:
      /^(3(?:088|096|112|158|337|5(?:2[89]|[3-8][0-9]))(\d{12}|\d{15}))$/,
  },
  mastercard: {
    flagName: 'Mastercard',
    pattern:
      /^(603136|603689|608619|606200|603326|605919|608783|607998|603690|604891|603600|603134|608718|603680|608710|604998)|(5[1-5][0-9]{14}|2221[0-9]{12}|222[2-9][0-9]{12}|22[3-9][0-9]{13}|2[3-6][0-9]{14}|27[01][0-9]{13}|2720[0-9]{12})$/,
  },
  maxxvan: {
    flagName: 'Maxxvan',
    pattern: /^(603182)[0-9]{10,12}/,
  },
  personal: {
    flagName: 'Personal Card',
    pattern: /^636085/,
  },
  sorocred: {
    flagName: 'Sorocred',
    pattern: /^627892|^636414/,
  },
  valecard: {
    flagName: 'Valecard',
    pattern: /^606444|^606458|^606482/,
  },
  visa: {
    flagName: 'Visa',
    pattern: /^4\d{12}(?:\d{3})?$/,
  },
};

/**
 * Supported credit card flags list.
 *
 * The order of the flags is important for the detection process, since some
 * flags have patterns that are subsets of other flags.
 */
const FLAG_LIST: Array<Flag> = [
  'banescard',
  'maxxvan',
  'cabal',
  'goodcard',
  'elo',
  'diners',
  'discover',
  'amex',
  'aura',
  'mastercard',
  'visa',
  'hipercard',
  'jcb',
  'credz',
  'sorocred',
  'personal',
  'valecard',
];

/**
 * Millenium constant.
 */
const MILLENIUM = 1000;

/**
 * Predefined Mod10 values.
 */
const MODULO: Array<number> = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

// #endregion

// #region [HELPERS]

/**
 * Checks if the provided flag list is supported.
 *
 * @param flags
 *     Flags to be checked
 * @returns
 */
function areFlagsSupported(flags: Array<Flag>): boolean {
  return flags.every((f) => FLAG_LIST.includes(f));
}

/**
 * Checks if the given number's flag is supported.
 *
 * @param number
 *     Number to be checked
 * @param flags
 *     Flags to be checked
 * @returns
 */
function checkFlags(number: string, flags: Array<Flag>): boolean {
  return (
    areFlagsSupported(flags) && flags?.includes(getCardFlag(number) as Flag)
  );
}

/**
 * Checks if the given number's flag is supported.
 *
 * @param number
 *     Number to be checked
 * @param flags
 *     Flags to be checked
 * @returns
 */
function checkFlagsWhenRequired(number: string, flags?: Array<Flag>): boolean {
  return !flags || !flags?.length || checkFlags(number, flags);
}

/**
 * Validates the checksum of the given value.
 *
 * @param value
 *     Value to check
 * @returns
 */
function checkSum(value: number) {
  return value > 10 && value % 10 === 0;
}

/**
 * Calculates the checksum digit for the given value.
 *
 * @param value
 *     Value to check
 * @returns
 */
function checkSumDigit(value: number) {
  return (10 - (value % 10)) % 10;
}

/**
 * Cleans the given string by removing all non-numeric characters.
 *
 * @param value
 *     Value to be cleaned
 * @returns
 */
function clearNonNumericCharacters(value: string): string {
  return value?.replace(/[^\d]/g, '');
}

/**
 * Executes the Mod10 algorithm on the given number.
 *
 * If the `forDigit` parameter is set to `true`, the last digit of the number
 * will be ignored, as it is assumed that it is the digit to be validated.
 *
 * @param number
 *     The number to be validated
 * @param forDigit
 *     Whether to calculate the Mod10 for the whole number or just for the
 *     digits before the validation digit
 * @returns
 */
function executeMod10(number: string, forDigit?: boolean) {
  number = number?.replace(/[^\d]/g, '');
  if (forDigit) {
    number = number.substring(0, number.length - 1);
  }

  let sum: number = 0,
    digit: number,
    even: boolean = forDigit ? false : true,
    i: number = number.length;

  while (i--) {
    digit = parseInt(number[i], 10);
    even = !even;
    sum += even ? MODULO[digit] : digit;
  }

  return sum;
}

/**
 * Retrieves the flag data for the given number.
 *
 * @param number
 *     Number to be checked
 * @returns
 */
function getCard(number: string): FlagListItem | null {
  number = number?.replace(/[^\d]/g, '');
  if (!number) return null;

  const data = FLAG_LIST.find((flag) => {
    return FLAG_DATA_LIST[flag]?.pattern?.test(number);
  });

  return data ? FLAG_DATA_LIST[data] : null;
}

/**
 * Returns the flag slug/code for the given number.
 *
 * @param number
 *     Number to be checked
 * @returns
 */
function getCardFlag(number: string): Flag | false {
  for (const flag of FLAG_LIST) {
    if (FLAG_DATA_LIST[flag].pattern.test(number)) {
      return flag;
    }
  }

  return false;
}

/**
 * Formats the given year value into a full year.
 *
 * @param year
 *     Value to format
 * @returns
 */
function getFormattedYear(year?: string): number {
  if (year?.length === 2) return getMilleniumYear(`${year}`);
  return year?.length === 4 ? parseInt(`${year}`, 10) : 0;
}

/**
 * Returns the full year for the given increment, taking into account the
 * current millenium.
 *
 * Ex.:
 * - getMilleniumYear(1) => 2001;
 * - getMilleniumYear(22) => 2022;
 * - getMilleniumYear(2022) => 4022;
 *
 * @param increment
 * @returns
 */
function getMilleniumYear(increment: number | string = 0) {
  const year = parseInt(`${increment}`, 10);
  const _now = new Date();
  return Math.floor(_now.getFullYear() / MILLENIUM) * MILLENIUM + year;
}

/**
 * Checks if the given number is within the allowed length.
 *
 * @param number
 *     Number to be checked
 * @returns
 */
function hasAllowedLength(number: string): boolean {
  return !!number && number?.length <= 19;
}

/**
 * Checks if the string contains invalid characters.
 *
 * @param number
 *     Number to be checked
 * @returns
 */
function hasInvalidCharacters(number: string): boolean {
  return /[^0-9- ]/g.test(`${number}`);
}

/**
 * Checks if the string contains only repeating digits.
 *
 * @param number
 *     Number to be checked
 * @returns
 */
function isOnlyRepeatingDigits(number: string): boolean {
  return /^(\d)\1+$/.test(number);
}

/**
 * Checks if the given month is valid.
 *
 * @param month
 *     Month to be checked
 * @returns
 */
function isMonthValid(month: any): boolean {
  const __month = parseInt(month, 10);
  return !isNaN(__month) && __month >= 1 && __month <= 12;
}

/**
 * Checks if the given year is valid.
 *
 * @param year
 *     Year to be checked
 * @returns
 */
function isYearValid(year?: string): boolean {
  const __year = parseInt(`${year}`, 10);
  return !isNaN(__year) && isFullYearValid(getFormattedYear(`${year}`));
}

/**
 * Checks if the given year is valid.
 *
 * @param year
 *     Year to be checked
 * @returns
 */
function isFullYearValid(year: number): boolean {
  return year >= getMilleniumYear() && year <= getMilleniumYear(MILLENIUM);
}

/**
 * Checks if the given month and year are in a future or present date.
 *
 * @param month
 *     Month to be checked
 * @param year
 *     Year to be checked
 * @returns
 */
function isFutureOrPresentDate(month: number, year: number): boolean {
  const fullYear = getFormattedYear(`${year}`);
  const currentDate = new Date();
  const expirationDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), 1);
  expirationDate.setFullYear(fullYear, month, 1);
  return expirationDate >= currentDate;
}

// #endregion

// #region [EXPORTS]

/**
 * Retrieve the flag related to the given number, or `false` if no provider is
 * found.
 *
 * @param number
 *     Number to be checked
 * @returns
 */
export function getFlag(number: string): Flag | false {
  number = clearNonNumericCharacters(number);
  if (isOnlyRepeatingDigits(number)) return false;
  return getCardFlag(number);
}

/**
 * Retrieve the flag name related to the given number, or `false` if no provider
 * is found.
 *
 * @param number
 *     Number to be checked
 */
export function getFlagName(number: string): string | false {
  number = clearNonNumericCharacters(number);
  if (isOnlyRepeatingDigits(number)) return false;
  return getCard(number)?.flagName || false;
}

/**
 * Retrieve the flag name related to the given flag slug.
 *
 * @param flag
 *     Flag slug
 */
export function getFlagNameFromSlug(flag: Flag | string): string {
  return FLAG_DATA_LIST[flag as Flag]?.flagName || '';
}

/**
 * Configuration for the validation process.
 */
type ValidationConfig = {
  /**
   * List of allowed credit card flags.
   */
  cards?: Array<Flag>;
};

/**
 * Checks if the given number is a valid credit card number by performing the
 * Luhn algorithm and checking flag restrictions.
 *
 * @param number
 *     Number to be checked
 * @param options
 *     Validation options
 * @returns
 */
export function isValid(number: string, options: ValidationConfig = {}) {
  const { cards = [] } = options;
  const sanitizedNumber = clearNonNumericCharacters(number);
  if (
    hasInvalidCharacters(number) ||
    isOnlyRepeatingDigits(sanitizedNumber) ||
    !hasAllowedLength(number)
  ) {
    return false;
  }
  const sum = executeMod10(`${sanitizedNumber}`);
  return checkSum(sum) && checkFlagsWhenRequired(number, cards || []);
}

/**
 * Checks if the given card number's digit is valid by performing the Luhn
 * algorithm and checking flag restrictions.
 *
 * @param number
 *     Number to be checked
 * @param options
 *     Validation options
 * @returns
 */
export function isDigitValid(number: string, options: ValidationConfig = {}) {
  const { cards = [] } = options;
  const sanitizedNumber = clearNonNumericCharacters(number);
  if (
    hasInvalidCharacters(number) ||
    isOnlyRepeatingDigits(sanitizedNumber) ||
    !hasAllowedLength(number)
  ) {
    return false;
  }
  const sum = executeMod10(`${sanitizedNumber}`, true);
  return (
    checkSumDigit(sum) ===
      parseInt(sanitizedNumber[sanitizedNumber.length - 1], 10) &&
    checkFlagsWhenRequired(number, cards || [])
  );
}

/**
 * Checks if the card verification value (CVV) length is valid for the given
 * card number.
 *
 * @param number
 *     Number to be checked
 * @param cvv
 *     CVV to be checked
 * @returns
 */
export function isCvvValid(number: string, cvv: string): boolean {
  const flag = getCard(number);
  if (!flag) return false;
  const length = flag?.cvvLength || DEFAULT_CVV_LENGTH;
  return cvv?.length === length;
}

/**
 * Checks if the given expiration date is valid.
 *
 * @param month
 *     Month to check
 * @param year
 *     Year to check
 * @returns
 */
export function isExpDateValid(month?: string, year?: string): boolean {
  return (
    isMonthValid(month) &&
    isYearValid(year) &&
    isFutureOrPresentDate(parseInt(`${month}`, 10), getFormattedYear(year))
  );
}

// #endregion
