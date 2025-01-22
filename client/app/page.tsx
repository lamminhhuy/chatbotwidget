import ChatWidget from "../components/ChatWidget"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Huy's website!</h1>
      <p className="text-xl">Feel free to use the chat widget if you need any assistance.</p>
      <ChatWidget />
    </main>
  )
}

