Feature: Anasayfa Kontrolü

    Anasayfadaki tüm resimler yüklenmeli ve görünür olmalıdır. Linkler doğru adreslere yönlendirme yapmalıdır.
    
    Background:
        Given Bir tarayıcı belirtilen URL ile websitesine gitmelidir.
    Scenario: URL ve Title Kontrolü
        When Website URLsi istenen değere eşit olmalıdır.
        Then Title "Arabam Kaç Yakar" içermelidir.
    Scenario: Resimlerin kontrolü
        Then Tüm resimlerin yüklenip yüklenmediği kontrol edilmelidir.
    Scenario: Anasayfa'da linklerin kontrolü
        When Anasayfada tüm linklerin doğru yönlendirme yaptığı kontrol edilmelidir.
