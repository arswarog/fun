import { GenailleLucasModule } from './genaille-lucas.module';

describe('GenailleLucasModule', () => {
  let genailleLucasModule: GenailleLucasModule;

  beforeEach(() => {
    genailleLucasModule = new GenailleLucasModule();
  });

  it('should create an instance', () => {
    expect(genailleLucasModule).toBeTruthy();
  });
});
