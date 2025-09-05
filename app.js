// v1.0 — Calcul simple
const nfEUR = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
});

function toNumber(v) {
    if (v == null) return 0;
    const s = String(v).replace(/\s/g, '').replace(',', '.');
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
}

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const sessions = toNumber(document.getElementById('sessions').value);
    const commandes = toNumber(document.getElementById('commandes').value);
    const ca = toNumber(document.getElementById('ca').value);

    const txEl = document.getElementById('tx');
    const aovEl = document.getElementById('aov');
    const noteEl = document.getElementById('note');

    let tx = '—';
    let aov = '—';
    let note = '';

    if (sessions > 0) {
        const t = (commandes / sessions) * 100;
        tx = t.toFixed(2) + ' %';
    } else {
        note = 'Renseigne un nombre de sessions > 0.';
    }

    if (commandes > 0) {
        const p = ca / commandes;
        aov = nfEUR.format(p);
    } else {
        if (note) note += ' ';
        note += 'Renseigne des commandes > 0.';
    }

    txEl.textContent = tx;
    aovEl.textContent = aov;
    noteEl.textContent = note;
});