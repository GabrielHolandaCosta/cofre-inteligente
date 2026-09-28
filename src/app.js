/* Interface local: nenhum dado é enviado pela aplicação a servidores. */
(() => {
  'use strict';
  const C = window.CofreCore, KEY = 'cofre-inteligente-v1';
  const main = document.querySelector('main');
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const money = n => new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(n/100);
  // Todo texto de registros/backup passa por escape antes de entrar no HTML.
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const id = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  let state = C.initial(), storageProblem = '', month = today().slice(0,7) < C.MIN_MONTH ? C.MIN_MONTH : today().slice(0,7), editing = null;
  try { const raw = localStorage.getItem(KEY); if (raw) state = C.validate(JSON.parse(raw)); }
  catch { storageProblem = 'Não foi possível ler os dados salvos. O conteúdo anterior não será sobrescrito automaticamente. Exporte seus novos registros ou restaure um backup em Meus dados.'; }
  let timer;
  function toast(message) { clearTimeout(timer); document.querySelector('#status').textContent = message; timer = setTimeout(() => document.querySelector('#status').textContent = '', 6500); }
  function save() {
    if (storageProblem) return false;
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
    catch { storageProblem = 'O navegador não conseguiu salvar. Os dados estão apenas nesta sessão: exporte um backup antes de fechar.'; return false; }
  }
  function commit(message) { const saved = save(); render(); if(!saved) toast('Alteração feita nesta sessão. Exporte um backup para não perder os dados.'); else if(message) toast(message); }
  const heading = (tag,title,description) => `<div class="eyebrow">${tag}</div><h1>${title}</h1><p class="lead">${description}</p>`;
  const stats = (t) => `<div class="grid"><div class="card"><small>Entradas do mês</small><strong class="stat positive">${money(t.income)}</strong></div><div class="card"><small>Saídas do mês</small><strong class="stat">${money(t.expense)}</strong></div><div class="card"><small>Saldo do mês</small><strong class="stat ${t.balance<0?'negative':'positive'}">${money(t.balance)}</strong></div></div>`;
  function home() {
    const t = C.totals(state.entries, today().slice(0,7));
    return heading('Seu dinheiro, suas escolhas','Pequenos passos. Grandes aprendizados.','Um espaço para praticar escolhas, guardar para uma meta e organizar as contas em família.') +
      `<div class="hero"><div><span class="badge">Aprenda na prática</span><h2 style="margin-top:18px">E se você pudesse testar suas escolhas?</h2><p>Percorra 20 fases, descubra 100 situações e conquiste novos caminhos com suas escolhas.</p><a class="button" href="#jogo">${state.game.level===20?'Ver minha conquista':state.game.level||state.game.answers.length?'Continuar minha trilha':'Começar minha trilha'} →</a></div><div class="hero-note"><strong>${state.game.level} de 20</strong><p>fases concluídas<br>na sua trilha de escolhas</p><small style="color:#e3eaff">Sem dinheiro real. Sem pressa.</small></div></div>`+
      `<h2 class="section-title">Cada escolha tem seu espaço</h2><div class="two"><section class="card"><span class="step">01 / CONSTRUIR UM HÁBITO</span><h2 style="margin-top:14px">Meu cofre de metas</h2><p class="muted">Dê nome ao seu objetivo e acompanhe cada valor guardado.</p><a class="button secondary" href="#metas">Ver minhas metas →</a></section><section class="card"><span class="step">02 / CONVERSAR EM FAMÍLIA</span><h2 style="margin-top:14px">Um mês de cada vez</h2><p class="muted">Anote o que entra e o que sai para planejar os próximos passos.</p><a class="button secondary" href="#orcamento">Organizar o orçamento →</a></section></div><h2 class="section-title">Orçamento de ${new Date(today()+'T12:00:00').toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}</h2>${stats(t)}<p class="muted" style="margin-top:20px">${state.entries.length?'O saldo considera somente os registros deste mês.':'Nenhum registro por enquanto. Comece anotando uma entrada ou uma saída.'}</p>`;
  }
  function game() { return window.renderGame(C, state.game); }
  const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  function monthPicker() {
    const [year, selectedMonth] = month.split('-');
    return `<fieldset class="month-picker"><legend>Mês de consulta</legend><label class="field"><span class="sr-only">Mês</span><select id="month-select" aria-label="Mês">${monthNames.map((name,i)=>{const m=String(i+1).padStart(2,'0');return year==='2026' && i<8?'':`<option value="${m}" ${m===selectedMonth?'selected':''}>${name}</option>`;}).join('')}</select></label><label class="field"><span class="sr-only">Ano</span><select id="year-select" aria-label="Ano">${Array.from({length:75},(_,i)=>2026+i).map(y=>`<option value="${y}" ${String(y)===year?'selected':''}>${y}</option>`).join('')}</select></label></fieldset>`;
  }
  function goals() {
    return heading('Meu cofre de metas','Um objetivo, um passo por vez.','O cofre registra o que você guardou; ele não movimenta dinheiro nem altera o orçamento.') +
      `<section class="card"><h2>Qual é a sua próxima meta?</h2><form id="goal-form"><div class="form-grid"><label class="field">Nome da meta<input name="name" maxlength="80" required placeholder="Ex.: Livro, bicicleta, passeio"></label><label class="field">Quanto quero juntar (R$)<input name="target" inputmode="decimal" required placeholder="150,00"></label></div><button>Criar meta</button></form></section><div class="two">${state.goals.map(g=>`<section class="card goal"><div class="row between"><h2>${esc(g.name)}</h2><button class="danger" data-action="delete-goal" data-id="${esc(g.id)}" aria-label="Excluir meta ${esc(g.name)}">Excluir</button></div><strong class="stat">${money(g.saved)}</strong><small>de ${money(g.target)} · ${Math.floor(g.saved/g.target*100)}% concluído</small><progress value="${g.saved}" max="${g.target}" aria-label="Progresso de ${esc(g.name)}"></progress><p>${g.saved===g.target?'Meta alcançada! Celebre seu planejamento.':`Faltam ${money(g.target-g.saved)} para chegar lá.`}</p><form class="deposit" data-id="${esc(g.id)}"><label class="field">Valor para registrar (R$)<input name="amount" inputmode="decimal" required placeholder="10,00"></label><div class="row"><button name="operation" value="add" ${g.saved===g.target?'disabled':''}>Guardar</button><button class="quiet" name="operation" value="remove" ${g.saved===0?'disabled':''}>Retirar / corrigir</button></div></form></section>`).join('')}</div>${state.goals.length?'':'<div class="card empty">Seu primeiro passo é dar um nome ao que você quer alcançar.</div>'}`;
  }
  function budget() {
    const t = C.totals(state.entries,month), e = state.entries.find(x=>x.id===editing);
    return heading('Orçamento familiar','Vamos organizar este mês?','Registre entradas e saídas junto com um adulto. Não é preciso informar nomes, banco ou documentos.')+
      `<div class="toolbar row between">${monthPicker()}<button class="quiet" data-action="csv">Exportar mês (CSV)</button></div>${stats(t)}<p class="notice" style="margin-top:20px">${t.balance<0?'As saídas registradas superam as entradas. Conversem sobre o que pode ser revisto e verifiquem se falta registrar alguma entrada.':'O saldo é a diferença entre entradas e saídas registradas neste mês. Não inclui saldo anterior nem reservas do cofre.'}</p><section class="card"><h2>${e?'Editar registro':'Adicionar um registro'}</h2><form id="entry-form"><div class="form-grid"><label class="field">Tipo<select name="type"><option value="income" ${e?.type==='income'?'selected':''}>Entrada — dinheiro recebido</option><option value="expense" ${!e||e.type==='expense'?'selected':''}>Saída — dinheiro gasto</option></select></label><label class="field">Valor (R$)<input name="amount" inputmode="decimal" required placeholder="25,50" value="${e?(e.amount/100).toFixed(2).replace('.',','):''}"></label><label class="field">Descrição<input name="description" maxlength="80" required placeholder="Ex.: Compra do mercado" value="${e?esc(e.description):''}"></label><label class="field">Categoria<select name="category">${C.categories.map(c=>`<option ${e?.category===c?'selected':''}>${c}</option>`).join('')}</select></label><label class="field">Data<input name="date" type="date" required min="2026-09-01" max="2100-12-31" value="${e?e.date:today()}"></label></div><div class="row"><button>${e?'Salvar alteração':'Adicionar registro'}</button>${e?'<button type="button" class="quiet" data-action="cancel-edit">Cancelar edição</button>':''}</div></form></section><section class="card"><h2>Movimentações do mês</h2>${t.selected.length?`<div class="table-wrap"><table><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Valor</th><th>Ações</th></tr></thead><tbody>${[...t.selected].sort((a,b)=>b.date.localeCompare(a.date)).map(r=>`<tr><td>${r.date.split('-').reverse().join('/')}</td><td>${esc(r.description)}</td><td>${esc(r.category)}</td><td class="amount ${r.type==='income'?'positive':'negative'}">${r.type==='income'?'+':'−'} ${money(r.amount)}</td><td><div class="row"><button class="quiet" data-action="edit" data-id="${esc(r.id)}" aria-label="Editar ${esc(r.description)}">Editar</button><button class="danger" data-action="delete-entry" data-id="${esc(r.id)}" aria-label="Excluir ${esc(r.description)}">Excluir</button></div></td></tr>`).join('')}</tbody></table></div>`:'<p class="empty">Nenhum registro neste mês. Comece por uma entrada ou uma despesa.</p>'}<div class="bars">${C.categories.map(c=>{const n=t.selected.filter(e=>e.type==='expense'&&e.category===c).reduce((a,e)=>a+e.amount,0);return n?`<div class="bar"><div class="row between"><span>${c}</span><strong>${money(n)}</strong></div><div class="bar-line"><span style="width:${n/t.expense*100}%"></span></div></div>`:'';}).join('')}</div></section>`;
  }
  function manual() {
    return `<article class="manual">${heading('Para conversar e levar para casa','Manual da Família Financeiramente Organizada','Pequenos hábitos para planejar e conversar sobre dinheiro em casa.')}<button class="no-print" data-action="print">Imprimir / salvar em PDF</button><section class="card" style="margin-top:24px"><h2>1. Uma conversa sem culpa</h2><p>Escolham um momento tranquilo para falar sobre o que a família precisa e o que gostaria de realizar. Jovens podem participar com ideias; a responsabilidade pelas contas é dos adultos. Cada família tem recursos e necessidades diferentes.</p></section><section class="card"><h2>2. Anotem o que entra e o que sai</h2><p>Em “Orçamento familiar”, escolham o mês. Registrem o dinheiro recebido como entrada e os gastos como saída. Usem a data em que o valor foi recebido ou pago. A aplicação usa regime de caixa: uma compra parcelada deve ter cada parcela registrada somente quando paga.</p><p>Exemplo fictício: entram R$ 1.000 e saem R$ 750 no mês. O saldo registrado é R$ 250. Confiram se todas as despesas já foram anotadas antes de decidir como usar esse valor.</p></section><section class="card"><h2>3. Separem prioridades de vontades</h2><p>Alimentação, moradia e transporte podem ser prioridades. Lazer também pode fazer parte do plano. Antes de comprar, perguntem: precisamos agora? Cabe no que temos? Podemos comparar preços ou esperar?</p></section><section class="card"><h2>4. Construam uma meta possível</h2><p>Escolham um objetivo, definam o valor total e registrem no cofre cada quantia realmente separada. Exemplo: uma meta de R$ 60 pode ser dividida em quatro partes de R$ 15. Se não for possível guardar neste mês, ajustem o plano sem culpa.</p><p>O cofre é um acompanhamento separado, não uma conta bancária. Guardar ou retirar no cofre não cria entradas nem saídas no orçamento. Evitem contar uma transferência entre reservas como uma nova renda.</p></section><section class="card"><h2>5. Revisem juntos</h2><ul><li>Uma vez por semana, confiram os registros e corrijam erros.</li><li>Conversem sobre um gasto que poderia ser planejado melhor.</li><li>Reconheçam o aprendizado e as pequenas conquistas.</li></ul></section><section class="card"><h2>Como cuidar dos registros</h2><p>Os dados ficam somente no navegador deste aparelho, sem senha e sem sincronização. Pessoas que usam o mesmo perfil do navegador podem vê-los. Em um computador compartilhado, mantenham seus registros privados e apaguem os dados ao terminar, depois de guardar uma cópia se necessário.</p><p>Em “Meus dados”, exportem um backup JSON e guardem o arquivo em local privado. Limpar os dados do navegador ou mudar de aparelho pode apagar ou ocultar os registros. Para recuperar, abram o aplicativo e importem o backup. O CSV serve para consultar o mês em uma planilha; não restaura o aplicativo.</p></section><section class="card"><h2>Uma atividade para fazer em família</h2><p>Imaginem R$ 100 para uma semana: reservem R$ 30 para transporte, R$ 20 para uma meta e decidam juntos como usar os R$ 50 restantes. Que escolha mudaria se aparecesse uma despesa necessária?</p><p><strong>Equipe:</strong> Gabriel Holanda Costa, Paulo Sérgio da Silva Moura Júnior e Vinicius Kauã Nascimento da Silva.</p></section></article>`;
  }
  function dataPage() {
    return heading('Meus dados','Você cuida dos seus registros.','O aplicativo funciona neste aparelho. Não há conta, sincronização ou envio de registros pela internet.')+`<div class="two"><section class="card"><h2>Guardar uma cópia</h2><p>O backup JSON inclui registros, metas e progresso no jogo. Guarde em local privado.</p><button data-action="export">Exportar backup</button></section><section class="card"><h2>Restaurar uma cópia</h2><p>O arquivo será validado antes da confirmação. A restauração substitui os dados atuais.</p><label class="field upload-field">Arquivo de backup (.json)<input class="sr-only" type="file" id="import-file" aria-label="Arquivo de backup (.json)" accept=".json,application/json"><span class="upload-trigger">Escolher arquivo</span><span id="file-name" class="file-name">Nenhum arquivo selecionado</span></label><button data-action="import">Validar e restaurar</button></section><section class="card"><h2>Explorar com exemplos</h2><p>Experimente um orçamento e uma meta com valores fictícios. Seus dados precisam estar vazios.</p><button class="secondary" data-action="demo">Carregar exemplo fictício</button></section><section class="card"><h2>Apagar neste navegador</h2><p>Remove os dados deste aplicativo. Arquivos de backup já baixados continuam no aparelho.</p><button class="danger" data-action="clear">Apagar todos os dados</button></section></div><p class="notice">Sem senha: qualquer pessoa com acesso a este perfil do navegador pode abrir os registros. Evite registrar informações pessoais em aparelhos compartilhados.</p>`;
  }
  function route() { return location.hash.slice(1) || 'inicio'; }
  function render() {
    const pages={inicio:home,jogo:game,metas:goals,orcamento:budget,manual,dados:dataPage};
    const current = pages[route()]?route():'inicio';
    main.innerHTML=(storageProblem?`<p class="notice error" role="alert">${esc(storageProblem)}</p>`:'')+pages[current]();
    document.querySelectorAll('nav a').forEach(a=>{if(a.hash==='#'+current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  }
  function download(content, type, filename) {
    const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
  }
  // Fórmulas não devem ser executadas ao abrir descrições em planilhas.
  const csvCell = value => '"'+String(value).replace(/^[\s]*[=+@-]/,m=>"'"+m).replace(/"/g,'""')+'"';
  main.addEventListener('change',event=>{
    if(event.target.id==='import-file'){document.querySelector('#file-name').textContent=event.target.files[0]?.name||'Nenhum arquivo selecionado';return;}
    if (!['month-select','year-select'].includes(event.target.id)) return;
    const year=document.querySelector('#year-select').value;
    let selectedMonth=document.querySelector('#month-select').value;
    if(year==='2026' && selectedMonth<'09') selectedMonth='09';
    const candidate=`${year}-${selectedMonth}`;
    if(C.validMonth(candidate)) month=candidate; else toast('Escolha um mês a partir de setembro de 2026.');
    const focusId=event.target.id;render();document.getElementById(focusId)?.focus();
  });
  main.addEventListener('submit',event=>{
    event.preventDefault(); const form=event.target, f=new FormData(form);
    try {
      if(form.id==='goal-form') {
        if(state.goals.length>=100)throw Error('Limite de 100 metas atingido. Exclua uma meta para continuar.');
        const name=f.get('name').trim();if(!name)throw Error('Dê um nome à meta.');
        state.goals.push({id:id(),name,target:C.moneyInput(f.get('target')),saved:0});commit('Meta criada.');
      } else if(form.classList.contains('deposit')) {
        const g=state.goals.find(g=>g.id===form.dataset.id), amount=C.moneyInput(f.get('amount'));
        const remove=event.submitter?.value==='remove';
        if(remove&&amount>g.saved)throw Error('Você não pode retirar mais do que está guardado.');
        if(!remove&&amount>g.target-g.saved)throw Error('O valor ultrapassa o que falta para esta meta.');
        g.saved+=remove?-amount:amount;commit(remove?'Valor retirado do registro da meta.':'Valor guardado no registro da meta.');
      } else if(form.id==='entry-form') {
        const description=f.get('description').trim(), date=f.get('date');
        if(!description)throw Error('Informe uma descrição.');if(!C.validDate(date)||!C.validMonth(date.slice(0,7)))throw Error('Escolha uma data a partir de setembro de 2026, até dezembro de 2100.');
        if(!editing&&state.entries.length>=10000)throw Error('Limite de registros atingido. Exporte uma cópia antes de remover registros antigos.');
        const entry={id:editing||id(),description,date,type:f.get('type'),category:f.get('category'),amount:C.moneyInput(f.get('amount'))};
        if(editing)state.entries=state.entries.map(e=>e.id===editing?entry:e);else state.entries.push(entry);
        editing=null;month=date.slice(0,7);commit('Registro salvo.');
      }
    } catch(error) { toast(error.message); }
  });
  main.addEventListener('click',async event=>{
    const button=event.target.closest('[data-action]');if(!button)return;
    const action=button.dataset.action, key=button.dataset.id;
    try {
      if(action==='answer'){state.game=C.answerQuestion(state.game,Number(button.dataset.value));commit('');main.focus();}
      if(action==='next'){state.game=C.continueGame(state.game);commit('');main.focus();}
      if(action==='advance'){state.game=C.advanceGame(state.game);commit(state.game.level===20?'Jornada concluída!':'Nova fase desbloqueada!');main.focus();window.scrollTo(0,0);}
      if(action==='retry'){state.game=C.retryGame(state.game);commit('Uma nova tentativa. Você consegue!');main.focus();window.scrollTo(0,0);}
      if(action==='delete-goal'&&confirm('Excluir esta meta e o histórico do valor guardado?')){state.goals=state.goals.filter(g=>g.id!==key);commit('Meta excluída.');}
      if(action==='delete-entry'&&confirm('Excluir este registro do orçamento?')){state.entries=state.entries.filter(e=>e.id!==key);if(editing===key)editing=null;commit('Registro excluído.');}
      if(action==='edit'){editing=key;render();document.querySelector('#entry-form input').focus();}
      if(action==='cancel-edit'){editing=null;render();}
      if(action==='print')window.print();
      if(action==='export')download(JSON.stringify(state,null,2),'application/json','cofre-backup-'+today()+'.json');
      if(action==='csv'){
        const rows=[['Data','Descrição','Categoria','Tipo','Valor (R$)'],...C.totals(state.entries,month).selected.map(e=>[e.date,e.description,e.category,e.type==='income'?'Entrada':'Saída',(e.amount/100).toFixed(2).replace('.',',')])];
        download('\ufeff'+rows.map(r=>r.map(csvCell).join(';')).join('\r\n'),'text/csv;charset=utf-8',`cofre-${month}.csv`);
      }
      if(action==='import'){
        const file=document.querySelector('#import-file').files[0];if(!file)throw Error('Selecione um arquivo JSON.');if(file.size>5000000)throw Error('O backup deve ter até 5 MB.');
        let restored;try{restored=C.validate(JSON.parse(await file.text()));}catch{throw Error('Arquivo inválido. Os dados atuais foram preservados.');}
        if(confirm(`Restaurar ${restored.entries.length} registros e ${restored.goals.length} metas? Isso substitui os dados atuais.`)){state=restored;storageProblem='';editing=null;commit('Backup restaurado.');}
      }
      if(action==='demo'){
        if(state.entries.length||state.goals.length||state.game.answers.length||state.game.level)throw Error('Para preservar seus dados, o exemplo só pode ser carregado com o aplicativo vazio.');
        state.entries=[{id:id(),description:'Renda de exemplo',amount:200000,date:today(),type:'income',category:'Outros'},{id:id(),description:'Mercado fictício',amount:45000,date:today(),type:'expense',category:'Alimentação'},{id:id(),description:'Transporte fictício',amount:15000,date:today(),type:'expense',category:'Transporte'}];
        state.goals=[{id:id(),name:'Livro · exemplo fictício',target:8000,saved:2000}];commit('Exemplos fictícios carregados.');
      }
      if(action==='clear'&&confirm('Apagar todos os registros, metas e respostas deste navegador? Exporte um backup antes, se precisar.')){
        try{localStorage.removeItem(KEY);}catch{throw Error('Não foi possível apagar o armazenamento. Use as configurações do navegador para remover os dados deste aplicativo.');}
        state=C.initial();storageProblem='';editing=null;render();toast('Dados deste aplicativo apagados.');
      }
    }catch(error){toast(error.message);}
  });
  window.addEventListener('hashchange',()=>{editing=null;render();main.focus();window.scrollTo(0,0);});
  // Outra aba não pode sobrescrever silenciosamente registros mais recentes.
  window.addEventListener('storage',event=>{if(event.key===KEY){storageProblem='Os dados foram alterados em outra aba. Recarregue esta página antes de continuar; alterações nesta sessão não serão salvas automaticamente.';render();}});
  render();
})();
