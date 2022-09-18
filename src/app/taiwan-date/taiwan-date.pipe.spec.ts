import { TaiwanDatePipe } from './taiwan-date.pipe';

xdescribe('TaiwanDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TaiwanDatePipe();
    expect(pipe).toBeTruthy();
  });
});
