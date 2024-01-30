import { FormEvent, useState, KeyboardEvent } from 'react';

interface Props {
  onSendMessage(message: string, selectedOption: string): void;
  placeholder?: string;
  disabledCorrections?: boolean;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
}

export const TextMessageBoxSelect = ({ onSendMessage, placeholder = 'Escribe un mensaje...', disabledCorrections = false, options }: Props) => {
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (message.trim()) {
      onSendMessage(message, selectedOption);
      setMessage(''); // Limpiar el textarea después de enviar
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Evitar el salto de línea
      sendMessage(); // Enviar el mensaje
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="flex items-center w-full">
      <div className="flex items-center flex-grow p-3 border border-gray-400 rounded-xl">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          name="message"
          placeholder={placeholder}
          className="flex-grow p-2 bg-transparent focus:outline-none placeholder:text-gray-400 rounded-l-xl"
          autoComplete={disabledCorrections ? 'off' : 'on'}
          autoCorrect={disabledCorrections ? 'off' : 'on'}
          spellCheck={!disabledCorrections}
          rows={1}
          style={{ resize: 'none' }}
        ></textarea>
        <select
          name="option"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-2/5 h-10 mr-4 text-sm bg-white border border-gray-400 rounded-md shadow-sm bg-opacity-10 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Seleccione</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.text}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!message.trim()}
          className="w-10 h-10 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
