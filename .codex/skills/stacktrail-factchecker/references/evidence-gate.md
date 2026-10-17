# Registro de evidências e decisão

## Unidade de verificação

Uma linha deve permitir reconstruir o julgamento sem confiar na autoridade do autor:

| Campo | Registrar |
| --- | --- |
| ID e local | Etapa, aula, seção/arquivo e afirmação concreta; evitar “HTTP está correto” |
| Natureza | Norma, comportamento de versão, convenção ou modelo didático |
| Fonte | Título e URL realmente aberta, seção/âncora e data da consulta |
| Versão | Edição da norma/documentação e ambiente local, quando pertinentes |
| Confronto | O que sustenta ou contradiz a afirmação; condições e contraexemplo |
| Resultado | Uma das cinco classificações; não misturar gravidade com resultado |
| Execução | Comando/teste, entrada, esperado, observado; ou “não executado” com motivo |
| Impacto | Exercícios/simuladores afetados, gravidade, correção e pendência |
| Estado | Pendente, em correção, corrigido ou validado após reconferência |

Resultados:
- **Verificada:** sustentada pela fonte consultada nas condições explicitadas.
- **Parcialmente correta:** núcleo correto com omissão ou generalização que precisa ajuste.
- **Incorreta:** contradiz evidência pertinente; forneça correção e exemplo contrário.
- **Não verificada:** evidência insuficiente/inacessível; não equivale a falsa nem aprovada.
- **Dependente de contexto ou versão:** validade condicionada; especificar condições e versão.

Use IDs de fonte reutilizáveis se cada linha apontar a seção e o registro central
contiver URL/data/versão. Registre a classificação anterior e a atual após correção.
Não atribua todas as afirmações de uma aula a uma fonte genérica.

## Gravidade e aprovação

- **Crítica/alta:** muda uma decisão essencial, ensina comportamento errado, invalida
  exercício central ou oferece falsa garantia de segurança/correção. Bloqueia aula.
- **Média:** simplificação relevante ou exemplo secundário confuso; corrigir ou
  delimitar antes de aprovar o conceito afetado.
- **Baixa:** detalhe periférico sem prejuízo ao objetivo; pode permanecer com pendência.

Para uma aula passar o gate: inventário de conceitos importantes coberto, fontes
lidas pertinentes, exemplos essenciais confrontados por execução quando viável,
condições de versão explícitas, impactos rastreados e nenhum bloqueante aberto.
Se a execução essencial não for possível, deixe aprovação pendente; revisão
textual parcial não é validação integral. Registre separadamente fidelidade
curricular, precisão técnica, funcionamento local e qualidade pedagógica/UI.

## Checklist da auditoria

- [ ] Todas as aulas do escopo inventariadas, incluindo suas práticas e laboratórios.
- [ ] Afirmações importantes individualizadas e confrontadas com fontes primárias lidas.
- [ ] Normas/versões e simplificações diferenciadas; críticas antigas reexaminadas.
- [ ] Exemplos executáveis comparados com resultados; não executados identificados.
- [ ] Erros apresentados, corrigidos e impactos em atividades/modelos conferidos.
- [ ] Revisão independente registrada ou explicitamente pendente.
- [ ] Nenhum bloqueante aberto para as aulas declaradas aprovadas.
- [ ] Relatório, checkboxes e limitações coerentes com evidência real.
