import {
  getFlagCards,
  INVALID_CARD_LIST,
  INVALID_EXPIRATION_DATE_LIST,
  INVALID_REPEATED_CARD_LIST,
  TEST_CARD_LIST,
  VALID_EXPIRATION_DATE_LIST,
} from '#/data/test.data';
import { describe, expect, it } from 'vitest';
import {
  getFlag,
  getFlagName,
  isCvvValid,
  isDigitValid,
  isExpDateValid,
  isValid,
} from '~';

describe('getFlag', () => {
  it('Is exported and is a function', () => {
    expect(getFlag).toBeDefined();
    expect(getFlag).toBeInstanceOf(Function);
  });

  it('All valid test cards should return the correct flag', () => {
    TEST_CARD_LIST.forEach((card) => {
      expect(getFlag(card.number)).toBe(card.flag);
    });
  });

  it('Sequences of the same number should always return `false`', () => {
    INVALID_REPEATED_CARD_LIST.forEach((card) => {
      expect(getFlag(card)).toBe(false);
    });
  });

  it('Invalid cards should always return `false`', () => {
    INVALID_CARD_LIST.forEach((card) => {
      expect(getFlag(card)).toBe(false);
    });
  });
});

describe('getFlagName', () => {
  it('Is exported and is a function', () => {
    expect(getFlagName).toBeDefined();
    expect(getFlagName).toBeInstanceOf(Function);
  });

  it('All valid test cards should return the correct name', () => {
    TEST_CARD_LIST.forEach((card) => {
      expect(getFlagName(card.number)).toBe(card.flagName);
    });
  });

  it('Sequences of the same number should always return `false`', () => {
    INVALID_REPEATED_CARD_LIST.forEach((card) => {
      expect(getFlagName(card)).toBe(false);
    });
  });

  it('Invalid cards should always return `false`', () => {
    INVALID_CARD_LIST.forEach((card) => {
      expect(getFlagName(card)).toBe(false);
    });
  });
});

describe('isValid', () => {
  it('Is exported and is a function', () => {
    expect(isValid).toBeDefined();
    expect(isValid).toBeInstanceOf(Function);
  });

  it('All valid test cards should validate to `true`', () => {
    TEST_CARD_LIST.forEach((card) => {
      expect(isValid(card.number)).toBe(true);
    });
  });

  it('Sequences of the same number should always return `false`', () => {
    INVALID_REPEATED_CARD_LIST.forEach((card) => {
      expect(isValid(card)).toBe(false);
    });
  });

  it('Invalid cards should always return `false`', () => {
    INVALID_CARD_LIST.forEach((card) => {
      expect(isValid(card)).toBe(false);
    });
  });

  it('If required, cards on the list should return `true`', () => {
    const mastercardAndVisa = getFlagCards(['mastercard', 'visa']);

    mastercardAndVisa.forEach((card) => {
      expect(
        isValid(card?.number, {
          cards: ['mastercard', 'visa'],
        })
      ).toBe(true);
    });
  });

  it('If required, cards not on the list should return `false`', () => {
    const notMasterCardNorVisa = getFlagCards([
      'amex',
      'diners',
      'elo',
      'jcb',
      'hipercard',
      'discover',
    ]);

    notMasterCardNorVisa.forEach((card) => {
      expect(
        isValid(card?.number, {
          cards: ['mastercard', 'visa'],
        })
      ).toBe(false);
    });
  });
});

describe('isDigitValid', () => {
  it('Is exported and is a function', () => {
    expect(isDigitValid).toBeDefined();
    expect(isDigitValid).toBeInstanceOf(Function);
  });

  it('All valid test cards should validate to `true`', () => {
    TEST_CARD_LIST.forEach((card) => {
      expect(isDigitValid(card.number)).toBe(true);
    });
  });

  it('Sequences of the same number should always return `false`', () => {
    INVALID_REPEATED_CARD_LIST.forEach((card) => {
      expect(isDigitValid(card)).toBe(false);
    });
  });

  it('Invalid cards should always return `false`', () => {
    INVALID_CARD_LIST.forEach((card) => {
      expect(isDigitValid(card)).toBe(false);
    });
  });

  it('If required, cards on the list should return `true`', () => {
    const mastercardAndVisa = getFlagCards(['mastercard', 'visa']);

    mastercardAndVisa.forEach((card) => {
      expect(
        isDigitValid(card?.number, {
          cards: ['mastercard', 'visa'],
        })
      ).toBe(true);
    });
  });

  it('If required, cards not on the list should return `false`', () => {
    const notMasterCardNorVisa = getFlagCards([
      'amex',
      'diners',
      'elo',
      'jcb',
      'hipercard',
      'discover',
    ]);

    notMasterCardNorVisa.forEach((card) => {
      expect(
        isDigitValid(card?.number, {
          cards: ['mastercard', 'visa'],
        })
      ).toBe(false);
    });
  });
});

describe('isCvvValid', () => {
  it('Is exported and is a function', () => {
    expect(isCvvValid).toBeDefined();
    expect(isCvvValid).toBeInstanceOf(Function);
  });

  it("All test cards' CVV should validate to `true`", () => {
    TEST_CARD_LIST.forEach((card) => {
      expect(isCvvValid(card.number, card.cvv)).toBe(true);
    });
  });
});

describe('isExpDateValid', () => {
  it('Is exported and is a function', () => {
    expect(isExpDateValid).toBeDefined();
    expect(isExpDateValid).toBeInstanceOf(Function);
  });

  it('All valid test expiration dates pass the test', () => {
    VALID_EXPIRATION_DATE_LIST.forEach((date) => {
      const [month, year] = date.split('/');
      expect(isExpDateValid(month, year)).toBe(true);
    });
  });

  it('All invalid test expiration dates should return `false`', () => {
    INVALID_EXPIRATION_DATE_LIST.forEach((date) => {
      const [month = undefined, year = undefined] = date?.split('/');
      expect(isExpDateValid(month, year)).toBe(false);
    });
  });
});
