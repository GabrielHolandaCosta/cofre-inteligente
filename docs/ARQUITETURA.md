# Arquitetura e planejamento técnico

## Fonte e escopo

Foi analisado integralmente o texto e o conteúdo das tabelas do arquivo `PEX-MDL-54 -PROJETO DE INTERVENCAO - (DISCIPLINA DE EXTENSAO - DISCENTE).docx`, fornecido na pasta Downloads. A pasta de trabalho estava vazia: não havia código ou estrutura anterior a preservar. O documento foi tratado como fonte de requisitos, não como instrução operacional para executar ações externas.

O documento define uma solução leve, gratuita, simples, lúdica e adaptável à comunidade: jogo simulado, cofre digital de metas, controle doméstico e manual impresso. Define público de 13 a 17 anos, Colégio São Lucas em Maceió e oficina estimada em 90 minutos. O produto mantém esse escopo. Não depende de matrícula, cadastro de menores ou contas bancárias.

Há uma inconsistência a revisar no texto acadêmico: a caracterização cita rede pública ou projeto social, mas a seção do local especifica o Colégio São Lucas. A aplicação usa o local específico sem presumir a natureza administrativa da escola. O cabeçalho do cronograma contém `20__`; datas de entrega especificam 28/09/2026 e 30/11/2026. A equipe deve revisar esses pontos no documento original. As referências bibliográficas são as declaradas pelos autores; não foram verificadas nem ampliadas nesta implementação.

## Stack escolhida e justificativa

HTML5 semântico, CSS3 responsivo e JavaScript puro, sem etapa de compilação. Para um protótipo educacional local, React/Node no produto acrescentariam instalação, ferramentas e dependências sem resolver uma necessidade do documento. Node é opcional apenas para testes. A interface abre por arquivo local e todos os recursos estão na pasta.

O armazenamento é `localStorage`, limitado ao navegador/perfil/origem. Essa é uma decisão explícita de escopo local: não equivale a persistência em servidor. Não há back-end porque o documento não exige contas, compartilhamento simultâneo ou sincronização. Uma versão futura multiusuário exigiria nova arquitetura, autenticação, controle de acesso, política de dados e avaliação da implantação; não é uma funcionalidade desta entrega.

## Organização

```text
index.html                 Estrutura da página e carregamento local
src/
  questions.js             100 perguntas em 20 fases exclusivas
  game-view.js             Trilha, perguntas, feedback e conquista
  core.js                  Dinheiro, datas, orçamento, regras de avanço e backup
  app.js                   Telas, eventos, estado, persistência e exportações
  styles.css               Visual, responsividade, foco e impressão
docs/
  ARQUITETURA.md           Decisões e correspondência ao documento
  GUIA-DA-EQUIPE.md        Uso, testes e apresentação
  VERIFICACAO.md           Evidência e limites dos testes
tests/
  core.test.cjs            Testes unitários com Node nativo
  browser.cjs              Fluxos completos no navegador, opcional
README.md                  Ponto de entrada para a equipe
```

Fluxo: ação do usuário → validação → alteração do estado em memória → gravação local → atualização da tela. Em falha de gravação, mantém o estado na sessão, informa o problema e permite exportação. Se o conteúdo salvo for inválido, não o sobrescreve automaticamente. Alterações detectadas em outra aba bloqueiam a gravação automática até recarregar para evitar perda silenciosa.

## Modelo de dados

O backup tem `version: 2`, `entries`, `goals` e `game`.

| Entidade | Campos | Regras |
|---|---|---|
| Registro | id, description, amount, date, type, category | Descrição até 80 caracteres; tipo entrada/saída; data real; valor positivo |
| Meta | id, name, target, saved | Nome até 80 caracteres; alvo positivo; guardado entre zero e alvo |
| Jogo | level, answers, pending | level de 0 a 20; até cinco respostas da fase; pending indica explicação pendente |

Dinheiro é representado em centavos inteiros. O formato de entrada aceita `25`, `25,50` ou `25.50`, sem separador de milhar. O limite por valor é R$ 9.999.999,99; até 10.000 registros e 100 metas. Esses limites mantêm somas seguras e limitam a carga local. Não há juros ou movimentação de dinheiro real.

A importação limita o arquivo a 5 MB, valida versão, listas, datas, categorias, valores, IDs únicos e progresso. Reconstrói apenas campos conhecidos antes de substituir os dados mediante confirmação. Descrições são escapadas no HTML. CSV usa aspas e neutraliza prefixos de fórmulas. Dados locais e backups não são criptografados: precisam permanecer privados.

## Correspondência ao plano de intervenção

| Necessidade documentada | Implementação | Verificação |
|---|---|---|
| Conceitos de economia interativos | 100 situações exclusivas em 20 fases com explicações | Rodada completa e retomada |
| Jogo simulado em grupos | Situações fictícias sem ranking entre alunos | Discussão antes de cada resposta |
| Cofre digital de metas | Criar meta, guardar, retirar e acompanhar | Limites e conclusão da meta |
| Ferramenta familiar simples | Entradas/saídas por mês e categorias | Saldo e edição/exclusão |
| Material orientativo impresso | Tela Manual da família com estilo de impressão | Pré-visualização da impressão |
| Solução leve e acessível | Sem rede ou dependências de execução | Arquivo local e tela pequena |
| Participação ativa e troca de conhecimentos | Roteiro de 90 minutos e perguntas abertas | Execução presencial pela equipe |

O nome visual, as histórias, a pontuação e as categorias são decisões de implementação derivadas do escopo, não transcrições do documento. Backup, CSV e modo de exemplo apoiam o uso e a avaliação. O sistema não implementa pesquisa com alunos nem inventa resultados de campo.

## Acessibilidade e manutenção

Há idioma pt-BR, link para pular navegação, foco visível, controles nativos com rótulos, mensagens com região viva, progresso identificado e informações de entrada/saída além da cor. Valores e datas são apresentados em formato brasileiro. Tabelas rolam dentro de seu próprio contêiner; navegação horizontal é intencional em telas pequenas. Não se declara certificação WCAG: teste com leitores de tela e usuários reais continua necessário.

Para alterar o conteúdo do jogo, edite `groups` em `src/questions.js`. As tuplas contêm enunciado, resposta correta, duas alternativas e explicação. A posição correta varia na montagem. Mantenha 20 fases de cinco perguntas, salvo se também atualizar as regras e os testes. Não mude IDs/campos de armazenamento sem planejar uma migração e incrementar a versão. Mantenha regras de negócio em `core.js` e a interface em `app.js`.

## Regras da trilha e compatibilidade

`answerQuestion` bloqueia respostas duplicadas, `continueGame` encerra o feedback, `advanceGame` só permite avanço com cinco acertos e `retryGame` só reinicia uma tentativa concluída com erros. `level` conta fases concluídas; a fase ativa é `level + 1`. Com `level = 20`, não há mais perguntas. A trilha fica concluída. O estado é salvo a cada resposta e transição, incluindo a explicação pendente.

O formato 1 é migrado para 2 preservando metas e registros e iniciando a nova trilha vazia. Datas antigas continuam válidas no backup para impedir perda de dados; a consulta e os novos lançamentos aceitam somente setembro de 2026 em diante, até dezembro de 2100. A interface não permite digitar um ano arbitrário: usa seletores com opções válidas e revalida as alterações.
