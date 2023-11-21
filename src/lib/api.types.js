// https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/

/**
 * @typedef {object} Product
 * @property {string} id Auðkenni vöru.
 * @property {string} title Titill vöru.
 * @property {string} price Verð á vöru.
 * @property {string} description Lýsing á vöru.
 * @property {string} created Tími sem vara var stofnuð.
 * @property {string} updated Tími sem vara var uppfærð.
 * @property {Category} category Vöruflokkur vöru.
 */

/**
 * @typedef {object} Category
 * @property {string} id Auðkenni vöruflokks.
 * @property {string} title Titill vöruflokks.
 */

/**
 * @typedef {object} ProductSearchResult
 * @property {Product[]} items Vörur.
 */

// Verðum að exporta einhverju til að fá ekki villu...
export default {};