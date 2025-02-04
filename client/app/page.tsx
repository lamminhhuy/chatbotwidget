'use client'
import { useEffect, useState } from "react"
import ChatWidget from "../components/ChatWidget"
import { deleteCookie } from 'cookies-next';
import { parseCSV } from "@/utils/csvParser";
import CSVDisplay from "@/components/CSVDisplay";

export default function Home() {
  useEffect(()=> {
    deleteCookie('sessionId')
  },[])
  const [parsedContent, setParsedContent] = useState<
    Array<{
      type: "qa" | "other"
      question?: string
      answer?: string
      content?: string
    }>
  >([])
  const [isLoading, setIsLoading] = useState(true)

  const CSV_URL = "/OWASPQA.csv"

  useEffect(() => {
    async function fetchAndParseCSV() {
      try {
        const response = await fetch(CSV_URL)
        const text = await response.text()
        const parsed = parseCSV(text)
        setParsedContent(parsed)
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error)
        setParsedContent([{ type: "other", content: "Error loading data. Please try again." }])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAndParseCSV()
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 py-12">
    <h1 className="text-2xl font-bold mb-4">OWASP Q&A and Information</h1>
      <CSVDisplay content={parsedContent} isLoading={isLoading} />
      <ChatWidget />
    </main>
  )
}

