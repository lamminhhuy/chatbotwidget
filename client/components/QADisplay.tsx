import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { QA } from "@/types/chat"


interface QADisplayProps {
  qaList: QA[]
}

const QADisplay: React.FC<QADisplayProps> = ({ qaList }) => {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border">
      {qaList.map((qa, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Q: {qa.question}</h3>
            <p className="text-gray-700">A: {qa.answer}</p>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  )
}

export default QADisplay

