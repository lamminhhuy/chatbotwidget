import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CSVDisplayProps {
  content: Array<{
    type: "qa" | "other"
    question?: string
    answer?: string
    content?: string
  }>
  isLoading: boolean
}

const CSVDisplay: React.FC<CSVDisplayProps> = ({ content, isLoading }) => {
  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <ScrollArea className="h-[520px] w-full rounded-md border">
      {content.map((item, index) => (
        <Card key={index} className={`mb-4 ${item.type === "qa" ? "bg-blue-50" : "bg-gray-50"}`}>
          <CardContent className="p-4">
            {item.type === "qa" ? (
              <>
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-700">{item.answer}</p>
              </>
            ) : (
              <p className="text-gray-600">{item.content}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  )
}

export default CSVDisplay

