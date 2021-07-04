import { validEmailTextInput, validSimpleRequiredTextInput } from "./ValidForm";

describe('Valid form simple required text input', () => {
  it('Value null must be false', () => {
    expect(validSimpleRequiredTextInput(null as any)).toBe(false);
  });
  it('Value empyt must be false', () => {
    expect(validSimpleRequiredTextInput('')).toBe(false);
  });
  it('Value just space must be false', () => {
    expect(validSimpleRequiredTextInput(' ')).toBe(false);
  });
  it('Value present must be true', () => {
    expect(validSimpleRequiredTextInput('Hello world')).toBe(true);
  });
});

describe('Valid form for email text input', () => {
  it('Email is null and false', () => {
    expect(validEmailTextInput(null as any)).toBe(false);
  });
  it('Email is empty and false', () => {
    expect(validEmailTextInput('')).toBe(false);
  });
  it('Email is false', () => {
    expect(validEmailTextInput('@amarrons')).toBe(false);
  });
  it('Email is false', () => {
    expect(validEmailTextInput('@amarrons.com')).toBe(false);
  });
  it('Email is false', () => {
    expect(validEmailTextInput('amarrons.com')).toBe(false);
  });
  it('Email is false', () => {
    expect(validEmailTextInput('samy@amarrons')).toBe(false);
  });
  it('Email is false', () => {
    expect(validEmailTextInput('samy@amarrons.c')).toBe(false);
  });
  it('Email is false', () => {
    expect(validEmailTextInput('samy@amarrons.uk.g')).toBe(false);
  });
  it('Email is valid', () => {
    expect(validEmailTextInput('samy@amarons.com')).toBe(true);
  });
  it('Email is valid', () => {
    expect(validEmailTextInput('samy@amarons.uk.gov')).toBe(true);
  });
})