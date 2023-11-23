import { renderProducts } from './lib/ui.js';

/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir.
 */
function route() {
  const mainElement = document.body.querySelector('.page-content');
  if (mainElement) {
    renderProducts(mainElement);
  }
}

// Athugum í byrjun hvað eigi að birta.
route();
