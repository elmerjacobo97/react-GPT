import Markdown from 'react-markdown';

interface Props {
  text: string;
}

export const GtpMessage = ({ text }: Props) => {
  return (
    <div className="col-start-1 col-end-9 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-600 rounded-full">G</div>
        <div className="relative px-4 py-3 ml-3 text-sm bg-black bg-opacity-25 shadow rounded-xl">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  );
};
