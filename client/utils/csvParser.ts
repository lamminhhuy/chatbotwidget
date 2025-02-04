interface ParsedContent {
    type: "qa" | "other"
    question?: string
    answer?: string
    content?: string
  }
  
  export function parseCSV(csvData: string): ParsedContent[] {
    const lines = csvData
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
    const parsedContent: ParsedContent[] = []
    let currentQuestion = ""
    let currentAnswer = ""
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.match(/^"\d+\./)) {
        if (currentQuestion && currentAnswer) {
          parsedContent.push({
            type: "qa",
            question: currentQuestion,
            answer: currentAnswer.trim(),
          })
        }
        currentQuestion = line.replace(/^"|"$/g, "")
        currentAnswer = ""
      } else if (line.startsWith('"') && currentQuestion) {
        currentAnswer += line.replace(/^"|"$/g, "") + " "
      } else if (currentQuestion) {
        currentAnswer += line + " "
      } else {
        parsedContent.push({
          type: "other",
          content: line,
        })
      }
    }
  
    if (currentQuestion && currentAnswer) {
      parsedContent.push({
        type: "qa",
        question: currentQuestion,
        answer: currentAnswer.trim(),
      })
    }
  
    return parsedContent
  }
  
  