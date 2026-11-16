# WAdapt — Landing Page

Site institucional da **WAdapt — Sistemas para Gestão**.
Feito com HTML, CSS e JavaScript puros, sem dependências ou etapa de build.

## Estrutura

```
wadapt-site/
├── index.html          → conteúdo da página
├── css/style.css       → estilos (cores e fontes no topo, em :root)
├── js/main.js          → menu mobile, animações e formulário
└── assets/img/         → logos, favicon e imagem de compartilhamento
```

## Como editar

1. Abra a pasta no VS Code.
2. Instale a extensão **Live Server** e clique em *Go Live* para ver as mudanças em tempo real.

### Ajustes rápidos

| O que mudar | Onde |
|---|---|
| WhatsApp e e-mail | `js/main.js`, objeto `CONTATO` no topo |
| Cores da marca | `css/style.css`, variáveis em `:root` |
| Textos | `index.html` |
| Logos | `assets/img/` (arquivos SVG, nítidos em qualquer tamanho) |

O formulário de contato abre o WhatsApp com a mensagem já preenchida.
Para receber por e-mail, use um serviço como o [Formspree](https://formspree.io) e troque a função `enviar()` em `js/main.js`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie estes arquivos.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. Em alguns minutos o site fica disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Para usar um domínio próprio (ex.: `wadapt.com.br`), configure-o na mesma tela de Pages.

## Paleta oficial

| Cor | HEX | Uso |
|---|---|---|
| Azul-marinho | `#0B1F44` | Cor principal |
| Azul royal | `#087BFF` | Tecnologia e inovação |
| Ciano | `#00D1FF` | Destaque e modernidade |
| Roxo | `#8A2BE2` | Cor secundária |
| Cinza | `#4B5563` | Textos e elementos neutros |

Fontes: **Montserrat** (títulos) e **Poppins** (textos), via Google Fonts.
