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
        <button
          type="button"
          aria-pressed={author === 'bot'}
          aria-label={`Enviar como ${author === 'user' ? 'Usuário' : 'Robô'}. Clique para alternar para ${author === 'user' ? 'Robô' : 'Usuário'}`}
          title={`Enviar como ${author === 'user' ? 'Usuário' : 'Robô'}. Clique para alternar`}
          onClick={() => setAuthor((currentAuthor) => (currentAuthor === 'user' ? 'bot' : 'user'))}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-900 text-white transition-colors hover:bg-gray-700"
        >
          {author === 'user' ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect x="4" y="7" width="16" height="13" rx="3" />
              <path d="M12 3v4M9 13h.01M15 13h.01M9 17h6" />
            </svg>
          )}
        </button>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Digite uma mensagem..."
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
