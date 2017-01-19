import { OrderManagementSystemPage } from './app.po';

describe('order-management-system App', function() {
  let page: OrderManagementSystemPage;

  beforeEach(() => {
    page = new OrderManagementSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
