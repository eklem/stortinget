# API'ene og data-eksempler

Ser så langt ut som interessante data. Litt vanskelig å skjønne hvordan voteringer-APIene fungere og hvordan aggregere dette. Særlig for saker som blir enstemmig vedtatt.

## Stortingsperioder og sesjoner

[Stortingsperioder](data-stortingsperioder.md) - Perioder stortingspolitikere er valgt for.

[Sesjoner](data-sesjoner.md) - En av fire arbeidsperioder for et valgt storting.

## Saker

[Saker][data-saker.md] - Liste over saker for en sesjon.

## Sak

https://data.stortinget.no/eksport/sak?sakid=94625&format=json

Kobling mellom `sak` og `votering_id`:

https://data.stortinget.no/eksport/voteringer?sakid=94625&format=json

Så du kan se hva en representant stemte:

https://data.stortinget.no/eksport/voteringsresultat?voteringid=21349&format=json

### Representanter

https://data.stortinget.no/eksport/representanter?stortingsperiodeid=2021-2025&format=json

### Partier

https://data.stortinget.no/eksport/allepartier?format=json