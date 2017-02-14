import { AgileTimesPage } from './app.po';

describe('agile-times App', function() {
  let page: AgileTimesPage;

  beforeEach(() => {
    page = new AgileTimesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
