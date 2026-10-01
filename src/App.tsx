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
    <div className="h-dvh overflow-hidden bg-[#e9e0d6]">
      <main className="mx-auto flex h-full w-full max-w-2xl flex-col gap-4 px-3 py-3 sm:px-4 sm:py-5">
        <section
          aria-label="Histórico da conversa"
          className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pb-2"
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={lastMessageRef} aria-hidden="true" />
        </section>
        <MessageComposer onSend={handleSend} />
      </main>
    </div>
  )
}