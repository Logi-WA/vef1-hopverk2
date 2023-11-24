# Vefforritun 1, 2023, hópverkefni 2

## Valin virkni

- Stuðningur við leit: með því að nota /products?search={query} og leita þannig í vörum, birta niðurstöður eða ef engar niðurstöður. Geyma skal leit í URL svo hægt sé að leita aftur.

## Keyra vefsíðu

Til þess að keyra vefsíðu skal keyra skipunina:  
`npm run dev`

Til þess að keyra lint er keyrt skipunina:  
`npm run lint`

## Uppsetning verkefnis

Leturgerðir eru í möppunni [/fonts](./fonts/), merki í [/icon](./icon/), HTML-skrá í [/pages](./pages/) fyrir utan `index.html`, allar `.scss` skrárnar í [/styles](./styles/) fyrir utan `styles.scss` og allir JavaScript-kóðar í [/src](./src/).

### HTML

HTML skrárnar eru tvær, þ.e. `index.html` sem er forsíðan og `products.html` sem sýnir yfirlit yfir allar vörur. Á forsíðunni er

Skrárnar eru með sama haus en með sitt eigið meginmál sem stýrt er af JavaScript.

### CSS

Notað var SCSS til þess að flokka CSS-ið í skrár en þær eru töluvert margar. Skrárnar sem upphafsstilla eru `base.scss`, `config.scss`, `fonts.scss` og `reset.scss`. Restin á við um ákveðna hluta af vefsíðunni.

### JavaScript

Allir kóðarnir eru í möppunni [/src](./src/) þar sem `index.js` er fyrir `index.html` og `products.js` er fyrir `products.html`. Þær skrár nota föll úr skránum í möppunni [/src/lib](./src/lib/).

## Höfundar

Logi Arnarsson  
_Logi-WA_  
[loa13@hi.is](mailto:loa13@hi.is)

Sigurþór Maggi Snorrason  
_SysMac5_  
[sms70@hi.is](mailto:sms70@hi.is)
