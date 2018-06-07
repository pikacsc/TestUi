import { NoticeModule } from './notice.module';

describe('NoticeModule', () => {
  let noticeModule: NoticeModule;

  beforeEach(() => {
    noticeModule = new NoticeModule();
  });

  it('should create an instance', () => {
    expect(noticeModule).toBeTruthy();
  });
});
