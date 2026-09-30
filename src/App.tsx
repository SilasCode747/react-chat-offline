import { useEffect, useRef, useState } from 'react'
import MessageBubble from './components/MessageBubble'
import MessageComposer from './components/MessageComposer'
import type { Message, MessageAuthor } from './types/message'

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend(content: string, author: MessageAuthor) {
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: crypto.randomUUID(),
        author,
        content,
      },
    ])
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 p-4">
      <section aria-label="Histórico da conversa" className="flex flex-col gap-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={lastMessageRef} aria-hidden="true" />
      </section>
      <MessageComposer onSend={handleSend} />
    </main>
  )
}