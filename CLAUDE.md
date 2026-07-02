# Portfólio — Vivian Notrispe

Site estático (ver `README.md` para estrutura, deploy e como adicionar projetos).

## Tom de voz dos cases

Ao escrever ou revisar qualquer texto de case (`projetos/*.html`), seguir o padrão estabelecido no case "Basic Value" (`projetos/basic-value.html`):

- **Primeira pessoa, posse direta do trabalho.** "Comecei investigando", "Escrevi o PRD", "Alinhei com lideranças", "defini e especifiquei" — não "foi feita uma análise" ou outras construções na passiva que escondem quem fez o quê.
- **Direto e ancorado em dado, sem adjetivo vazio.** Nada de "incrível", "poderoso", "revolucionário". Deixe o número ou o fato falar. Prefira "a grande maioria do churn vinha de clientes que nunca completaram 60% da configuração" a "o churn era muito alto".
- **Causas nomeadas explicitamente, não vagas.** Quando descrever um diagnóstico, liste as causas raiz como itens claros (ex: "três causas raízes específicas: perda de contexto na transição entre Vendas e Pós-venda; atrito operacional no processo de instalação; e uma experiência de primeiro acesso com alta carga cognitiva") em vez de generalizar ("o onboarding tinha vários problemas").
- **Estrutura de raciocínio, não de venda.** Cada seção mostra o próximo passo lógico do pensamento: Contexto (situação e mandato) → Problema (investigação + achado principal) → Processo (como o diagnóstico foi aprofundado, incluindo pesquisa qualitativa quando houver) → Solução (o que foi de fato especificado/entregue, geralmente 2-3 frentes paralelas) → Resultado (impacto quantificado + um aprendizado refletido, não uma comemoração).
- **Fecho de Resultado é reflexivo, não um discurso de vitória.** Termine puxando um princípio mais amplo do que o projeto ensinou (ex: "uma métrica bem desenhada funciona como ferramenta de alinhamento organizacional, não só de produto"), não um "foi um sucesso incrível".
- **Sem pontos de exclamação, sem venda.** O tom é de relatório técnico bem escrito, não de pitch.

## Gráficos

Ver `[[feedback-portfolio-conventions]]` na memória — resumo: sempre SVG inline usando as variáveis de `assets/css/style.css` (nunca screenshot embutido ou lib de gráfico externa), preferir blocos `.stat-chart` de largura cheia a colunas apertadas.

## Confidencialidade

Dados de documentos internos reais (nome da empresa, nomes de colegas, valores financeiros exatos) devem ser anonimizados por padrão em qualquer case novo, a menos que Vivian diga explicitamente o contrário para aquele projeto.
