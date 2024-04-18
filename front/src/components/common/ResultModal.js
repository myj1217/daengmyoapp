const ResultModal = ({ title, content, callbackFn }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg rounded w-1/4 min-w-[600px]">
        <div className="bg-warning-400 py-6 text-center text-2xl border-b border-gray-500">
          {title}
        </div>
        <div className="p-6 text-4xl border-b border-gray-500">{content}</div>
        <div className="flex justify-end">
          <button
            className="bg-gray-800 text-white text-lg px-6 py-4 rounded mt-4 mr-4 mb-4"
            onClick={() => {
              if (callbackFn) {
                callbackFn();
              }
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
