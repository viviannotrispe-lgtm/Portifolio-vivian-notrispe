# Portfólio — Vivian Notrispe

Site estático (ver `README.md` para estrutura, deploy e como adicionar projetos).

## Tom de voz dos cases

Ao escrever ou revisar qualquer texto de case (`projetos/*.html`), seguir o padrão estabelecido no case "Basic Value" (`projetos/basic-value.html`):

- **Primeira pessoa, posse direta do trabalho.** "Comecei investigando", "Escrevi o PRD", "Alinhei com lideranças", "defini e especifiquei" — não "foi feita uma análise" ou outras construções na passiva que escondem quem fez o quê.
- **Direto e ancorado em dado, sem adjetivo vazio.** Nada de "incrível", "poderoso", "revolucionário". Deixe o número ou o fato falar. Prefira "a grande maioria do churn vinha de clientes que nunca completaram 60% da configuração" a "o churn era muito alto".
- **Causas nomeadas explicitamente, não vagas.** Quando descrever um diagnóstico, liste as causas raiz como itens claros (ex: "três causas raízes específicas: perda de contexto na transição entre Vendas e Pós-venda; atrito operacional no processo de instalação; e uma experiência de primeiro acesso com alta carga cognitiva") em vez de generalizar ("o onboarding tinha vários problemas").
- **Estrutura de raciocínio, não de venda.** Cada seção mostra o próximo passo lógico do pensamento: A empresa (o que a empresa faz, modelo de negócio, produto) → Contexto (situação e mandato) → Problema (investigação + achado principal) → Processo (como o diagnóstico foi aprofundado, incluindo pesquisa qualitativa quando houver) → Solução (o que foi de fato especificado/entregue, geralmente 2-3 frentes paralelas) → Resultado (impacto quantificado + um aprendizado refletido, não uma comemoração).
- **"A empresa" é a seção fixa de abertura, antes de Contexto, em todo case.** Mesmo texto-base nos três cases atuais (adicionado em 2026-07-06): "Neste projeto atuei como PM em uma plataforma B2B de telemetria veicular: hardware instalado nos veículos e um painel de software que juntos dão ao gestor de frota visibilidade sobre localização, comportamento de direção, manutenção e operação..." — não repita a descrição da empresa dentro do Contexto de cada case; se o Contexto anterior já tinha essa menção, remova-a de lá para não duplicar.
- **Fecho de Resultado é reflexivo, não um discurso de vitória.** Termine puxando um princípio mais amplo do que o projeto ensinou (ex: "uma métrica bem desenhada funciona como ferramenta de alinhamento organizacional, não só de produto"), não um "foi um sucesso incrível".
- **Sem pontos de exclamação, sem venda.** O tom é de relatório técnico bem escrito, não de pitch.
- **Frases curtas, uma ideia por vez.** Não empilhe várias ideias numa frase só usando travessões e dois-pontos em cascata. Corte em frases separadas por ponto final — cada parágrafo já separa os passos do raciocínio, não precisa comprimir tudo numa frase densa.
- **Travessão (—) é pontuação leve, não cola estrutural.** Se uma frase tem mais de um travessão, ela provavelmente devia virar duas frases. Reserve o travessão para o padrão fixo do site (sufixo "— Vivian Notrispe" no `<title>`, separador nos campos de `case-meta`), não para prosa corrida.
- **Não force conexão entre ideias sem relação direta.** Se uma explicação (ex: o que é uma métrica) e um achado (ex: uma causa raiz) não nascem um do outro, dê a cada um sua própria frase ou parágrafo em vez de amarrar os dois via travessão só para economizar espaço.
- **Quando Vivian reescrever um trecho manualmente, isso vira a referência de tom mais atual para o resto do case** — releia o texto dela (não só as regras acima) antes de escrever a próxima seção, e mantenha a estrutura e o vocabulário que ela usou em vez de reformular.

## Gráficos

Ver `[[feedback-portfolio-conventions]]` na memória — resumo: sempre SVG inline usando as variáveis de `assets/css/style.css` (nunca screenshot embutido ou lib de gráfico externa), preferir blocos `.stat-chart` de largura cheia a colunas apertadas.

## Idiomas (pt/en)

O site tem botão de troca de idioma (canto superior direito, `data-lang-toggle`) usando um mecanismo próprio em `assets/js/i18n.js`, sem framework: todo texto traduzível ganha `data-i18n="chave"` (troca `textContent`), `data-i18n-html="chave"` (quando o texto tem tags inline como `<strong>`/`<em>`/`<br>`) ou `data-i18n-attr="attr=chave"` (para `alt`, `aria-label`, `content` de meta tags). As traduções ficam em `data/i18n/pt.json` e `data/i18n/en.json`, com a mesma estrutura de chaves nos dois arquivos.

- Textos de UI compartilhados (nav, footer, "Ver case", títulos de seção como "Contexto"/"Resultado") ficam em `common.*`.
- Cada case tem sua própria chave em `projects.<slug>` (ex: `projects.basicValue`), incluindo os textos dos gráficos SVG (`<text>`/`<tspan>` de cada gráfico também levam `data-i18n`).
- `projetos/_template.html` já vem com os `data-i18n` e comentário explicando o padrão — ao criar um case novo, trocar `SLUG` pelo id do projeto e adicionar as chaves correspondentes nos dois JSONs. Sem isso, o texto some ao trocar de idioma (a chave não existe, então nada substitui o texto padrão).
- `data/projetos.json` guarda os campos traduzíveis (título, categoria, resumo, tags) dentro de `pt`/`en` por projeto, consumidos por `assets/js/main.js` na home e no catálogo.
- Números em gráficos (percentuais, valores) não são traduzidos — só os rótulos/labels.

## Confidencialidade

Dados de documentos internos reais (nome da empresa, nomes de colegas, valores financeiros exatos) devem ser anonimizados por padrão em qualquer case novo, a menos que Vivian diga explicitamente o contrário para aquele projeto.
