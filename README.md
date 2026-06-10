# Soul Tattoo Geek

Projeto React + Vite pronto para rodar localmente e publicar na Vercel.

## Rodar localmente

```bash
npm install
npm run dev
```

## Deploy na Vercel

O projeto já inclui `vercel.json`.

Configurações:
- Framework Preset: Vite
- Install Command: `npm install --no-audit --no-fund --legacy-peer-deps`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 22.x

## Orçamento/agendamento por e-mail com anexos

O formulário envia as imagens para a API `/api/send-request`.

Na Vercel, configure as variáveis de ambiente:

```env
RESEND_API_KEY=
REQUEST_TO_EMAIL=contato@soultattoogeek.com
REQUEST_FROM_EMAIL=Soul Tattoo Geek <onboarding@resend.dev>
```

Para notificar no WhatsApp quando chegar novo pedido, configure uma das opções:

```env
WHATSAPP_NOTIFY_WEBHOOK=
```

ou WhatsApp Cloud API:

```env
WHATSAPP_CLOUD_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_NOTIFY_TO=5521999999999
```

Sem essas variáveis, o site abre normalmente, mas o envio real de e-mail/WhatsApp não funciona até configurar a Vercel.


## Correção do ScrollReveal

O ScrollReveal foi corrigido porque havia CSS antigo de segurança contra tela branca forçando vários elementos com `opacity: 1 !important` e `transform: none !important`.  
Agora o efeito usa `body.scroll-reveal-ready .scrollRevealItem`, com prioridade maior, para revelar os blocos conforme a rolagem.


## ScrollReveal.js real

Esta versão usa o pacote oficial `scrollreveal` importado no React:

```js
import ScrollReveal from "scrollreveal";
```

A animação é aplicada em `useRevealAnimations()` com `ScrollReveal().reveal(...)`.


## Correção de imagens na Vercel

As imagens e ícones agora ficam em:

```txt
public/assets
```

No Vite/Vercel, arquivos chamados por string como `/src/assets/...` não são servidos no build final.  
Por isso os caminhos foram trocados para:

```txt
/assets/...
```

Assim funciona em `npm run dev`, `npm run build` e na Vercel.
