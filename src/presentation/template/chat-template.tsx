import { useState } from 'react';
import { GtpMessage, MyMessage, TypingLoader, TextMessageBox } from '../components';

interface Message {
  text: string;
  isGTP: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGTP: false }]);

    // TODO: use-cases
    setIsLoading(false);

    // TODO: añadir el mensaje de isGTP en true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GtpMessage text="Hola, ¿cómo te llamas?" />
          {messages.map((message, index) =>
            message.isGTP ? <GtpMessage key={index} text="Message de GPT" /> : <MyMessage key={index} text={message.text} />
          )}
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBox onSendMessage={handlePost} placeholder="Mensaje ReactGPT..." disabledCorrections />
    </div>
  );
};
