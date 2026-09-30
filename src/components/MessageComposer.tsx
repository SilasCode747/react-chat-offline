import { useEffect, useRef, useState } from 'react'
import type { MessageAuthor } from '../types/message'

type MessageComposerProps = {
  onSend: (content: string, author: MessageAuthor) => void
}

const maximumTextareaHeight = 160

export default function MessageComposer({ onSend }: MessageComposerProps) {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState<MessageAuthor>('user')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current

    if (!textarea) {
      return
    }

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, maximumTextareaHeight)}px`
    textarea.style.overflowY = textarea.scrollHeight > maximumTextareaHeight ? 'auto' : 'hidden'
  }, [content])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedContent = content.trim()

    if (!trimmedContent) {
      return
    }

    onSend(content, author)
    setContent('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 rounded-xl border bg-white p-4 shadow-sm ${
        author === 'bot' ? 'border-purple-500' : 'border-gray-200'
      }`}
    >
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-gray-700">Enviar como</legend>
        <div className="flex gap-2" role="radiogroup" aria-label="Autor da mensagem">
          {(['user', 'bot'] as const).map((option) => {
            const isSelected = author === option
            const label = option === 'user' ? 'Usuário' : 'Robô'

            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setAuthor(option)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Digite uma mensagem"
          aria-label="Mensagem"
          rows={1}
          className="min-h-12 flex-1 resize-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          disabled={!content.trim()}
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Enviar
        </button>
      </div>
    </form>
  )
}
