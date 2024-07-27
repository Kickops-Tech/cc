import { Flag } from '~';

/**
 * Test card data.
 */
type TestCard = {
  flag: Flag;
  flagName: string;
  number: string;
  cvv: string;
};

/**
 * List of valid test cards, sourced from the official credit card companies,
 * providers, gateways and banks.
 */
export const TEST_CARD_LIST: Array<TestCard> = [
  {
    flag: 'amex',
    flagName: 'American Express',
    number: '374245455400126',
    cvv: '4298',
  },
  {
    flag: 'amex',
    flagName: 'American Express',
    number: '374245455400126',
    cvv: '8929',
  },
  {
    flag: 'amex',
    flagName: 'American Express',
    number: '371341553758128',
    cvv: '1938',
  },
  {
    flag: 'amex',
    flagName: 'American Express',
    number: '374245455400126',
    cvv: '7499',
  },
  {
    flag: 'aura',
    flagName: 'Aura',
    number: '5078601870000127985',
    cvv: '542',
  },
  {
    flag: 'banescard',
    flagName: 'Banescard',
    number: '6031828795629272',
    cvv: '838',
  },
  {
    flag: 'cabal',
    flagName: 'Cabal',
    number: '6042034400069940',
    cvv: '112',
  },
  {
    flag: 'credz',
    flagName: 'Credz',
    number: '6367600001405019',
    cvv: '192',
  },
  {
    flag: 'diners',
    flagName: 'Diners Club',
    number: '30569309025904',
    cvv: '422',
  },
  {
    flag: 'diners',
    flagName: 'Diners Club',
    number: '36490101441625',
    cvv: '839',
  },
  {
    flag: 'discover',
    flagName: 'Discover',
    number: '6011000991300009',
    cvv: '4221',
  },
  {
    flag: 'elo',
    flagName: 'Elo',
    number: '6362970000457013',
    cvv: '131',
  },
  {
    flag: 'elo',
    flagName: 'Elo',
    number: '4389351648020055',
    cvv: '129',
  },
  {
    flag: 'goodcard',
    flagName: 'GoodCard',
    number: '6035740358546874',
    cvv: '555',
  },
  {
    flag: 'hipercard',
    flagName: 'Hipercard',
    number: '6062826786276634',
    cvv: '729',
  },
  {
    flag: 'hipercard',
    flagName: 'Hipercard',
    number: '6062825624254001',
    cvv: '899',
  },
  {
    flag: 'hipercard',
    flagName: 'Hipercard',
    number: '6370950847866501',
    cvv: '131',
  },
  {
    flag: 'jcb',
    flagName: 'JCB',
    number: '3566000020000410',
    cvv: '524',
  },
  {
    flag: 'jcb',
    flagName: 'JCB',
    number: '3569990012290937',
    cvv: '644',
  },
  {
    flag: 'jcb',
    flagName: 'JCB',
    number: '3572000100200142753',
    cvv: '752',
  },
  {
    flag: 'mastercard',
    flagName: 'Mastercard',
    number: '5425233430109903',
    cvv: '422',
  },
  {
    flag: 'mastercard',
    flagName: 'Mastercard',
    number: '5277696455399733',
    cvv: '121',
  },
  {
    flag: 'mastercard',
    flagName: 'Mastercard',
    number: '5448280000000007',
    cvv: '577',
  },
  {
    flag: 'mastercard',
    flagName: 'Mastercard',
    number: '2223000148400010',
    cvv: '825',
  },
  {
    flag: 'mastercard',
    flagName: 'Mastercard',
    number: '2223020000000005',
    cvv: '918',
  },
  {
    flag: 'sorocred',
    flagName: 'Sorocred',
    number: '6364142000000122',
    cvv: '646',
  },
  {
    flag: 'visa',
    flagName: 'Visa',
    number: '4263982640269299',
    cvv: '422',
  },
  {
    flag: 'visa',
    flagName: 'Visa',
    number: '4761120000000148',
    cvv: '522',
  },
  {
    flag: 'visa',
    flagName: 'Visa',
    number: '4235647728025682',
    cvv: '819',
  },
];

/**
 * List of invalid card numbers.
 */
export const INVALID_CARD_LIST: Array<string> = [
  '7128947928928299',
  '1672358907890234',
  '1242412891301899',
  '6956954969569456',
  '9038469849949493',
  '7202178049129121',
  '9819200910818900',
  '9078324762834999',
];

/**
 * Repeating numbers for testing purposes.
 */
export const INVALID_REPEATED_CARD_LIST: Array<string> = [
  '0000000000000000',
  '1111111111',
  '22222222222',
  '333333333333333333333',
  '444444444444444444',
  '55555555555555',
  '66666666666',
  '77777777777777777777',
  '888888888888888888',
  '99999999999999999',
];

/**
 * List of valid expiration dates.
 */
export const VALID_EXPIRATION_DATE_LIST: Array<string> = [
  '05/2026',
  '04/2028',
  '10/2032',
  '02/2037',
  '11/2045',
  '07/29',
  '12/30',
  '09/33',
  '01/44',
];

/**
 * List of invalid expiration dates.
 */
export const INVALID_EXPIRATION_DATE_LIST: Array<string> = [
  '10',
  '34829',
  '10/00',
  '12/2017',
  '99/1020',
  '99/9999',
  '9/1',
  '10/3',
  '66/666',
];

/**
 * Gets the list of cards that match the given flags.
 *
 * @param flags
 *     List of flags to filter the cards
 * @returns
 */
export function getFlagCards(flags: Array<Flag>): Array<TestCard> {
  return TEST_CARD_LIST.filter((card) => flags.includes(card.flag));
}
