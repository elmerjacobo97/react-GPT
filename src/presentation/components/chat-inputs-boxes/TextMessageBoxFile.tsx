import { FormEvent, useState, KeyboardEvent, useRef } from 'react';

interface Props {
  onSendMessage(message: string): void;
  placeholder?: string;
  disabledCorrections?: boolean;
  accept?: string;
}

export const TextMessageBoxFile = ({ onSendMessage, placeholder = 'Escribe un mensaje...', disabledCorrections = false, accept }: Props) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      clearImage(); // Limpiar la imagen seleccionada y la vista previa
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImagePreviewUrl(fileUrl);
    } else {
      clearImage();
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="flex w-full">
      <div className="flex flex-col flex-grow p-3 border border-gray-400 rounded-xl">
        <div className="relative">
          {imagePreviewUrl && (
            <div className="relative w-8 h-8">
              <img src={imagePreviewUrl} alt="Preview" className="w-full h-full rounded-full" />
              <button
                type="button"
                onClick={clearImage}
                className="absolute flex items-center justify-center w-4 h-4 text-white bg-gray-600 rounded-full -right-1 -top-1 hover:bg-gray-700"
              >
                <i className="text-xs fas fa-times"></i>
              </button>
            </div>
          )}
          <div className="flex items-center flex-grow">
            <div className="mr-3">
              <button type="button" onClick={() => inputFileRef.current?.click()}>
                <i className="text-xl fas fa-paperclip"></i>
              </button>
              <input type="file" name="file" ref={inputFileRef} className="hidden" accept={accept} onChange={handleFileChange} />
            </div>
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
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-10 h-10 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
