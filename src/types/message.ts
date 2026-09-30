export type MessageAuthor = 'user' | 'bot'

export type Message = {
  id: string
  author: MessageAuthor
  content: string
}
