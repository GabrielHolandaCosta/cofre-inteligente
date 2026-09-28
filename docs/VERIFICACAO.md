# Registro de verificação

Revisão de 27/09/2026 — trilha de 20 fases, 100 perguntas e consulta mensal a partir de setembro de 2026. Testes no Windows com Microsoft Edge, Playwright e Node.js, usando perfil temporário e dados fictícios.

## Resultados

- **12 testes unitários aprovados:** cálculos em centavos, valores inválidos, datas, saldo, backup, 100 enunciados/IDs exclusivos, bloqueio de avanço com erro, conclusão das 20 fases, migração do formato anterior, rejeição de estados inválidos e limite mensal.
- **Jornada completa no navegador:** uma tentativa com erro ficou bloqueada; após repetir a fase, as 100 perguntas foram respondidas e as 20 fases concluídas pelos controles da interface. A conquista final permaneceu após recarregar.
- **Retomada:** recarregar durante uma explicação manteve resposta e feedback; recarregar após a primeira fase manteve a fase 2 desbloqueada.
- **Orçamento:** inclusão, edição, exclusão, saldo e persistência aprovados. O seletor de ano começa em 2026; ao voltar de janeiro de 2027 para 2026, o mês passa a setembro e só setembro–dezembro ficam disponíveis.
- **Metas:** criação, conclusão, retirada e recusa de depósito acima do alvo aprovadas.
- **Backup:** exportação, limpeza e restauração aprovadas; backup inválido não substituiu os dados. A validação da versão 1 preserva metas e registros ao criar a nova trilha.
- **Interface:** seis telas verificadas em 320, 390, 768, 1024 e 1366px, totalizando 30 combinações. Nenhuma apresentou transbordamento horizontal da página ou dos textos de botões/cartões verificados. Registros com nomes longos e valores máximos também foram exercitados em 320px.
- **Revisão visual:** capturas das seis telas em desktop e celular foram abertas e inspecionadas. A frase lateral não tem quebras forçadas; título, cartões, seletor mensal e trilha têm espaçamentos responsivos. O seletor de backup ganhou nome do arquivo em uma linha própria com quebra natural.
- **Segurança de texto:** descrição contendo marcação de script foi tratada como texto.
- **Offline:** recarga sem conexão manteve as metas.
- **Impressão:** mídia de impressão manteve o manual visível e ocultou a navegação.
- **JavaScript:** nenhum erro de página capturado no fluxo automatizado.

## Reproduzir

```text
node --test tests/core.test.cjs
node tests/browser.cjs
node tests/layout.cjs
```

Os dois últimos exigem Playwright e Microsoft Edge. A execução normal do aplicativo continua sem dependências. As imagens em `docs` são evidências de revisão e não são carregadas pela aplicação.

## Limites

A revisão não equivale a certificação de acessibilidade nem a teste em todos os dispositivos. Não foram feitos testes com leitores de tela, impressora física ou usuários reais. Larguras de celular foram simuladas no navegador desktop. Falhas de quota e conflitos entre abas não foram reproduzidos. O roteiro da equipe conserva um checklist para verificação no equipamento da escola.

## Comportamentos deliberados

As perguntas são exclusivas entre fases. Em caso de erro, repete-se a fase atual: não se descartam as fases concluídas. A trilha inicia na fase 1 ao migrar o antigo jogo de cinco perguntas, sem apagar orçamento ou metas. Registros anteriores a setembro de 2026 são mantidos nos backups, mas ficam fora da nova consulta mensal.
