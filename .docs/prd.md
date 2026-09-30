# PRD: Chat offline

## Visão geral

Implementar uma única tela de chat local em que a pessoa usuária pode adicionar mensagens como **Usuário** ou **Robô**, escolhendo o autor por um toggle no compositor. O histórico existe somente em memória enquanto a tela estiver aberta; não há comunicação com serviços externos nem persistência.

## Objetivo

Oferecer uma interface simples para compor e visualizar mensagens de dois autores, com alinhamento e sinalização visual distintos, em uma janela responsiva de chat.

## Escopo

- Uma única tela e uma única conversa local.
- Envio de mensagens como Usuário ou Robô usando o mesmo campo de composição.
- Histórico armazenado em estado React, sem `localStorage`, banco de dados, API ou sincronização.
- Interface implementada com a configuração existente de Vite, React, TypeScript e Tailwind CSS.

## Fora de escopo

- Autenticação, múltiplos usuários, conversas ou salas.
- Respostas geradas por IA ou qualquer integração de rede.
- Persistência e recuperação do histórico após recarregar ou fechar a tela.
- Edição, exclusão, reações ou anexos de mensagens.

## Requisitos funcionais

1. A tela apresenta o histórico da conversa e um compositor de mensagens fixado na região inferior da janela.
2. O histórico começa vazio e é mantido apenas no estado da aplicação.
3. O compositor permite selecionar se a próxima mensagem será enviada como Usuário ou Robô. O modo inicial é Usuário.
4. Ao enviar, a mensagem recebe o autor selecionado e aparece no histórico: Usuário alinhado à direita; Robô alinhado à esquerda.
5. O envio é feito pelo botão. Enter insere uma quebra de linha; não envia a mensagem.
6. Após o envio, o texto do compositor é limpo e o modo selecionado permanece ativo.
7. O botão de envio fica desabilitado quando o campo está vazio ou contém somente espaços em branco.
8. O campo de composição aceita texto multilinha e aumenta de altura conforme o conteúdo, dentro de um limite visual razoável; depois desse limite, seu conteúdo pode ser rolado.
9. Mensagens novas ficam visíveis no fim do histórico, sem serem encobertas pelo compositor.

## Requisitos visuais e de interação

- Usar fundo marrom claro na tela.
- Centralizar a área do chat em telas maiores e limitar sua largura máxima a `2xl`.
- Usar um card branco para o compositor, posicionado junto à parte inferior da janela.
- No modo Robô, destacar o card do compositor com borda roxa; no modo Usuário, usar a borda neutra padrão.
- O toggle deve comunicar claramente o modo ativo e ser operável por teclado, expondo seu estado acessível.
- O histórico e o compositor devem continuar utilizáveis em telas estreitas, sem rolagem horizontal ou sobreposição.
- Distinguir visualmente autor e conteúdo em cada mensagem além do alinhamento, mantendo contraste legível.

## Restrições técnicas

- Seguir a estrutura existente: componentes em `src/components` e tipos em `src/types`.
- Declarar os tipos com `type`, não `interface`.
- Manter o estado da conversa em React; não adicionar armazenamento persistente.
- Reutilizar as dependências e a configuração existentes, sem reinstalar ou trocar o framework.

## Critérios de aceitação

- A aplicação inicia mostrando uma conversa vazia e o compositor acessível na parte inferior.
- É possível alternar entre Usuário e Robô antes de enviar; o modo Robô ativa a borda roxa do compositor.
- Mensagens enviadas aparecem com autor e alinhamento corretos, inclusive mensagens multilinha.
- Enter cria uma quebra de linha e o botão envia; o botão permanece desabilitado para conteúdo vazio ou só com espaços.
- Depois do envio, o campo limpa, o modo permanece selecionado e a mensagem mais recente fica visível.
- Recarregar a página remove o histórico, confirmando que não há persistência.
- Em larguras desktop e mobile, a área do chat respeita o limite `2xl`, adapta-se ao espaço disponível e o compositor não cobre o histórico.
- `npm run build` e `npm run lint` concluem sem erros.

## Plano de implementação

As tarefas abaixo estão em ordem progressiva; cada etapa fornece a base para a seguinte.

1. **Definir o tipo de mensagem**
   - Criar `src/types/message.ts` com o tipo da mensagem, incluindo identificador, autor (`user` ou `bot`) e conteúdo textual.
   - Manter o tipo enxuto; não adicionar campos sem necessidade funcional, como timestamp.
   - **Concluído quando:** os componentes conseguem compartilhar o mesmo contrato de mensagem, sem declarar tipos duplicados. **Feito.**

2. **Implementar a apresentação de uma mensagem**
   - Criar componente em `src/components` para exibir autor e conteúdo.
   - Aplicar alinhamento à direita para Usuário e à esquerda para Robô, com conteúdo multilinha legível.
   - **Concluído quando:** ambas as variantes podem ser renderizadas a partir do tipo compartilhado. **Feito.**

3. **Implementar o compositor**
   - Criar componente em `src/components` com campo multilinha controlado, toggle de autor e botão de envio.
   - Emitir o texto e o autor selecionado para o componente proprietário; não manter histórico dentro do compositor.
   - Implementar crescimento automático com limite, Enter para nova linha e envio exclusivamente pelo botão.
   - Desabilitar o envio quando o texto aparado estiver vazio; sinalizar o modo Robô com borda roxa.
   - **Concluído quando:** o compositor pode ser usado por teclado e ponteiro e respeita os estados habilitado/desabilitado e os dois modos visuais.

4. **Montar histórico e estado da conversa**
   - No componente principal, armazenar mensagens em estado React e iniciar com lista vazia.
   - Conectar o evento do compositor à inclusão de uma mensagem com identificador estável e autor selecionado.
   - Limpar o texto após envio e preservar o modo selecionado.
   - Renderizar a lista usando o componente de mensagem; rolar para a mensagem mais recente quando apropriado.
   - **Concluído quando:** é possível enviar mensagens dos dois autores e elas aparecem na ordem de envio sem persistência.

5. **Aplicar o layout e os estilos responsivos**
   - Compor a janela com fundo marrom claro, área central de largura máxima `2xl`, histórico rolável e compositor branco ancorado abaixo.
   - Reservar espaço no histórico para que a última mensagem não fique encoberta pelo compositor.
   - Adaptar margens, largura e controles para telas estreitas, preservando contraste e áreas de interação.
   - **Concluído quando:** o layout atende às regras visuais em desktop e mobile sem overflow horizontal.

6. **Validar os fluxos completos**
   - Verificar conversa vazia, alternância de autor, envio por botão, Enter como quebra de linha, validação de conteúdo em branco, limpeza do campo e visibilidade da mensagem mais recente.
   - Confirmar que atualizar a página limpa o histórico.
   - Executar `npm run build` e `npm run lint` e corrigir problemas introduzidos pela implementação.
   - **Concluído quando:** todos os critérios de aceitação acima foram verificados.
