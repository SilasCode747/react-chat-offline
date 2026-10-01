# Chat offline

Aplicação de chat local para compor e visualizar mensagens como Usuário ou Robô. A conversa acontece inteiramente no navegador: não há integração com IA, serviços externos ou armazenamento persistente.

## Funcionalidades

- Alternância entre os modos Usuário e Robô por um botão com ícone.
- Envio de mensagens multilinha pelo botão; Enter insere uma quebra de linha.
- Mensagens do Usuário alinhadas à direita e mensagens do Robô à esquerda.
- Histórico temporário mantido em memória e removido ao recarregar a página.
- Interface responsiva, com histórico rolável e compositor fixado na parte inferior.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Oxlint

## Requisitos

- Node.js
- npm

## Executar localmente

Instale as dependências:

```bash
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação.

## Verificação e build

Execute o lint:

```bash
npm run lint
```

Gere a versão de produção:

```bash
npm run build
```

Para servir localmente a versão gerada:

```bash
npm run preview
```

## Estrutura principal

```text
src/
  components/
    MessageBubble.tsx   # Apresentação de uma mensagem
    MessageComposer.tsx # Composição e seleção do autor
  types/
    message.ts         # Tipos compartilhados das mensagens
  App.tsx               # Estado e histórico da conversa
```