const { getDocketNumberSuffix } = require('./getDocketNumberSuffix');

describe('getDocketNumberSuffix', () => {
  it('returns W for Whistleblower caseType', () => {
    const suffix = getDocketNumberSuffix({
      caseType: 'Whistleblower',
      docketNumber: '101-18',
      procedureType: 'small',
    });

    expect(suffix).toEqual('W');
  });

  it('returns P for Passport caseType', () => {
    const suffix = getDocketNumberSuffix({
      caseType: 'Passport',
      docketNumber: '101-18',
      procedureType: 'small',
    });

    expect(suffix).toEqual('P');
  });

  it('returns X for "Exempt Organization" caseType', () => {
    const suffix = getDocketNumberSuffix({
      caseType: 'Exempt Organization',
      docketNumber: '101-18',
      procedureType: 'small',
    });

    expect(suffix).toEqual('X');
  });

  it('returns R for "Retirement Plan" caseType', () => {
    const suffix = getDocketNumberSuffix({
      caseType: 'Retirement Plan',
      docketNumber: '101-18',
      procedureType: 'small',
    });

    expect(suffix).toEqual('R');
  });

  it('returns SL for "Lien/Levy" caseType and "small" for procedureType', () => {
    const suffix = getDocketNumberSuffix({
      caseType: 'CDP (Lien/Levy)',
      docketNumber: '101-18',
      procedureType: 'small',
    });

    expect(suffix).toEqual('SL');
  });

  it('returns L for "Lien/Levy" caseType and "regular" for procedureType', () => {
    const suffix = getDocketNumberSuffix({
      caseType: 'CDP (Lien/Levy)',
      docketNumber: '101-18',
      procedureType: 'regular',
    });

    expect(suffix).toEqual('L');
  });

  it('returns S for all others with "small" for procedureType', () => {
    const suffix = getDocketNumberSuffix({
      caseType: 'Something New',
      docketNumber: '101-18',
      procedureType: 'small',
    });

    expect(suffix).toEqual('S');
  });

  it('returns null for other instance', () => {
    const suffix = getDocketNumberSuffix({
      caseType: 'Something New',
      docketNumber: '101-18',
      procedureType: 'regular',
    });

    expect(suffix).toEqual(null);
  });
});
