import './deletePopUp.css'
interface deleteProps {
    message: string;
    nodelete: () => void;
    Cancel: () => void;
  }
const DeletePopUp = ({ message, nodelete, Cancel }:deleteProps) => {
  return (
    <div className="popup-delete">
    <div className="popup">
      <p className='message'>{message}</p>
      <div className="popup-button">
        <button onClick={nodelete} className="popup-yes">Yes</button>
        <button onClick={Cancel} className="popup-no">No</button>
      </div>
    </div>
  </div>
  )
}

export default DeletePopUp
