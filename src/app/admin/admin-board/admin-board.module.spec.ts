import { AdminBoardModule } from './admin-board.module';

describe('AdminBoardModule', () => {
  let adminBoardModule: AdminBoardModule;

  beforeEach(() => {
    adminBoardModule = new AdminBoardModule();
  });

  it('should create an instance', () => {
    expect(adminBoardModule).toBeTruthy();
  });
});
