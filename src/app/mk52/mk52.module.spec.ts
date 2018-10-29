import { Mk52Module } from './mk52.module';

describe('Mk52Module', () => {
  let mk52Module: Mk52Module;

  beforeEach(() => {
    mk52Module = new Mk52Module();
  });

  it('should create an instance', () => {
    expect(mk52Module).toBeTruthy();
  });
});
