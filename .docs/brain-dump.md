# Projeto: Chat offline

Projeto de uma janela unica de chat em que eu consigo enviar mensagens como usuário e como robô
(através de um toggle no input de mensagem)

## Aspectos Técnicos 

Projeto feito com vite + react + typescript + tailwind
Todos os types salvos na pasta src/types (usando type e não interface)
Todos os componentes salvos na pasta src/components
O histórico de chat deve estar em um state sem persistência

## Aspectos visuais

A tela vai ter fundo de marrom claro ,

Todo o chat (incluindo histórico de mensagens e input) terão uma largura máxima(2xl), centralizado, em tela maior.

O input será em um card com fundo branco e altura ajustada conforme a mensagem.

o card ficará no canto inferior o tempo inteiro

Dentro do card do input, do lado direito:
- Botão de enviar, que fica desabilitado quando não tiver mensagem digitada.

Dentro do card do input, do lado esquerdo:
- Um botão que servirá como toggle para marcar se a mensagem enviada será via usuário(e fica do lado direito do histórico) ou robô (e fica do lado esquerdo do histórico)
- Quando o toggle estiver ativado (robô) o card do input terá a borda roxa, indicando 
visualmente que a mensagem enviada será enviada como robô e não usuário.