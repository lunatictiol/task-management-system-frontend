interface CustomPopUpProps {
    message: string; 
    label:string
    onClose: () => void;
    onAccept:()=> void; 
  }

const  CustomPop: React.FC<CustomPopUpProps> = ({ message,label, onClose,onAccept }) => {
  return (
    <div className="task-edit-form bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">{message}</h2>
    
    <div className="flex justify-end space-x-4">
        <button
            onClick={onAccept}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition-colors"
        >
            {label}
        </button>
        <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none transition-colors"
        >
            Dismiss
        </button>
    </div>
</div>

  )
}

export default CustomPop