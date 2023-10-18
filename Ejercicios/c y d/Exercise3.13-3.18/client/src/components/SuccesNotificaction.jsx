const SuccesNotificaction = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="succes">
        {message}
      </div>
    )
  }
  
  export default SuccesNotificaction