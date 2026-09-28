/* Revisão das seis telas em celular, tablet e desktop, com perfil temporário. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
(async()=>{
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try {
    const context=await browser.newContext();const page=await context.newPage();
    const url=pathToFileURL(path.resolve(__dirname,'../index.html')).href;
    await page.goto(url);
    const pages=[['Visão geral','inicio'],['Jogo de escolhas','jogo'],['Meu cofre de metas','metas'],['Orçamento familiar','orcamento'],['Manual da família','manual'],['Meus dados','dados']];
    for(const width of [320,390,768,1024,1366]) {
      await page.setViewportSize({width,height:900});
      for(const [name,slug] of pages){
        await page.getByRole('link',{name,exact:true}).click();
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Página transbordou: ${width} ${slug}`);
        const clipped=await page.locator('main button, main .card h1, main .card h2, main .card h3, main .card p').evaluateAll(nodes=>nodes.filter(n=>n.scrollWidth>n.clientWidth+2).map(n=>n.textContent));
        assert.deepEqual(clipped,[],`Texto transbordou: ${width} ${slug}`);
        if([390,1366].includes(width))await page.screenshot({path:path.resolve(__dirname,`../docs/revisao-${slug}-${width}.png`),fullPage:true});
      }
    }
    // Verifica também texto muito longo nos registros e títulos de metas.
    await page.setViewportSize({width:320,height:900});await page.getByRole('link',{name:'Meu cofre de metas',exact:true}).click();
    await page.locator('input[name=name]').fill('Minha meta com um nome comprido para conferir a organização dos textos na tela');await page.locator('input[name=target]').fill('9999999,99');await page.getByRole('button',{name:'Criar meta',exact:true}).click();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.getByRole('link',{name:'Orçamento familiar',exact:true}).click();await page.locator('input[name=description]').fill('Descrição muito longa de uma compra para conferir a organização dos registros');await page.locator('input[name=amount]').fill('9999999,99');await page.getByRole('button',{name:'Adicionar registro',exact:true}).click();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    console.log('PASS: 30 combinações de tela/largura, textos sem transbordamento e registros longos em 320px.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
