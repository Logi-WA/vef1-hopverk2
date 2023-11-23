/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir.
 */
function route() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('id');

  renderProduct(document.body, id);
}

// Bregst við því þegar við notum vafra til að fara til baka eða áfram.
window.onpopstate = () => {
  const mainElement = document.body.querySelector('.page-content');
  empty(mainElement);
  route();
};

// Athugum í byrjun hvað eigi að birta.
route();
