/**
 * Býr til element með nafni og bætir við öðrum elementum eða texta nóðum.
 * @param {string} name Nafn á elementi
 * @param  {...string | HTMLElement} children Hugsanleg börn: önnur element eða strengir
 * @returns {HTMLElement} Elementi með gefnum börnum
 */
export function el(name, attributes = {}, ...children) {
  const e = document.createElement(name);

  for (const key of Object.keys(attributes)) {
    e.setAttribute(key, attributes[key]);
  }

  for (const child of children) {
    if (!child) {
      console.warn('Child is null', name, attributes);
      // eslint-disable-next-line no-continue
      continue;
    }

    if (typeof child === 'string' || typeof child === 'number') {
      e.appendChild(document.createTextNode(child.toString()));
    } else {
      e.appendChild(child);
    }
  }

  return e;
}

/**
 * Fjarlægir öll börn `element`.
 * @param {HTMLElement} element Element sem á að tæma
 */
export function empty(element) {
  if (!element || !element.firstChild) {
    return;
  }

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * @typedef {import('./api.types.js').Product} Product
 */

/**
 * Býr til grid-product element.
 * @param {Product} product Upplýsingar um vöru.
 */
export function card(product) {
  const productEl = el('div', { class: 'grid-product' },
    el('img', { class: 'prod-img', src: product.image }),
    el('div', { class: 'prod-info' },
      el('div', {},
        el('p', { class: 'prod-name' }, product.title),
        el('p', { class: 'prod-category' }, product.category.title)
      ),
      el('p', { class: 'prod-price' }, product.price)
    )
  );
  return productEl;
}
