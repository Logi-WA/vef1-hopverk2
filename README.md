# Vefforritun 1, 2023, hópverkefni 2

## Verkefnalýsing

Verkefnið felst í að tengjast gefnum vefþjónustum og út frá þeim útbúa vef.

Vefþjónusta sem skal tengjast er á:
`https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/`

Hægt er að spyrja spurninga um verkefnið á rásinni `#vef1-2023-h2`.

Vefur skal vera prófaður og virka í nýjustu útgáfum af Firefox og Chrome.

### Forsíða

Á forsíðu skal birta sex nýjustu vörur með því að kalla á `/products?limit=6`.

Birta skal fyrir vörur:

- Titil
- Mynd
- Verð
- Heiti flokks

Hver vara skal vera hlekkur á viðeigandi vörusíðu.

Fyrir neðan vörur skal vera hlekkur sem fer á vörulista með öllum vörum.

### Vörulisti

Vörulisti birtir allar vörur með því að kalla á `/products`.

Birta skal fyrir vörur:

- Titil
- Mynd
- Verð
- Heiti flokks

Hver vara skal vera hlekkur á viðeigandi vörusíðu.

Fyrir neðan vörur skal vera hlekkur sem fer á forsíðu.

### Vörusíða

Vörusíða birtir vöru með því að kalla á `/products/{id}`.

Birta skal fyrir vöru:

- Titil
- Mynd
- Verð
- Heiti flokks
- Lýsingu á vöru

Fyrir neðan vöru skal birta þrjár sambærilegar vörur með því að kalla á `/products?limit=3&category={category}` þar sem `{category}` er auðkenni flokks vörunnar.

### Valin virkni

Aukalega skal útfæra eitt af eftirfarandi:

- Stuðningar við flokka: nota `/categories` til að birta flokka á forsíðu og `/products?category={id}` til að birta vörur á flokkasíðu.
- Stuðningur við síðuflettingu: nota `/products?offset={offset}&limit={limit}` til að birta vörur á síðu og hafa síðuflettingu á vörulistasíðu.
- Stuðningur við leit: með því að nota `/products?search={query}` og leita þannig í vörum, birta niðurstöður eða ef engar niðurstöður. Geyma skal leit í URL svo hægt sé að leita aftur.

### Slóðir

Fyrir hverja virkni skal vera slóð í vafrann sem hægt er að afrita og senda, eða endurhlaða síðu og virkni er sú sama og áður.

### Útlit

Á öllum síðum skal birta haus með einföldum titli sem fer með þig á forsíðu.

Allar síður skulu vera skalanlegar.

Dæmi um útlit er að finna í `utlit/` möppunni.

Ekki er krafa að gera eins útlit.

Ekki þarf að útfæra nýskrá, innskrá eða körfu virkni í haus.

## Hópavinna

Verkefnið skal unnið í hóp með 3-4 einstaklingum. Hafið samband við kennara ef ekki er mögulegt að vinna í hóp. Hægt er að leita að félögum á slack á rásinni `#vef1-2023-h2-vantar-hop`.

Notast skal við Git og GitHub. Engar zip skrár með kóða ættu að ganga á milli í hópavinnu, heldur á að „committa“ allan kóða og vinna gegnum Git.

Sjást ætti á _commit history_ að allir meðlimir hóps hafi tekið þátt í verkefni.

Útbúa þarf a.m.k. fimm Pull Request (PR) þar sem búið er að fara yfir af öðrum meðlim í hóp og yfirferð ásamt gagnrýni sést á GitHub.

## Lýsing á verkefni

`README.md` skrá skal vera í rót verkefnis og innihalda:

- Upplýsingar um hvernig keyra skuli verkefnið
  - `npm run dev` eða `npm start`
  - `npm run lint` skal vera til staðar og keyra eslint og stylelint
- Létt lýsing á uppsetningu verkefnis, hvernig því er skipt í möppur, hvernig CSS/Sass er skipulagt og fleira sem á við
- Upplýsingar um alla sem unnu verkefni, nöfn, HÍ notendanöfn og GitHub notendanöfn

## Tæki og tól

Verkefnið skal innihalda `package.json` og `package-lock.json` sem innihalda öll notuð tól.

Þegar verkefnið er sótt verður `npm install` keyrt á undan öllum öðrum skipunum.

Setja skal upp Sass og stylelint með `stylelint-config-sass-guidelines` og `stylelint-config-standard` fyrir verkefnið.

Setja skal upp eslint með airbnb staðli.

Leyfilegt er að nota öll tól sem við höfum notað í haust.

## Hýsing

Setja skal verkefnið upp á Netlify, tengt GitHub.

## Mat

- 10% - README eftir forskrift, tæki og tól uppsett, vefur keyrir á Netilfy. Lint fyrir CSS/Sass og JavaScript.
- 10% - Git notað og PR eftir forskrift.
- 10% – Almenn tenging við vefþjónustur, „loading state“ og villumeðhöndlun.
- 10% – Almennt útlit og skalanleiki.
- 10% – Forsíða.
- 10% – Vörulisti.
- 20% – Vörusíða.
- 20% – Valin virkni.

## Sett fyrir

Verkefni sett fyrir í fyrirlestri mánudaginn 30. október 2023.

## Skil

Tilnefna skal hópstjóra sem skráir sig í ákveðinn hóp undir „Hópverkefni 2“ í Canvas. Aðrir nemendur skrá sig í framhaldinu í sama hóp, hópstjóri getur líka skráð aðra nemendur í hópinn.

**Útbúa skal hóp jafnvel ef verkefnið er unnið sem einstaklingsverkefni**.

Hópstjóri skal skila fyrir hönd allra í Canvas í seinasta lagi föstudaginn 24. nóvember 2023.

**Mikilvægt er að öll skil séu gerð í hóp annars munu ekki allir nemendur fá einkunn.**

Skil skulu innihalda:

- GitHub notendanöfn allra (passa þarf að allir nemendur séu í hópnum!)
- Slóð á verkefnið keyrandi í hýsingu
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `ahp9`
  - `dawidniescier`
  - `osk`
  - `polarparsnip`
  - `sturla-freyr`

## Einkunn

Sett verða fyrir tíu minni verkefni þar sem átta bestu gilda 5% hvert, samtals 40% af lokaeinkunn.

Sett verða fyrir tvö hópverkefni þar sem hvort um sig gildir 10%, samtals 20% af lokaeinkunn.

> Útgáfa 0.1
