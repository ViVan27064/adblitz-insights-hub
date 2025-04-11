
import { useState } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, X } from "lucide-react";

const ChatbotBubble = () => {
  const { chatbotOpen, setChatbotOpen, activeSection } = useDashboard();
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    {
      text: "Welcome to AdBlitz! Select a topic to get started.",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const addMessage = (text: string, isBot: boolean) => {
    setMessages((prev) => [...prev, { text, isBot }]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage(input, false);
    setInput("");

    // Simulate bot response based on active section
    setTimeout(() => {
      let response = "";
      
      switch (activeSection) {
        case "trends":
          response = "I see you're looking at Trending Keywords. These are the hashtags gaining popularity across social platforms. Consider incorporating them in your next campaign!";
          break;
        case "tracking":
          response = "Your ROI is looking good! The #Fitness campaign is performing particularly well with a 60% return on investment.";
          break;
        case "targeting":
          response = "Based on our AI analysis, focusing on 18-25 males in Tier-2 cities with Fitness interests could yield great results.";
          break;
        case "competitors":
          response = "Your #Fitness campaign is outperforming competitors by 40%. Keep up the good work!";
          break;
        case "budget":
          response = "I'd recommend allocating more budget to #EcoFriendly ads as they're showing promising ROI potential.";
          break;
        case "campaign":
          response = "Creating a new campaign? Try targeting the demographics shown in the Targeting section for best results.";
          break;
        default:
          response = "How can I help you with your ad campaigns today?";
      }

      addMessage(response, true);
    }, 1000);
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-adblitz-green hover:bg-adblitz-lightgreen shadow-lg z-40 flex items-center justify-center"
        onClick={() => setChatbotOpen(!chatbotOpen)}
      >
        {chatbotOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>

      {chatbotOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 z-40 overflow-hidden flex flex-col shadow-xl animate-fade-in">
          <div className="bg-adblitz-blue text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <h3 className="font-medium">AdBlitz Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-adblitz-lightblue/20"
              onClick={() => setChatbotOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 max-w-[80%] ${
                  msg.isBot ? "mr-auto" : "ml-auto"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    msg.isBot
                      ? "bg-white border"
                      : "bg-adblitz-lightblue text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-adblitz-lightblue"
            />
            <Button
              type="submit"
              className="rounded-l-none bg-adblitz-green hover:bg-adblitz-lightgreen"
            >
              Send
            </Button>
          </form>
        </Card>
      )}
    </>
  );
};

export default ChatbotBubble;
