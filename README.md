# Baza podataka - piva
Autor: Ivan Špoljar

Verzija: 1.0

Jezik: postgresql

Licenca: Creative Commons Zero v1.0 Universal

Creative Commons Zero v1.0 Universal licenca je koju je proizvela Američka neprofitna organizacija koja želi povećati količinu javno dostupnih radova i materijala koje bi ljudi slobodno mogli koristiti, dijeliti i unaprjeđivati. Creative Commons Zero v1.0 Universal javna je licenca za zaštitu autorskih prava koja dopušta javno korištenje i unaprjeđivanje "zaštičenih" radova.


**Atributi:**

-Entitet Pive:
  - IdPive - identifikator pive - int, not null, primary key
  - Naziv - naziv pive - varchar(50), not null
  - PostAlkohola - postotak alkohola koji piva sadrži, varchar(50), not null
  - Boja -  svijetla ili tamna piva - varchar(50), not null
  - Vrsta - vrsta pive - varchar(50), not null
  - DistributerZaRH - distributer za Hrvatsku - varchar(100)
  - DrPorjekla - država porjekla - varchar(50), not null
  - EnVrijednost100ml - energetska vrijednost u kalorijama u 100 ml pive - varchar(50) not null
  - IdPakiranja - identifikator vrste ambalaže - integer, not null
  - Pivovara - pivovara koja je izmislila pivu - varchar(100), not null
  
-Entitet VrstaPakiranja:
  - IdPakiranja - identifikator vrste ambalaže - integer, not null, primary key
  - Materijal - u kakvoj ambalaži je piva spremljena - varchar(50), not null
  - Velicina - volumen pive sadržan u ambalaži - varchar(50), not null
  
Dodatno:
  - DistributerZaRH može biti null kada je piva iz Hrvatske
  - PostAlkohola i EnVrijednost100ml su varchar(50) zbog '%' u PostAlkohola i 'kcal' u EnVrijednost100ml
