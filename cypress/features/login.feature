Feature: 使用者登入作業

  Scenario: 進入登入頁面
    Given 瀏覽 2022 鐵人賽範例首頁
    When 點選標題列登入按鈕
    Then 應轉至登入頁面

  @login
  Scenario: 不存在使用者帳號
    Given 瀏覽 2022 鐵人賽範例首頁
    And 點選標題列登入按鈕
    When 輸入帳號 "userB" 與密碼 ""
    Then 錯誤訊息應顯示 "此帳號不存在"
    And 無法按下登入按鈕

  @login
  Scenario: 錯誤使用者帳號密碼
    Given 瀏覽 2022 鐵人賽範例首頁
    And 點選標題列登入按鈕
    When 輸入帳號 "userA" 與密碼 "0000"
    And 點選登入按鈕
    Then 顯示 "登入失敗" 訊息

  @login
  Scenario: 正確使用者帳號密碼
    Given 瀏覽 2022 鐵人賽範例首頁
    And 點選標題列登入按鈕
    When 輸入帳號 "userA" 與密碼 "1234567"
    And 點選登入按鈕
    Then 顯示 "登入成功" 訊息
