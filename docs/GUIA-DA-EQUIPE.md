# Guia de execução, testes e apresentação

## Preparação no dia anterior

1. Copiem a pasta completa para o computador da apresentação e para um pendrive.
2. Abram `index.html` no navegador escolhido. Não é preciso instalar o Node para apresentar.
3. Em **Meus dados**, usem **Carregar exemplo fictício** com a aplicação vazia. Se já houver dados importantes, exportem um backup antes de apagá-los.
4. Confiram orçamento: entrada de R$ 2.000; saídas de R$ 450 e R$ 150; saldo de R$ 1.400. O mês é o atual do computador.
5. Abram **Manual da família → Imprimir / salvar em PDF**. Escolham A4, escala 100% e confiram a prévia antes de imprimir. A quantidade de páginas varia por navegador/configuração.
6. Desliguem a conexão e repitam a navegação: nenhum recurso do produto depende de internet.
7. Confiram projetor, zoom e tamanho da fonte. Levem cópias impressas e um backup fictício.

Se abrir no celular a partir de um gerenciador de arquivos não funcionar, usem o computador para a demonstração; abertura local em celulares depende do sistema/navegador. O layout é responsivo, mas a distribuição por link na internet não faz parte desta entrega.

## Divisão sugerida

| Integrante | Papel na oficina |
|---|---|
| Gabriel | Apresentar contexto, conduzir a roda de conversa e explicar o cofre |
| Paulo | Operar o jogo no projetor e pedir justificativas aos grupos |
| Vinicius | Demonstrar orçamento, apoiar dúvidas e orientar sobre o manual/backup |

Esta divisão é uma proposta operacional; o documento não atribui papéis individuais.

## Roteiro para 90 minutos na escola

| Tempo | Atividade |
|---|---|
| 0–10 min | Acolhida: “O que você gostaria de planejar?” Explicar que todos os valores serão fictícios |
| 10–25 min | História: um jovem tem R$ 100, transporte de R$ 30 e meta de R$ 20; turma discute os R$ 50 restantes |
| 25–50 min | Uma fase de cinco perguntas em grupos: ler, discutir e explicar; repetir a fase se necessário |
| 50–65 min | Criar uma meta de R$ 80 e registrar R$ 20; conversar sobre o que falta |
| 65–80 min | Mostrar orçamento fictício; adicionar, editar e excluir uma saída; mudar o mês |
| 80–90 min | Entregar o manual, responder dúvidas e pedir a cada grupo um aprendizado |

Não atribuam aos jovens a obrigação de resolver dificuldades financeiras da família. Falem de hábitos e escolhas possíveis, sem constrangimento por renda ou capacidade de poupar. Registros de presença e imagens devem seguir o procedimento aprovado pela instituição; o aplicativo não coleta esses dados.

## Demonstração curta para a faculdade (8–10 minutos)

1. **Contexto (1 min):** público, escola, objetivo e requisitos do documento.
2. **Jogo (2 min):** uma escolha, feedback e retomada do progresso.
3. **Cofre (1 min):** exemplo de livro de R$ 80, com R$ 20 guardados; registrar mais R$ 10.
4. **Orçamento (2 min):** adicionar uma saída de R$ 25,50. Saldo inicial de R$ 1.400 passa a R$ 1.374,50. Editar para R$ 20: saldo R$ 1.380. Excluir: saldo R$ 1.400.
5. **Manual e dados (1 min):** prévia de impressão, backup e privacidade local.
6. **Arquitetura e testes (1–2 min):** sem dependências de execução, centavos inteiros, testes de valores/datas/importação e limites do protótipo.

## Checklist de aceitação manual

Use somente dados fictícios. Marque resultado, navegador e data em uma cópia deste guia.

