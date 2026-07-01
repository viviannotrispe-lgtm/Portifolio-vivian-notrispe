# Portfólio — Vivian Notrispe

Site estático (HTML/CSS/JS puro, sem build/framework) pra ficar fácil de
manter com o Claude Code.

## Estrutura

```
index.html              → Home
projetos/
  index.html             → Índice com todos os projetos
  _template.html         → Modelo — duplique pra criar um projeto novo
  projeto-exemplo.html   → Exemplo já preenchido
sobre.html
contato.html
data/
  projetos.json          → Lista de projetos (edite aqui)
assets/
  css/style.css
  js/main.js
  img/
```

## Como adicionar um projeto novo

1. Duplique `projetos/_template.html` e renomeie (ex: `projetos/app-fintech.html`)
2. Preencha os campos `[entre colchetes]` dentro do arquivo
3. Adicione uma entrada em `data/projetos.json`:

```json
{
  "id": "app-fintech",
  "titulo": "App Fintech",
  "ano": "2026",
  "categoria": "Design",
  "resumo": "Uma frase curta sobre o projeto.",
  "capa": "assets/img/app-fintech-capa.jpg",
  "tags": ["Fintech", "Mobile"],
  "link": "projetos/app-fintech.html",
  "destaque": true
}
```

4. Coloque as imagens em `assets/img/`
5. Pronto — o card aparece automaticamente na home (se `destaque: true`) e
   no índice de projetos.

`destaque: true` faz o projeto aparecer nos "Trabalhos selecionados" da home.
Deixe `false` (ou omita) pra ele aparecer só no índice completo.

### Categorias e filtro

O campo `categoria` define o grupo do projeto e também é usado para o filtro
por abas no índice de projetos (`projetos/index.html`). Use um destes dois
valores pra manter consistência:

- `"Design"` — projetos de UI/UX, visual, produto.
- `"Pesquisa & Produto"` — projetos focados em pesquisa, estratégia, discovery.

As abas de filtro só aparecem automaticamente quando há **pelo menos 2**
categorias diferentes cadastradas em `data/projetos.json` — com um projeto só,
não faz sentido mostrar filtro.

## Preview local

Como o site usa `fetch()` para ler `projetos.json`, abrir o `index.html`
direto no navegador (clicando duas vezes) pode não funcionar — os navegadores
bloqueiam isso por segurança em arquivos `file://`. Suba um servidor local:

```bash
# na pasta do projeto
python3 -m http.server 8000
# depois abra http://localhost:8000
```

Ou, se tiver Node instalado:

```bash
npx serve .
```

## Deploy (gratuito)

**Opção recomendada — Vercel:**

1. Crie um repositório no GitHub e suba esta pasta:
   ```bash
   git init
   git add .
   git commit -m "primeira versão do portfólio"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/portfolio.git
   git push -u origin main
   ```
2. Entre em [vercel.com](https://vercel.com), conecte sua conta do GitHub
3. Importe o repositório — como é um site estático puro, não precisa
   configurar nada (build command vazio, output = raiz)
4. A cada `git push`, o site atualiza sozinho

Seu site fica em algo como `seu-portfolio.vercel.app`, com HTTPS automático.
Depois, se quiser, dá pra apontar um domínio próprio nas configurações do
projeto no Vercel.

**Alternativa — GitHub Pages:**

No repositório, vá em `Settings → Pages → Branch: main` e selecione a raiz.
Funciona igualmente bem, é só um pouco mais manual pra configurar domínio
próprio depois.

## Customizar a identidade visual

Cores, fontes e espaçamentos estão centralizados no topo de
`assets/css/style.css`, dentro de `:root { ... }`. Trocar essas variáveis
já muda a aparência do site inteiro.
