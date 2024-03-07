const Notification = ({ message, error }) => {
    if (message === null && error === null) {
      return null
    }

    if(message === null){
      return(
        <div className="error">
          {error}
        </div>
      )  
    }

    if(error === null){
      return (
        <div className="message">
          {message}
        </div>
      )
    }    
  
    
  }

  export default Notification