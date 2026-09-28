/* Teste opcional: requer Playwright instalado e um Chromium disponível. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
(async()=>{
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  try {
    const context=await browser.newContext({viewport:{width:1366,height:900}});
    const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    await page.getByRole('link',{name:'Meus dados',exact:true}).click();await page.getByRole('button',{name:'Carregar exemplo fictício'}).click();
    await page.getByRole('link',{name:'Orçamento familiar',exact:true}).click();
    assert.equal(await page.locator('#year-select option').first().getAttribute('value'),'2026');
    await page.locator('#year-select').selectOption('2027');await page.locator('#month-select').selectOption('01');await page.locator('#year-select').selectOption('2026');
    assert.equal(await page.locator('#month-select').inputValue(),'09');assert.equal(await page.locator('#month-select option').count(),4);
    const now=new Date();await page.locator('#year-select').selectOption(String(Math.max(2026,now.getFullYear())));await page.locator('#month-select').selectOption(String(Math.max(now.getFullYear()===2026?9:1,now.getMonth()+1)).padStart(2,'0'));
    assert.match(await page.locator('main').innerText(),/1\.400,00/);
    await page.locator('input[name=description]').fill('Teste <script>alert(1)</script>');await page.locator('[name=amount]').fill('0,10');await page.getByRole('button',{name:'Adicionar registro',exact:true}).click();
    assert.match(await page.locator('tbody').innerText(),/Teste <script>/);
    await page.getByRole('button',{name:'Editar Teste <script>alert(1)</script>',exact:true}).click();await page.locator('[name=amount]').fill('0,20');await page.getByRole('button',{name:'Salvar alteração'}).click();
    assert.match(await page.locator('main').innerText(),/1\.399,80/);
    await page.reload();assert.match(await page.locator('main').innerText(),/1\.399,80/);
    await page.getByRole('button',{name:'Excluir Teste <script>alert(1)</script>',exact:true}).click();assert.match(await page.locator('main').innerText(),/1\.400,00/);
    await page.getByRole('link',{name:'Meu cofre de metas',exact:true}).click();await page.locator('.deposit input').fill('60');await page.getByRole('button',{name:'Guardar',exact:true}).click();assert.match(await page.locator('main').innerText(),/Meta alcançada/);
    await page.locator('.deposit input').fill('10');await page.getByRole('button',{name:'Retirar / corrigir'}).click();assert.match(await page.locator('main').innerText(),/Faltam R\$\s*10,00/);
    await page.getByRole('link',{name:'Jogo de escolhas',exact:true}).click();
    const C=require('../src/core.js');
    // Um erro bloqueia o avanço, inclusive após recarregar.
    for(let i=0;i<5;i++) {await page.locator('.option').nth((C.levels[0].questions[i].best+(i===0?1:0))%3).click();
      if(i===1){await page.reload();assert.equal(await page.locator('.answer-feedback').count(),1);}
      await page.getByRole('button',{name:/Próxima pergunta|Ver resultado da fase/}).click();}
    assert.match(await page.locator('.phase-result').innerText(),/4 \/ 5/);assert.equal(await page.locator('[data-action=advance]').count(),0);
    await page.getByRole('button',{name:/Tentar esta fase novamente/}).click();
    for(let level=0;level<20;level++) {
      for(const q of C.levels[level].questions){await page.locator('.option').nth(q.best).click();await page.getByRole('button',{name:/Próxima pergunta|Ver resultado da fase/}).click();}
      assert.match(await page.locator('.phase-result').innerText(),/5 \/ 5/);await page.locator('[data-action=advance]').click();
      if(level===0){await page.reload();assert.match(await page.locator('.phase-tag').innerText(),/Fase 2/);}
    }
    assert.match(await page.locator('.finale').innerText(),/Guardião do Cofre/);assert.equal(await page.locator('.trail-node.done').count(),20);
    await page.reload();assert.equal(await page.locator('.finale').count(),1);
    await page.getByRole('link',{name:'Meus dados',exact:true}).click();
    const backupWait=page.waitForEvent('download');await page.getByRole('button',{name:'Exportar backup',exact:true}).click();const backup=await backupWait;const backupPath=await backup.path();
    await page.getByRole('button',{name:'Apagar todos os dados',exact:true}).click();await page.locator('#import-file').setInputFiles(backupPath);await page.getByRole('button',{name:'Validar e restaurar'}).click();
    await page.getByRole('link',{name:'Orçamento familiar',exact:true}).click();assert.match(await page.locator('main').innerText(),/1\.400,00/);
    await page.getByRole('link',{name:'Visão geral',exact:true}).click();await page.screenshot({path:path.resolve(__dirname,'../docs/desktop.png'),fullPage:true});
    await page.setViewportSize({width:390,height:844});
    for(const name of ['Visão geral','Jogo de escolhas','Meu cofre de metas','Orçamento familiar','Manual da família','Meus dados']) {
      await page.getByRole('link',{name,exact:true}).click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow em ${name}`);
    }
    await page.getByRole('link',{name:'Meu cofre de metas',exact:true}).click();await page.screenshot({path:path.resolve(__dirname,'../docs/mobile.png'),fullPage:true});
    await page.locator('input[name=name]').fill('Nova meta de teste');await page.locator('input[name=target]').fill('100');await page.getByRole('button',{name:'Criar meta',exact:true}).click();
    assert.equal(await page.locator('.goal').count(),2);
    await page.locator('.goal').last().locator('input[name=amount]').fill('101');await page.locator('.goal').last().getByRole('button',{name:'Guardar',exact:true}).click();assert.match(await page.locator('#status').innerText(),/ultrapassa/);
    await page.getByRole('link',{name:'Meus dados',exact:true}).click();
    await page.locator('#import-file').setInputFiles({name:'invalido.json',mimeType:'application/json',buffer:Buffer.from('{"version":9}')});await page.getByRole('button',{name:'Validar e restaurar'}).click();assert.match(await page.locator('#status').innerText(),/preservados/);
    await page.getByRole('link',{name:'Meu cofre de metas',exact:true}).click();assert.equal(await page.locator('.goal').count(),2);
    await context.setOffline(true);await page.reload();assert.equal(await page.locator('.goal').count(),2);
    await page.getByRole('link',{name:'Manual da família',exact:true}).click();await page.emulateMedia({media:'print'});assert.equal(await page.locator('nav').isVisible(),false);assert.equal(await page.locator('.manual').isVisible(),true);await page.screenshot({path:path.resolve(__dirname,'../docs/manual-print.png'),fullPage:true});
    assert.deepEqual(errors,[]);console.log('PASS: criação/edição/exclusão, cálculos, persistência, metas, jogo, backup, texto seguro e seis telas em 390px.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