| Caso | Passos | Resultado esperado |
|---|---|---|
| Primeira abertura | Abrir com perfil sem dados | Totais zero e instruções de início |
| Exemplo | Carregar exemplo em Meus dados | Saldo R$ 1.400, meta R$ 80 com R$ 20 |
| Prevenção de substituição | Tentar carregar exemplo outra vez | Dados preservados e mensagem |
| Entrada e saída | Registrar R$ 100 de entrada e R$ 25,50 de saída | Saldo aumenta R$ 74,50 |
| Edição/exclusão | Alterar valor e excluir registro | Totais recalculados |
| Mês | Consultar um mês sem registros | Totais zero; registros de outro mês preservados |
| Saldo negativo | Criar saída superior às entradas | Saldo negativo e orientação sem julgamento |
| Validação monetária | Tentar zero, negativo, três casas decimais | Mensagem, sem criar registro |
| Meta | Criar R$ 100; guardar R$ 20; retirar R$ 5 | R$ 15 guardados e R$ 85 restantes |
| Limites da meta | Retirar R$ 16 ou guardar R$ 86 no cenário anterior | Operação recusada |
| Conclusão | Completar a meta | 100%, mensagem e botão Guardar desabilitado |
| Jogo | Concluir uma fase com um erro | Avanço bloqueado; nova tentativa da mesma fase |
| Avanço | Acertar as cinco perguntas | Próxima fase com cinco perguntas diferentes |
| Jornada | Completar as vinte fases | 100 perguntas superadas e conquista final |
| Retomada | Recarregar durante uma explicação | Mesma explicação e progresso preservados |
| Limite mensal | Selecionar 2026 | Somente setembro a dezembro disponíveis |
| Persistência | Recarregar com registros | Estado mantido se armazenamento permitido |
| Backup | Exportar, apagar, importar e confirmar | Registros, metas e jogo restaurados |
| Backup inválido | Importar texto que não seja JSON válido | Erro sem substituir dados |
| Cancelamento | Cancelar exclusão ou restauração | Estado preservado |
| CSV | Exportar mês e abrir em planilha | Cabeçalhos e valores em reais do mês |
| Impressão | Abrir manual e prévia | Conteúdo do manual sem menus/botões |
| Teclado | Tab, Shift+Tab, Enter e espaço | Foco visível; controles operáveis |
| Tela pequena | Largura de 390px; testar seis telas | Sem corte da página; tabela/nav podem rolar internamente |
| Fonte maior | Zoom de 200% | Texto e controles utilizáveis |
| Offline | Desligar conexão e recarregar arquivo | Jogo, cofre e orçamento funcionam |
| Limpeza | Apagar em Meus dados e recarregar | Aplicação vazia |

## Problemas comuns

- **Tela não abre corretamente:** confirme que `src` está ao lado de `index.html`, que JavaScript está habilitado e que o arquivo foi aberto em navegador, não em editor.
- **Dados não aparecem em outro computador:** restaure o JSON; não existe sincronização automática.
- **Aviso de armazenamento:** exporte o backup antes de fechar. Use um perfil normal do navegador e verifique permissões/espaço.
- **Saldo inesperado:** confira mês, tipo de registro e duplicações. O saldo não inclui meses anteriores ou o cofre.
- **Data do exemplo diferente da oficina:** os exemplos usam a data local do computador. Confira a seleção do mês.
- **Falha durante apresentação:** a pasta no pendrive permite abrir o aplicativo em outro computador; o backup restaura os exemplos. O manual impresso permite continuar a dinâmica.

## Depois da oficina

Registrem apenas o que ocorreu: número de participantes conforme procedimento da escola, dúvidas frequentes, dificuldades observadas e sugestões. Não afirmem melhora de renda, redução de estresse ou mudança de comportamento sem evidências. O documento prevê visita em outubro, organização dos comprovantes em outubro/novembro e relatório final em 30/11/2026. Revisem o cronograma com a instituição.

## Organização da nova jornada

A oficina pode trabalhar uma ou algumas fases, sem exigir que a turma termine as 100 perguntas em 90 minutos. As demais ficam para continuar depois no mesmo aparelho ou por backup. Errar não remove conquistas anteriores: repete-se apenas a fase atual. As vinte fases têm conjuntos exclusivos de perguntas.

Na apresentação, mostrem uma tentativa com erro para evidenciar o bloqueio, depois uma com 5/5 para desbloquear a próxima fase. A versão anterior do questionário começa uma nova trilha ao atualizar, mantendo orçamento e metas.
