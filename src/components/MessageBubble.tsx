import type { Message } from '../types/message'

type MessageBubbleProps = {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUserMessage = message.author === 'user'
  const authorLabel = isUserMessage ? 'Usuário' : 'Robô'

  return (
    <article className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUserMessage ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <p className="mb-1 text-sm font-semibold">{authorLabel}</p>
        <p className="whitespace-pre-wrap wrap-anywhere">{message.content}</p>
      </div>
    </article>
  )
}
