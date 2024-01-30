type Props = {
  text: string;
};

export const MyMessage = ({ text }: Props) => {
  return (
    <div className="col-start-6 col-end-13 rounded-lg">
      <div className="flex flex-row-reverse items-center">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full">E</div>
        <div className="relative px-4 py-3 mr-3 text-sm bg-indigo-600 bg-opacity-25 shadow rounded-xl" style={{ whiteSpace: 'pre-wrap' }}>
          <div className="text-center text-white">{text}</div>
        </div>
      </div>
    </div>
  );
};
