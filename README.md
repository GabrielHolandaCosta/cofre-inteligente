# Cofre Inteligente

Aplicação educacional para a oficina de educação financeira do Colégio São Lucas, em Maceió, com jovens de 13 a 17 anos e suas famílias. Projeto de Atividades Práticas Interdisciplinares de Extensão III — Ciência da Computação, UNINASSAU.

## Abrir e usar

1. Mantenha `index.html` e a pasta `src` juntos.
2. Dê dois cliques em `index.html` e abra com Edge, Chrome ou Firefox atualizado.
3. Use **Jogo de escolhas**, **Meu cofre de metas** ou **Orçamento familiar**.
4. Em **Meus dados**, exporte um backup antes de mudar de computador, mover a pasta ou limpar o navegador.

Não exige instalação, conta, internet, servidor ou comando. O jogo e os registros funcionam localmente. A disponibilidade do armazenamento ao abrir arquivos locais depende do navegador; se houver bloqueio, o aplicativo informa e permite exportar a sessão. Use sempre o mesmo navegador e caminho para manter continuidade. Não use modo anônimo para registros que deseja conservar.

Para servir por HTTP, opcionalmente, com Python instalado, abra um terminal nesta pasta, execute `python -m http.server 8080 --bind 127.0.0.1` e acesse `http://127.0.0.1:8080`. Encerre com Ctrl+C. Os dados de `file://` e de `http://localhost`/`127.0.0.1` são separados; transfira-os por backup. Não exponha o servidor na rede da escola.

## O que foi entregue

- Trilha com 20 fases e 100 perguntas exclusivas, explicação a cada resposta, progresso salvo e conquista final. Cada fase exige cinco acertos na mesma tentativa.
- Metas com valor-alvo, depósitos, retiradas/correções e barra de progresso.
- Orçamento mensal a partir de setembro de 2026, com criação, edição e exclusão de registros, categorias, saldo e distribuição de despesas.
- Backup JSON validado, restauração com confirmação e exportação mensal CSV.
- Manual da família na aplicação, pronto para imprimir ou salvar em PDF pelo navegador.
- Exemplos fictícios para apresentação, sem substituir dados existentes.
- Layout responsivo, navegação por teclado, rótulos e mensagens anunciadas para tecnologias assistivas.

## Documentação da equipe

- [Arquitetura e rastreabilidade](docs/ARQUITETURA.md)
- [Execução, testes e roteiro da oficina](docs/GUIA-DA-EQUIPE.md)
- [Resultados da verificação](docs/VERIFICACAO.md)

## Testes automatizados

Com Node.js instalado, execute `node --test tests/core.test.cjs`. São testes nativos, sem instalar bibliotecas.

O teste opcional de navegador está em `tests/browser.cjs`. Requer Playwright disponível (`npm install --no-save playwright`) e Microsoft Edge instalado. Execute `node tests/browser.cjs`. Ele usa um perfil temporário, dados fictícios e gera imagens em `docs`. A execução normal do aplicativo não usa nenhuma dessas dependências.

## Limites importantes

Os registros pertencem ao navegador, não a uma conta. Não há senha, criptografia própria, sincronização, banco de dados remoto ou integração bancária. Metas são registros independentes: guardar R$ 10 no cofre não cria automaticamente uma despesa no orçamento. O orçamento considera recebimentos e pagamentos efetivos de cada mês e não transporta saldo de meses anteriores. Não existe cálculo de juros ou recomendação de investimento.

Na oficina, use somente valores fictícios. Não solicite renda real, documentos, dados bancários ou cadastros dos alunos. O projeto não coleta métricas automaticamente nem comprova resultados da intervenção: esses resultados deverão ser observados e relatados pela equipe após a ação.

Equipe: Gabriel Holanda Costa, Paulo Sérgio da Silva Moura Júnior e Vinicius Kauã Nascimento da Silva.

## Atualização da trilha

Cada fase tem cinco perguntas próprias. As perguntas não se repetem entre fases; uma tentativa com erros repete somente as cinco da fase atual até obter 5/5. Não é possível pular fases. Depois das vinte, a jornada exibe a conquista final e permanece concluída. O backup preserva também o estado da pergunta e sua explicação.

Backups da versão anterior continuam aceitos: metas e registros são mantidos, e a nova trilha começa na fase 1. O antigo questionário único não equivale a uma fase concluída na nova jornada. Registros antigos anteriores a setembro de 2026 são preservados no backup, mas não aparecem na consulta, cujo início agora é fixado em setembro de 2026. A atualização não apaga os dados da família.

A consulta usa listas de mês/ano de setembro de 2026 até dezembro de 2100. Novos lançamentos seguem o mesmo limite. Para revisar as seis telas em cinco larguras, execute o teste opcional `node tests/layout.cjs`, com os mesmos requisitos do teste de navegador.
