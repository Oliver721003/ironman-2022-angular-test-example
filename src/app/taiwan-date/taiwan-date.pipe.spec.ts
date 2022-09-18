import { TaiwanDatePipe } from './taiwan-date.pipe';

describe('TaiwanDatePipe', () => {
  let pipe: TaiwanDatePipe;

  beforeEach(() => {
    pipe = new TaiwanDatePipe();
  });

  it('管道應可以被建立', () => expect(pipe).toBeDefined());

  it('當日期為 2022/09/01 時，應回傳 "民國 111 年 9 月 1 日"', () => {
    // Arrange
    const pipe = new TaiwanDatePipe();
    const targetDate = new Date(2022, 8, 1);

    // Act
    var actual = pipe.transform(targetDate);

    // Assert
    expect(actual).toBe('民國 111 年 9 月 1 日');
  });
});
