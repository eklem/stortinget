# stortinget søk
Forsøk på å lage et brukbart søk for saker, politikere og avstemninger på Stortinget.

![Foreløpig design som viser hvordan gjøre en Stortings-sesjon søkbar](https://github.com/user-attachments/assets/8db21aca-93f8-44fe-bce5-af5c0936f6b0)
Foreløpig design som viser hvordan gjøre en Stortings-sesjon søkbar.


Kilde for data: [Stortinget](https://data.norge.no/nlod/no) - under [Norsk lisens for offentlige data (NLOD) 2.0](https://data.norge.no/nlod/no/2.0)

Start med å velge `stortings-sesjon` og indekser. Dette skal laste ned data fra data.stortinget.no via noen APIer, transformere og indeksere dem. Så skal du kunne søke i disse dataene.

Trenger en søkeinformasjons-modell som viser partier, representanter og saker og metadataene + APIene som er tenkt brukt og vist.

## Søkeinformasjons-modell

![Tegning av søkeinformasjons-modell](https://raw.githubusercontent.com/eklem/stortinget/refs/heads/trunk/search-information-model-v01.png)

Foreslåtte entiteter å kunne søke etter:

* Politiske partier
* Representanter
* Saker

### Første versjon

![Tegning av nedskalert søkeinformasjons-modell](https://raw.githubusercontent.com/eklem/stortinget/refs/heads/trunk/search-information-model-v02.png)

1. Hente liste over sesjoner.
2. La brukeren velge en sesjon og finne saker i denne sesjonen
3. Bruke listen med oversikt over saker til å hente og indeksere enkeltsaker
4. Også bruke enkeltsakene til å finne og indeksere representanter som har vært aktive

### Hente inspirasjon?

Kan også se hva som kan være nyttig og enkelt nok å lage fra det som [Holder de ord](https://www.dagsavisen.no/oslo/nyheter/2020/02/03/holder-de-ord-legger-ned/) har laget.

## ~~Proxy~~

~~For at JavaScript i nettleseren skal godta å hente data direkte fra data.stortinget.no trengs det en proxy-server. Satt opp en versjon av [cors-anywhere](https://github.com/Rob--W/cors-anywhere/) på [proxy.klemespen.com](https://proxy.klemespen.com/).~~

~~Det er en bug hos data.stortinget.no som vil bli fikset.~~ Bug er fikset. Du kan se data lastet ned direkte på [https://eklem.github.io/stortinget/html/](https://eklem.github.io/stortinget/html/).

## API-innhold

Ser så langt ut som interessante data. Litt vanskelig å skjønne hvordan voteringer-APIene fungere og hvordan aggregere dette. Særlig for saker som blir enstemmig vedtatt.

### Stortingsperioder og sesjoner

Stortingsperioder: https://data.stortinget.no/eksport/stortingsperioder?format=json

Stortingssesjoner: https://data.stortinget.no/eksport/sesjoner?format=json

### Saker

https://data.stortinget.no/eksport/saker?sesjonid=2022-2023&format=json

### Sak

https://data.stortinget.no/eksport/sak?sakid=94625&format=json

Kobling mellom `sak` og `votering_id`:

https://data.stortinget.no/eksport/voteringer?sakid=94625&format=json

Så du kan se hva en representant stemte:

https://data.stortinget.no/eksport/voteringsresultat?voteringid=21349&format=json

### Representanter

https://data.stortinget.no/eksport/representanter?stortingsperiodeid=2021-2025&format=json

### Partier

https://data.stortinget.no/eksport/allepartier?format=json


Dev setup
Live Preview

Installer VSCode plugin: Live Preview av Microsoft og bruk VSCode port forwarding.

shift + command + p

```console
Live Preview: Start Server
Live Preview: Start Server Logging
```

Under ports tab'en i server logging window, sett port forwarding på port 3000.
