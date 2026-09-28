/* Banco autoral: 20 fases temáticas, cinco perguntas exclusivas por fase.
   Em cada tupla: enunciado, resposta correta, duas alternativas e explicação.
   A posição da resposta correta varia; o conteúdo não depende de rede. */
(function(root) {
  'use strict';
  const groups = [
    ['Primeiros passos', 'Comece pelas escolhas do dia a dia.', [
      ['Você tem R$ 100. Separa R$ 30 para transporte e R$ 20 para um livro. Quanto sobra para um passeio?', 'R$ 50.', 'R$ 70.', 'R$ 80.', '100 − 30 − 20 = 50. Separar as prioridades mostra o valor disponível.'],
      ['Seu fone funciona, mas outro está em promoção. Qual atitude ajuda a evitar uma compra por impulso?', 'Esperar e avaliar se ele é uma prioridade.', 'Comprar antes de pensar.', 'Comprar dois por estarem em promoção.', 'Uma promoção só é útil quando a compra faz sentido para você e cabe no orçamento.'],
      ['Um lanche extra custa R$ 6 por dia. Quanto custam cinco lanches?', 'R$ 30.', 'R$ 11.', 'R$ 36.', '6 × 5 = 30. Gastos pequenos também se acumulam.'],
      ['Apareceu uma despesa necessária em casa. Qual é o primeiro passo para reorganizar o plano?', 'Conversar em família e rever as prioridades.', 'Esconder a despesa.', 'Culpar quem percebeu o problema.', 'Conversar ajuda a ajustar o plano. A responsabilidade pelas contas é dos adultos.'],
      ['Faltam R$ 60 para uma meta. Guardando R$ 15 por semana, sem juros, quantas semanas faltam?', '4 semanas.', '3 semanas.', '6 semanas.', '60 ÷ 15 = 4. Dividir a meta ajuda a acompanhar o caminho.']
    ]],
    ['Necessidades e desejos', 'Descubra o que vem primeiro.', [
      ['O tênis usado para ir à escola rasgou e você também quer um enfeite novo. Com dinheiro para apenas um, o que priorizar?', 'Um calçado adequado para ir à escola.', 'O enfeite, sem avaliar o calçado.', 'Decidir só pela embalagem mais bonita.', 'Neste caso, o calçado atende a uma necessidade imediata.'],
      ['Você quer um item porque todos os amigos têm. O que ajuda a decidir?', 'Pensar se você vai usar e se cabe no seu plano.', 'Comprar para evitar qualquer diferença.', 'Concluir que toda vontade é uma obrigação.', 'Uma vontade pode fazer parte do plano, mas a pressão do grupo não precisa decidir por você.'],
      ['Qual lista facilita organizar as compras da semana?', 'Itens necessários e quantidades.', 'Tudo o que aparecer em anúncios.', 'Apenas produtos com embalagem colorida.', 'Uma lista baseada no que falta ajuda a evitar esquecimentos e excessos.'],
      ['Um passeio foi planejado e cabe no valor disponível. Como pensar sobre esse lazer?', 'Ele pode fazer parte de um orçamento equilibrado.', 'Todo lazer é sempre um erro.', 'Por ser lazer, o preço não importa.', 'Planejamento também pode reservar espaço para descanso e diversão.'],
      ['Uma compra pode esperar, mas o transporte de amanhã ainda não está garantido. Qual escolha protege a prioridade?', 'Separar primeiro o transporte.', 'Comprar e torcer para sobrar.', 'Ignorar a data da necessidade.', 'O prazo da necessidade importa ao decidir a ordem dos gastos.']
    ]],
    ['Dinheiro na ponta do lápis', 'Some, confira e descubra o saldo.', [
      ['Você recebeu R$ 40 e gastou R$ 12. Quanto restou?', 'R$ 28.', 'R$ 32.', 'R$ 52.', '40 − 12 = 28. O saldo é o que sobra depois do gasto.'],
      ['Dois cadernos custam R$ 9 cada. Qual é o total?', 'R$ 18.', 'R$ 11.', 'R$ 27.', '9 × 2 = 18. Compare o total com o dinheiro disponível.'],
      ['Uma compra de R$ 17,50 foi paga com R$ 20. Qual é o troco?', 'R$ 2,50.', 'R$ 3,50.', 'R$ 7,50.', '20 − 17,50 = 2,50. Conferir o troco também é organização.'],
      ['Você gastou R$ 8 pela manhã e R$ 7 à tarde. Quanto deve anotar no total?', 'R$ 15.', 'R$ 1.', 'R$ 56.', '8 + 7 = 15. Somar os dois gastos evita esquecer parte do dia.'],
      ['Seu limite para uma atividade é R$ 25. Ela custa R$ 28. Quanto ultrapassa o limite?', 'R$ 3.', 'R$ 53.', 'R$ 7.', '28 − 25 = 3. Identificar a diferença permite ajustar a escolha.']
    ]],
    ['Metas que cabem na vida', 'Transforme uma vontade em um plano.', [
      ['Qual descrição ajuda mais a acompanhar uma meta?', 'Juntar R$ 90 para um livro.', 'Guardar qualquer coisa para algo.', 'Comprar tudo o que eu quiser.', 'Dar nome e valor à meta torna o progresso visível.'],
      ['Uma meta custa R$ 120 e você já guardou R$ 45. Quanto falta?', 'R$ 75.', 'R$ 65.', 'R$ 165.', '120 − 45 = 75. Acompanhe o que falta, além do que já guardou.'],
      ['Você pretendia guardar R$ 20, mas só pode guardar R$ 5 esta semana. Qual atitude faz sentido?', 'Registrar R$ 5 e ajustar o prazo.', 'Registrar R$ 20 mesmo assim.', 'Desistir porque a quantia é menor.', 'O registro precisa mostrar o valor real. O ritmo pode mudar.'],
      ['Guardar R$ 10 por semana durante seis semanas acumula quanto, sem juros?', 'R$ 60.', 'R$ 16.', 'R$ 50.', '10 × 6 = 60. Pequenas partes podem formar uma meta maior.'],
      ['Você tem duas metas, mas dinheiro para avançar em apenas uma agora. O que ajuda?', 'Escolher uma prioridade e combinar uma ordem.', 'Contar o mesmo dinheiro nas duas.', 'Fingir que as duas já estão completas.', 'O mesmo valor não pode financiar duas compras ao mesmo tempo.']
    ]],
    ['Pequenos gastos', 'Observe os hábitos que se repetem.', [
      ['Uma bebida custa R$ 4. Você compra três na semana. Qual foi o gasto?', 'R$ 12.', 'R$ 7.', 'R$ 16.', '4 × 3 = 12. A frequência muda o impacto do preço.'],
      ['Um extra de R$ 2 é comprado dez vezes no mês. Quanto ele representa?', 'R$ 20.', 'R$ 12.', 'R$ 5.', '2 × 10 = 20. Vale registrar mesmo os gastos pequenos.'],
      ['Você não sabe para onde foi parte do seu dinheiro. Qual hábito ajuda a descobrir?', 'Anotar cada gasto por alguns dias.', 'Anotar só compras muito caras.', 'Evitar olhar os registros.', 'Registros completos revelam padrões que a memória pode esquecer.'],
      ['Você quer diminuir um gasto frequente sem eliminá-lo. Qual estratégia é possível?', 'Combinar uma frequência menor que caiba no plano.', 'Comprar mais para tentar economizar.', 'Manter a frequência e ignorar o total.', 'Reduzir a frequência pode liberar recursos sem abandonar totalmente uma escolha.'],
      ['Quatro compras de R$ 7 custam mais ou menos que uma de R$ 25?', 'R$ 3 a mais.', 'R$ 3 a menos.', 'Custam a mesma coisa.', '4 × 7 = 28; 28 − 25 = 3. Compare os totais.']
    ]],
    ['Compras com atenção', 'Compare antes de escolher.', [
      ['O mesmo caderno custa R$ 14 em uma loja e R$ 11 em outra, sem custos extras. Qual é a economia na segunda?', 'R$ 3.', 'R$ 25.', 'R$ 5.', '14 − 11 = 3. A comparação vale para o mesmo produto e condições.'],
      ['Uma mochila custa R$ 70 mais R$ 15 de entrega. Outra igual custa R$ 80 com entrega grátis. Qual total é menor?', 'R$ 80, na segunda loja.', 'R$ 70, na primeira loja.', 'Os dois são R$ 85.', 'A primeira soma R$ 85. Inclua a entrega para comparar.'],
      ['Uma embalagem traz três unidades por R$ 12. Quanto custa cada unidade?', 'R$ 4.', 'R$ 9.', 'R$ 36.', '12 ÷ 3 = 4. O preço por unidade ajuda na comparação.'],
      ['Dois produtos têm preços parecidos. Além do preço, o que vale comparar?', 'Durabilidade, utilidade e condições da compra.', 'Somente a cor do anúncio.', 'A quantidade de exclamações na oferta.', 'A melhor escolha depende também do uso e da qualidade esperada.'],
      ['Uma oferta só vale se comprar cinco itens, mas você usará um. O que avaliar?', 'O gasto total e o risco de sobrar sem uso.', 'Apenas a palavra promoção.', 'Comprar cinco é sempre mais econômico.', 'Um preço unitário menor não compensa necessariamente comprar o que não será usado.']
    ]],
    ['Descontos sem confusão', 'Entenda o valor final.', [
      ['Um item de R$ 50 tem desconto de R$ 10. Qual é o preço final?', 'R$ 40.', 'R$ 60.', 'R$ 10.', '50 − 10 = 40. Desconto em reais é subtraído do preço.'],
      ['Uma camiseta de R$ 100 tem 20% de desconto. Quanto você paga?', 'R$ 80.', 'R$ 20.', 'R$ 120.', '20% de 100 são 20; o preço final é 100 − 20 = 80.'],
      ['Uma compra de R$ 60 recebe 10% de desconto. Quanto economiza?', 'R$ 6.', 'R$ 10.', 'R$ 54.', '10% de 60 são 6. R$ 54 é o preço final, não o desconto.'],
      ['Um cupom reduz R$ 5, mas exige R$ 12 extras de entrega. Comparado ao mesmo produto sem cupom e com entrega grátis, o que ocorre?', 'O total fica R$ 7 maior.', 'O total fica R$ 5 menor.', 'O total não muda.', '12 − 5 = 7. O custo extra supera o desconto.'],
      ['Um anúncio diz “última chance”, mas você não comparou o preço. O que fazer?', 'Conferir o total e decidir sem pressa.', 'Comprar obrigatoriamente agora.', 'Ignorar o próprio limite de gastos.', 'Urgência no anúncio não substitui a avaliação da compra.']
    ]],
    ['Orçamento em família', 'Veja entradas e saídas juntas.', [
      ['Entraram R$ 2.000 e saíram R$ 1.700 no mês. Qual é o saldo registrado?', 'R$ 300.', 'R$ 3.700.', 'R$ 700.', '2.000 − 1.700 = 300. Confira se todos os registros estão incluídos.'],
      ['Qual exemplo é uma entrada no orçamento?', 'Um pagamento recebido por trabalho.', 'Uma conta de água paga.', 'Uma compra no mercado.', 'Entrada é dinheiro recebido; pagamentos e compras são saídas.'],
      ['Qual exemplo é uma saída no orçamento?', 'O pagamento de uma passagem.', 'Um valor recebido de presente.', 'O recebimento de um trabalho.', 'O pagamento da passagem diminui o dinheiro disponível.'],
      ['Uma conta foi paga, mas ficou fora das anotações. Como fica o saldo calculado?', 'Maior do que deveria.', 'Menor do que deveria.', 'Sempre correto mesmo sem a conta.', 'Sem a saída, o cálculo mostra dinheiro que já foi gasto.'],
      ['Quem deve assumir as decisões e responsabilidades pelas contas da casa?', 'Os adultos, com espaço para diálogo com os jovens.', 'Apenas os estudantes da família.', 'Quem perder uma rodada do jogo.', 'Participar do aprendizado não torna o jovem responsável por resolver as contas da família.']
    ]],
    ['Um mês de cada vez', 'Organize registros e datas.', [
      ['Uma despesa foi paga em outubro. Em qual mês registrar o pagamento?', 'Outubro.', 'Setembro, só porque o produto foi visto antes.', 'Em todos os meses.', 'Registrar no mês do pagamento ajuda a acompanhar o dinheiro que efetivamente saiu.'],
      ['Uma saída de R$ 35 foi anotada duas vezes. O que fazer?', 'Remover ou corrigir o registro duplicado.', 'Manter os dois para prevenir esquecimentos.', 'Criar uma entrada fictícia para disfarçar.', 'Corrigir a duplicação preserva a fidelidade do orçamento.'],
      ['Você recebeu R$ 80 em setembro e R$ 40 em outubro. Quanto entrou em outubro nesses registros?', 'R$ 40.', 'R$ 120.', 'R$ 80.', 'A consulta mensal considera as entradas do mês escolhido.'],
      ['Por que usar uma descrição como “passagem para a escola”?', 'Para reconhecer a despesa na revisão.', 'Para aumentar o valor disponível.', 'Para não precisar anotar o valor.', 'Uma descrição clara ajuda a entender o registro depois.'],
      ['Seu saldo parece estranho. O que conferir antes de alterar números?', 'Mês, valores, tipos e possíveis duplicações.', 'Apenas a cor da tela.', 'Apagar todas as despesas sem olhar.', 'Investigar os registros evita corrigir um erro criando outro.']
    ]],
    ['Reservas e imprevistos', 'Prepare espaço para mudanças.', [
      ['Para que pode servir uma reserva no planejamento?', 'Ajudar com uma necessidade inesperada.', 'Garantir que nunca haverá problemas.', 'Obrigar a gastar tudo no mesmo dia.', 'Uma reserva pode ajudar, mas não elimina todos os imprevistos.'],
      ['Uma meta tem R$ 90 guardados. Foi necessário retirar R$ 25. Quanto deve aparecer no registro?', 'R$ 65.', 'R$ 115.', 'R$ 90.', '90 − 25 = 65. O cofre deve refletir o que realmente permanece separado.'],
      ['Neste mês não sobrou dinheiro para a reserva. Qual atitude respeita a realidade da família?', 'Rever o plano sem culpa e retomar quando possível.', 'Inventar uma quantia guardada.', 'Culpar uma criança pela situação.', 'Poupar depende das condições reais. Um plano pode ser ajustado.'],
      ['Uma despesa urgente compete com uma compra que pode esperar. O que faz sentido avaliar?', 'Adiar a compra não urgente para atender à necessidade.', 'Ignorar a urgência só para manter o plano original.', 'Gastar primeiro e conversar depois.', 'Planejar inclui mudar prioridades quando a situação muda.'],
      ['Você move R$ 20 do bolso para um envelope de reserva. Seu dinheiro total aumenta?', 'Não, ele apenas muda de lugar.', 'Sim, aumenta R$ 20.', 'Sim, dobra automaticamente.', 'Uma transferência entre suas reservas não é uma nova renda.']
    ]],
    ['Recursos da casa', 'Cuide do que a família já tem.', [
      ['Antes de comprar material escolar, qual atitude evita compras repetidas?', 'Conferir o que ainda pode ser usado.', 'Jogar tudo fora sem olhar.', 'Comprar a lista duas vezes.', 'Reaproveitar itens em boas condições evita gastos desnecessários.'],
      ['O que ajuda a evitar desperdício de alimentos?', 'Planejar quantidades e conferir o que já existe.', 'Comprar sempre além do necessário.', 'Ignorar o que está próximo de vencer.', 'Olhar o que há em casa ajuda a comprar quantidades adequadas.'],
      ['Uma torneira está pingando. Qual participação é adequada para um jovem?', 'Avisar um adulto para avaliar o reparo.', 'Desmontar sozinho sem saber como.', 'Esconder o problema.', 'Comunicar o problema permite buscar uma solução segura e evitar desperdício.'],
      ['Um objeto parou de funcionar. Antes de substituí-lo, o que vale verificar com um adulto?', 'Se existe um reparo seguro e que compensa.', 'Comprar outro sem avaliar nada.', 'Tentar qualquer conserto perigoso.', 'Comparar reparo e substituição pode evitar uma compra, sem abrir mão da segurança.'],
      ['Usar menos recursos em casa significa que todas as contas vão desaparecer?', 'Não; pode reduzir desperdícios, mas há outros custos.', 'Sim, todas ficam zeradas.', 'Sim, qualquer ação garante uma redução fixa.', 'As contas dependem de vários fatores. Cuidar dos recursos não garante um valor exato de economia.']
    ]],
    ['Lazer com planejamento', 'Inclua diversão no seu plano.', [
      ['Você separou R$ 45 para sair. Entrada de R$ 20 e transporte de R$ 10 deixam quanto para o resto?', 'R$ 15.', 'R$ 25.', 'R$ 35.', '45 − 20 − 10 = 15. Inclua os custos do passeio inteiro.'],
      ['Um programa dos amigos ultrapassa o que você pode gastar. O que propor?', 'Uma opção mais barata ou gratuita.', 'Gastar mesmo sem ter como pagar.', 'Dizer que toda amizade depende de compras.', 'É possível conviver e se divertir com alternativas que respeitem diferentes orçamentos.'],
      ['Um jogo gratuito oferece acessórios pagos. Antes de escolher um, o que considerar?', 'O preço real e o limite combinado com um responsável.', 'Que tudo dentro de um jogo é gratuito.', 'Que pequenas compras nunca se acumulam.', 'Itens virtuais também podem custar dinheiro real e devem entrar no planejamento.'],
      ['Três amigos vão dividir igualmente R$ 36 de um lanche. Quanto cabe a cada um?', 'R$ 12.', 'R$ 9.', 'R$ 18.', '36 ÷ 3 = 12. Combinar a divisão antes evita confusão.'],
      ['Você gastou todo o valor reservado para lazer. Qual próximo passo respeita seu plano?', 'Escolher atividades sem custo até reorganizar o orçamento.', 'Usar dinheiro de uma conta necessária sem conversar.', 'Continuar sem registrar os gastos.', 'O limite combinado ajuda a proteger outras prioridades.']
    ]],
    ['Consumo digital', 'Perceba custos além da tela.', [
      ['Uma assinatura custa R$ 12 por mês. Em três meses, sem alteração de preço, quanto custa?', 'R$ 36.', 'R$ 15.', 'R$ 24.', '12 × 3 = 36. Uma cobrança recorrente precisa ser acompanhada.'],
      ['Um teste gratuito pede um pagamento futuro automático. O que conferir com um adulto?', 'Quando começa a cobrança e como cancelar.', 'Somente a palavra grátis.', 'Nada, pois nunca poderá ser cobrado.', 'Condições de renovação importam para evitar uma despesa inesperada.'],
      ['Uma compra digital de R$ 5 é feita seis vezes. Qual é o total?', 'R$ 30.', 'R$ 11.', 'R$ 25.', '5 × 6 = 30. O valor pequeno de cada compra não mostra sozinho o total.'],
      ['Uma assinatura não é usada há meses. O que vale discutir em família?', 'Se faz sentido manter ou cancelar a despesa.', 'Que é obrigatório pagar para sempre.', 'Como esconder a cobrança.', 'Revisar serviços pouco usados pode liberar espaço no orçamento.'],
      ['Um aplicativo mostra preço mensal e preço total anual. Qual cuidado ajuda na comparação?', 'Comparar custos para o mesmo período.', 'Comparar um mês com um ano como se fossem iguais.', 'Escolher só o número que parece menor.', 'Períodos diferentes podem fazer um valor parecer menor sem que seja mais econômico.']
    ]],
    ['Escolhas em grupo', 'Combine antes de gastar.', [
      ['A turma quer juntar R$ 100 com cinco contribuições iguais em uma simulação. Qual é cada parte?', 'R$ 20.', 'R$ 25.', 'R$ 50.', '100 ÷ 5 = 20. Na vida real, acordos devem respeitar as condições de cada pessoa.'],
      ['Uma atividade exige uma contribuição que alguém não pode dar. Como incluir essa pessoa?', 'Buscar uma alternativa acessível e conversar sem expor sua renda.', 'Constranger a pessoa diante de todos.', 'Dizer que ela não merece participar.', 'Inclusão exige respeitar realidades diferentes e buscar alternativas.'],
      ['Duas pessoas vão dividir um gasto. Quando combinar os valores?', 'Antes de realizar a compra.', 'Só quando surgir uma cobrança inesperada.', 'Nunca, basta presumir.', 'Combinar antes reduz mal-entendidos sobre o pagamento.'],
      ['Em uma simulação, o grupo tem R$ 75 e compra materiais por R$ 48. Quanto sobra?', 'R$ 27.', 'R$ 33.', 'R$ 123.', '75 − 48 = 27. O grupo deve conferir e registrar o restante.'],
      ['Quem anotou uma compra do grupo percebeu um erro. Qual atitude ajuda?', 'Mostrar o erro e corrigir o registro com o grupo.', 'Esconder para não conversar.', 'Alterar os valores sem avisar ninguém.', 'Transparência e correção fortalecem a organização conjunta.']
    ]],
    ['Prazos e parcelas', 'Olhe o compromisso completo.', [
      ['Um produto é oferecido em quatro parcelas de R$ 25, sem outros custos. Qual é o total?', 'R$ 100.', 'R$ 29.', 'R$ 75.', '4 × 25 = 100. A parcela é apenas uma parte do preço.'],
      ['Um item custa R$ 90 à vista ou três parcelas de R$ 35. Qual opção tem menor total?', 'À vista: R$ 90.', 'Parcelado: R$ 35 no total.', 'As duas custam R$ 90.', '3 × 35 = 105. O total à vista é R$ 15 menor neste exemplo.'],
      ['Uma parcela parece pequena. O que ainda precisa entrar na decisão?', 'As outras despesas e os próximos meses comprometidos.', 'Somente o valor da primeira parcela.', 'A ideia de que parcelas não são gastos.', 'Várias parcelas podem ocupar juntas uma parte relevante do orçamento.'],
      ['Duas parcelas mensais de R$ 30 e R$ 45 caem no mesmo mês. Quanto somam?', 'R$ 75.', 'R$ 15.', 'R$ 60.', '30 + 45 = 75. Compromissos simultâneos devem ser vistos em conjunto.'],
      ['Na sua anotação de dinheiro efetivamente pago, uma parcela será paga no próximo mês. O que fazer?', 'Planejá-la e registrar a saída quando for paga.', 'Registrar como já paga sem ter pago.', 'Ignorar a parcela no planejamento.', 'Separar previsão de pagamento realizado mantém os registros claros.']
    ]],
    ['Planejar com mudanças', 'Ajuste sem perder o caminho.', [
      ['Uma família recebeu menos do que esperava no mês. O que ajuda a reorganizar o orçamento?', 'Recalcular os recursos e revisar as prioridades.', 'Manter todos os planos sem olhar os valores.', 'Registrar uma renda que não chegou.', 'O orçamento deve partir dos recursos disponíveis, não de valores imaginados.'],
      ['Sua meta passou de R$ 100 para R$ 120, e há R$ 70 guardados. Quanto falta agora?', 'R$ 50.', 'R$ 30.', 'R$ 190.', '120 − 70 = 50. Mudanças no preço alteram o valor que falta.'],
      ['Você planejou gastar R$ 40, mas gastou R$ 34. Qual é a diferença?', 'R$ 6 abaixo do planejado.', 'R$ 6 acima do planejado.', 'R$ 74 abaixo do planejado.', '40 − 34 = 6. Comparar plano e realidade ajuda no próximo planejamento.'],
      ['Entrou um valor extra de R$ 50. Qual atitude é mais organizada?', 'Registrar e decidir como distribuí-lo entre prioridades.', 'Gastar antes de conferir necessidades.', 'Contar o mesmo valor duas vezes.', 'Uma entrada extra também merece uma decisão consciente.'],
      ['Você percebeu que não alcançará uma meta no prazo imaginado. O que pode fazer?', 'Rever o prazo ou o objetivo de forma realista.', 'Anotar que terminou sem terminar.', 'Achar que todo o aprendizado foi perdido.', 'Revisar uma meta faz parte de planejar, não é um fracasso.']
    ]],
    ['Organização que ajuda', 'Crie registros confiáveis.', [
      ['Qual registro fica mais claro para revisar depois?', 'Data, descrição, tipo e valor do movimento.', 'Somente um número sem contexto.', 'Uma frase sem data nem valor.', 'Campos claros ajudam a identificar e conferir cada movimento.'],
      ['Você quer conferir uma compra anotada. O que pode ajudar?', 'Comparar a anotação com o comprovante disponível.', 'Mudar o valor por adivinhação.', 'Apagar só porque não lembra.', 'Um comprovante ajuda a conferir dados; evite expor informações pessoais.'],
      ['Um gasto com ônibus deve ficar em qual categoria deste aplicativo?', 'Transporte.', 'Alimentação.', 'Moradia.', 'Agrupar gastos semelhantes ajuda a entender como o dinheiro foi usado.'],
      ['Uma compra no mercado foi R$ 42,80. Qual valor deve ser registrado?', 'R$ 42,80.', 'R$ 42,00 porque centavos não contam.', 'R$ 48,20.', 'Centavos fazem parte do valor e podem se acumular.'],
      ['Qual momento ajuda a evitar um grande acúmulo de registros esquecidos?', 'Uma revisão curta e regular.', 'Só depois de muitos meses sem anotar.', 'Nunca revisar após registrar.', 'Uma rotina simples torna a organização mais fácil de manter.']
    ]],
    ['Cuidando dos seus dados', 'Proteja o seu planejamento.', [
      ['Você usa um computador compartilhado. Quais valores são adequados para praticar na escola?', 'Valores fictícios, sem expor dados da família.', 'Renda real de todos os colegas.', 'Senhas e dados bancários dos responsáveis.', 'A prática não precisa de informações financeiras pessoais.'],
      ['Você quer levar seus registros para outro aparelho neste aplicativo. O que usar?', 'Exportar e depois importar o backup.', 'Esperar sincronização automática que não existe.', 'Copiar somente o nome do aplicativo.', 'O backup transporta os registros; este aplicativo guarda dados localmente.'],
      ['Onde guardar um arquivo com registros financeiros pessoais?', 'Em um local privado ao qual só pessoas autorizadas tenham acesso.', 'Em uma pasta pública para qualquer pessoa.', 'Em uma postagem aberta.', 'Um backup pode conter informações privadas e deve ser protegido.'],
      ['Você vai apagar os dados do navegador e quer conservar seus registros. Qual passo vem antes?', 'Exportar e guardar uma cópia de segurança.', 'Apagar tudo e depois tentar exportar.', 'Mudar apenas a cor da página.', 'A cópia precisa ser feita enquanto os dados ainda estão disponíveis.'],
      ['Antes de restaurar um backup que substitui os dados atuais, o que é prudente?', 'Guardar uma cópia dos dados atuais se quiser preservá-los.', 'Presumir que as duas listas serão sempre somadas.', 'Apagar também todos os backups.', 'Restaurar substitui o estado atual; uma cópia permite voltar se necessário.']
    ]],
    ['Missão orçamento', 'Junte o que você aprendeu.', [
      ['Em uma simulação entram R$ 300. Saem R$ 120 de alimentação e R$ 60 de transporte. Qual saldo resta?', 'R$ 120.', 'R$ 180.', 'R$ 240.', '300 − 120 − 60 = 120. Some as saídas antes de calcular o saldo.'],
      ['Você tem R$ 80 e pretende gastar R$ 35, R$ 30 e R$ 25. O plano cabe?', 'Não; ultrapassa em R$ 10.', 'Sim; sobra R$ 10.', 'Sim; gasta exatamente R$ 80.', '35 + 30 + 25 = 90, que supera 80 em 10.'],
      ['Uma meta de R$ 150 tem R$ 60 guardados. Com mais R$ 30, que parte da meta estará completa?', 'R$ 90 de R$ 150.', 'R$ 120 de R$ 150.', 'R$ 30 de R$ 150.', '60 + 30 = 90. Ainda faltarão R$ 60.'],
      ['Uma entrada de R$ 200 foi anotada como saída. Qual correção é adequada?', 'Editar o tipo para entrada e manter o valor correto.', 'Adicionar números aleatórios até o saldo parecer bom.', 'Excluir outras despesas verdadeiras.', 'Corrija a origem do erro: o tipo determina se o valor soma ou subtrai.'],
      ['O saldo registrado é positivo, mas uma conta ainda será paga. O que considerar antes de gastar?', 'O compromisso que ainda precisa ser coberto.', 'Que todo o saldo está livre sem restrições.', 'Que contas futuras nunca importam.', 'Saldo atual e dinheiro livre para novas escolhas não são necessariamente iguais.']
    ]],
    ['A grande conquista', 'Complete sua jornada de escolhas.', [
      ['Uma saída de R$ 18,50 e outra de R$ 11,50 são pagas com R$ 50. Quanto sobra?', 'R$ 20.', 'R$ 30.', 'R$ 19.', '18,50 + 11,50 = 30; 50 − 30 = 20.'],
      ['Você quer um passeio de R$ 90 e tem R$ 30. Guardando R$ 20 por semana, sem juros, quando alcança o valor?', 'Em 3 semanas.', 'Em 2 semanas.', 'Em 6 semanas.', 'Faltam 90 − 30 = 60; 60 ÷ 20 = 3 semanas.'],
      ['Duas lojas vendem o mesmo item: R$ 55 mais R$ 8 de entrega ou R$ 60 com entrega grátis. Qual é mais barata?', 'A de R$ 60, por R$ 3.', 'A de R$ 55, por R$ 5.', 'Os totais são iguais.', '55 + 8 = 63. O total de R$ 60 é R$ 3 menor.'],
      ['Depois de um erro de planejamento, qual atitude leva a um aprendizado útil?', 'Entender o que aconteceu e ajustar a próxima escolha.', 'Esconder os registros para sempre.', 'Concluir que não vale mais planejar.', 'Erros podem mostrar o que precisa ser ajustado no plano e nos hábitos.'],
      ['Qual hábito reúne as principais ideias desta jornada?', 'Registrar, comparar, conversar e ajustar metas à realidade.', 'Gastar primeiro e nunca conferir.', 'Comparar a renda das famílias para decidir quem venceu.', 'Educação financeira ajuda a fazer escolhas conscientes e respeitar a realidade de cada família.']
    ]]
  ];
  const levels = groups.map(([title, description, rows], level) => ({
    title, description,
    questions: rows.map(([story, correct, wrong1, wrong2, lesson], index) => {
      const best = (level * 2 + index) % 3;
      const options = [wrong1, wrong2]; options.splice(best, 0, correct);
      return { id: `f${level + 1}-q${index + 1}`, story, options, best, lesson };
    })
  }));
  if (typeof module !== 'undefined' && module.exports) module.exports = levels;
  root.CofreLevels = levels;
})(typeof window !== 'undefined' ? window : globalThis);
