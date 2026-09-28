/* Regras independentes da interface. Valores monetários são inteiros em centavos. */
(function (root) {
  'use strict';
  const categories = ['Alimentação', 'Moradia', 'Transporte', 'Educação', 'Saúde', 'Lazer', 'Outros'];
  function moneyInput(value) {
    const text = String(value).trim();
    if (!/^\d{1,7}([,.]\d{1,2})?$/.test(text)) throw Error('Use um valor positivo, como 25,50, sem separador de milhar.');
    const [whole, fraction = ''] = text.replace(',', '.').split('.');
    const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
    if (cents <= 0 || cents > 999999999) throw Error('Informe um valor entre R$ 0,01 e R$ 9.999.999,99.');
    return cents;
  }
  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value + 'T12:00:00Z');
    return !isNaN(date) && date.toISOString().slice(0, 10) === value && value >= '1900-01-01' && value <= '2100-12-31';
  }
  const initial = () => ({ version: 2, entries: [], goals: [], game: newGame() });
  function totals(entries, month) {
    const selected = entries.filter(e => e.date.slice(0, 7) === month);
    const income = selected.filter(e => e.type === 'income').reduce((a, e) => a + e.amount, 0);
    const expense = selected.filter(e => e.type === 'expense').reduce((a, e) => a + e.amount, 0);
    return { income, expense, balance: income - expense, selected };
  }
  const levels = typeof module !== 'undefined' && module.exports ? require('./questions.js') : root.CofreLevels;
  const MIN_MONTH = '2026-09';
  const maxMonth = () => '2100-12';
  function validMonth(value) { return /^\d{4}-(0[1-9]|1[0-2])$/.test(value) && value >= MIN_MONTH && value <= maxMonth(); }
  const newGame = () => ({ level: 0, answers: [], pending: false });
  const score = game => game.level < levels.length ? game.answers.filter((a,i) => a === levels[game.level].questions[i].best).length : 5;
  function answerQuestion(game, answer) {
    if (game.level >= levels.length || game.pending || game.answers.length >= 5) throw Error('Esta pergunta já foi respondida.');
    if (!Number.isInteger(answer) || answer < 0 || answer > 2) throw Error('Escolha uma das alternativas.');
    return { ...game, answers: [...game.answers, answer], pending: true };
  }
  function continueGame(game) {
    if (!game.pending) throw Error('Escolha uma resposta antes de continuar.');
    return { ...game, pending: false };
  }
  function advanceGame(game) {
    if (game.level >= levels.length || game.pending || game.answers.length !== 5 || score(game) !== 5) throw Error('Acerte as cinco perguntas para avançar.');
    return { level: game.level + 1, answers: [], pending: false };
  }
  function retryGame(game) {
    if (game.pending || game.answers.length !== 5 || score(game) === 5 || game.level >= levels.length) throw Error('Esta fase não precisa ser refeita.');
    return { ...game, answers: [], pending: false };
  }
  function validate(data) {
    const fail = () => { throw Error('Backup inválido ou de versão incompatível. Nenhum dado foi substituído.'); };
    const cents = n => Number.isSafeInteger(n) && n > 0 && n <= 999999999;
    const label = s => typeof s === 'string' && s.trim().length > 0 && s.length <= 80;
    if (!data || ![1, 2].includes(data.version) || !Array.isArray(data.entries) || !Array.isArray(data.goals) || data.entries.length > 10000 || data.goals.length > 100 || !data.game || !Array.isArray(data.game.answers)) fail();
    const ids = new Set();
    for (const e of [...data.entries, ...data.goals]) { if (!label(e.id) || ids.has(e.id)) fail(); ids.add(e.id); }
    for (const e of data.entries) if (!label(e.description) || !cents(e.amount) || !validDate(e.date) || !['income', 'expense'].includes(e.type) || !categories.includes(e.category)) fail();
    for (const g of data.goals) if (!label(g.name) || !cents(g.target) || !Number.isSafeInteger(g.saved) || g.saved < 0 || g.saved > g.target) fail();
    let game;
    if (data.version === 1) {
      // A trilha é nova. Registros e metas antigos são preservados integralmente.
      if (data.game.answers.length > 5 || data.game.answers.some(a => !Number.isInteger(a) || a < 0 || a > 2)) fail();
      game = newGame();
    } else {
      const { level, answers, pending } = data.game;
      if (!Number.isInteger(level) || level < 0 || level > 20 || typeof pending !== 'boolean' || answers.length > 5 || answers.some(a => !Number.isInteger(a) || a < 0 || a > 2) || (pending && !answers.length) || (level === 20 && (answers.length || pending))) fail();
      game = { level, answers: [...answers], pending };
    }
    // Reconstrói apenas campos conhecidos; não conserva conteúdo extra do arquivo.
    return { version: 2, entries: data.entries.map(({id, description, amount, date, type, category}) => ({id, description, amount, date, type, category})), goals: data.goals.map(({id, name, target, saved}) => ({id, name, target, saved})), game };
  }
  const api = { categories, moneyInput, validDate, initial, totals, levels, validate, MIN_MONTH, maxMonth, validMonth, newGame, score, answerQuestion, continueGame, advanceGame, retryGame };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CofreCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
