const test = require('node:test');
const assert = require('node:assert/strict');
const C = require('../src/core.js');
test('dinheiro mantém centavos sem imprecisão de ponto flutuante', () => {
  assert.equal(C.moneyInput('0,10')+C.moneyInput('0.20'),30);
  assert.equal(C.moneyInput('1234,5'),123450);
  assert.equal(C.moneyInput('9999999,99'),999999999);
});
test('valores vazios, negativos, zero, malformados ou excessivos são rejeitados', () => {
  for (const value of ['', '0', '-1','1e3','NaN','1.000,00','2,001','10000000']) assert.throws(()=>C.moneyInput(value));
});
test('datas reais e ano bissexto', () => {
  assert.equal(C.validDate('2024-02-29'),true);
  for(const date of ['2026-02-29','2026-04-31','2026-13-01','2026-2-1','1899-01-01']) assert.equal(C.validDate(date),false);
});
test('saldo inclui somente o mês selecionado e pode ser negativo', () => {
  const entries=[{date:'2026-09-01',type:'income',amount:10000},{date:'2026-09-02',type:'expense',amount:15000},{date:'2026-10-01',type:'income',amount:90000}];
  const result=C.totals(entries,'2026-09');assert.equal(result.balance,-5000);assert.equal(result.selected.length,2);
  assert.equal(C.totals(entries,'2026-11').balance,0);
});
test('backup válido é reconstruído sem campos extras', () => {
  const original=C.initial();original.extra='não copiar';assert.deepEqual(C.validate(original),C.initial());
});
test('backup rejeita IDs repetidos, dinheiro inválido, meta excedida e respostas inexistentes', () => {
  const entry={id:'a',date:'2026-09-01',type:'income',amount:100,description:'Teste',category:'Outros'};
  const good={...C.initial(),entries:[entry],goals:[{id:'b',name:'Livro',target:5000,saved:1000}]};
  assert.deepEqual(C.validate(good),good);
  for(const modify of [s=>s.entries.push({...entry}),s=>s.entries[0].amount=-1,s=>s.goals[0].saved=5001,s=>s.game.answers=[5],s=>s.version=3,s=>s.entries[0].date='2026-02-30']) {
    const broken=JSON.parse(JSON.stringify(good));modify(broken);assert.throws(()=>C.validate(broken));
  }
});
test('100 perguntas exclusivas, 20 fases e três alternativas distintas por pergunta',()=>{
  assert.equal(C.levels.length,20);
  const questions=C.levels.flatMap(l=>{assert.equal(l.questions.length,5);return l.questions;});
  assert.equal(questions.length,100);assert.equal(new Set(questions.map(q=>q.story)).size,100);assert.equal(new Set(questions.map(q=>q.id)).size,100);
  for(const q of questions){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert.ok(q.best>=0&&q.best<3);assert.ok(q.lesson.length>20);}
});
test('avanço exige cinco acertos, bloqueia erros e mantém a fase na nova tentativa',()=>{
  let g=C.newGame();assert.throws(()=>C.advanceGame(g));
  for(let i=0;i<5;i++){g=C.answerQuestion(g,(C.levels[0].questions[i].best+(i===0?1:0))%3);assert.throws(()=>C.answerQuestion(g,0));g=C.continueGame(g);}
  assert.equal(C.score(g),4);assert.throws(()=>C.advanceGame(g));g=C.retryGame(g);assert.equal(g.level,0);assert.equal(g.answers.length,0);
});
test('jornada inteira avança exatamente 20 fases e encerra em 100 perguntas',()=>{
  let g=C.newGame();let answered=0;
  for(let level=0;level<20;level++){
    for(const q of C.levels[level].questions){g=C.answerQuestion(g,q.best);assert.deepEqual(C.validate({...C.initial(),game:g}).game,g);g=C.continueGame(g);answered++;}
    assert.equal(C.score(g),5);g=C.advanceGame(g);assert.equal(g.level,level+1);
  }
  assert.equal(answered,100);assert.deepEqual(g,{level:20,answers:[],pending:false});assert.throws(()=>C.answerQuestion(g,0));assert.throws(()=>C.advanceGame(g));
});
test('migração mantém metas e registros da versão 1 e inicia a nova trilha',()=>{
  const old={version:1,entries:[{id:'old',description:'Antigo',amount:100,date:'2026-02-01',type:'income',category:'Outros'}],goals:[{id:'goal',name:'Meta',target:200,saved:100}],game:{answers:[0,1,2,0,1]}};
  const migrated=C.validate(old);assert.equal(migrated.version,2);assert.deepEqual(migrated.entries,old.entries);assert.deepEqual(migrated.goals,old.goals);assert.deepEqual(migrated.game,C.newGame());
});
test('backups não aceitam fases e estados impossíveis',()=>{
  for(const game of [{level:-1,answers:[],pending:false},{level:21,answers:[],pending:false},{level:1.5,answers:[],pending:false},{level:20,answers:[0],pending:false},{level:0,answers:[],pending:true},{level:0,answers:[],pending:'sim'},{level:0,answers:[0,0,0,0,0,0],pending:false}]) assert.throws(()=>C.validate({...C.initial(),game}));
});
test('consulta rejeita meses anteriores a setembro de 2026 e datas malformadas',()=>{
  assert.equal(C.validMonth('2026-09'),true);assert.equal(C.validMonth('2027-01'),true);
  for(const value of ['1700-01','1600-02','2026-08','2026-00','2026-13','2026-9','2101-01','']) assert.equal(C.validMonth(value),false);
});
