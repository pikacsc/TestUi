import { LoaderSpinnerModule } from './loader-spinner.module';

describe('LoaderSpinnerModule', () => {
  let loaderSpinnerModule: LoaderSpinnerModule;

  beforeEach(() => {
    loaderSpinnerModule = new LoaderSpinnerModule();
  });

  it('should create an instance', () => {
    expect(loaderSpinnerModule).toBeTruthy();
  });
});
