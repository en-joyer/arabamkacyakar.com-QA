Feature: Yakıt Tüketimi Hesaplama Testi
    Yakıt tüketimi hesaplama özelliği; Şehir, yakıt tipi, yakıt tüketimi, mesafe 
    değerleri ile negatif testlerle birlikte değerlendirilmelidir.
    Çıkacak olan sonuçlar ekran görüntüsü ile desteklenmelidir.

    Background: Negatif test koşumu.
        İlk olarak anasayfada "Yakıt Tüketimi Hesaplama" butonuna tıklanmalıdır. Butonun çalışıp çalışmadığı gözlemlenmelidir.
        Ardından aşağıdaki negatif test koşumları gerçekleştirilmelidir.

    Scenario: Varsayılan verilerle direkt hesapla butonuna basılmalı, çıkan sonuçlar gözlenmelidir.
        Given Belirtilen web sayfasına gidilir.
        Then Hesapla butonuna tıklanır. 
    Scenario Outline: Mesafe ve yakıt tüketimi boş bırakılarak, diğer verilen rastgele seçilmeli ve çıkan sonuçlar gözlemlenmelidir.
        Given Her hangi bir şehir seçilerek, boş değerlerle hesaplama tekrar denenir.
        Then Yakıt tipi dizel seçilerek, boş değerlerle hesaplama tekrar denenir.
    Scenario Outline: Yakıt tüketimi ve mesafe değerleri "-1" girilerek test edilmeli, çıkan sonuçlar gözlenlenmelidir.
        Given Yakıt tüketimine -1 girilir ve denenir.
        Then Yakıt tüketimi boş bırakılarak mesafe değeri -1 girilir ve denenir.
        Then İki alana da -1 girilerek denenir.
    Scenario Outline: Aynı değerler "0" girilerek test edilir.
        Given Yakıt tüketimine 0 girilir ve denenir.
        Then Yakıt tüketimi boş bırakılarak mesafe değeri 0 girilir ve denenir.
        Then İki alana da 0 girilerek denenir.
    Scenario Outline: Başlangıç ve varış noktalarında aynı şehir seçilerek, yakıt tüketimi 0 girilir ve iki yakıt tipi de denenir.
        Given Başlangıç ve varış noktaları seçilir ve yakıt tüketimi 0 girilerek Benzin denenir. 
        Then Başlangıç ve varış noktaları seçilir ve yakıt tüketimi 0 girilerek Dizel denenir.
        Then "Gidiş-Dönüş" seçilerek yukarıdaki test koşumları gerçekleştirilir.