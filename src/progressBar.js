

export const getProgressBar = (x, y) => {

    const containerStyles = {
        width: '80%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
      };
    
      const progressBarContainerStyles = {
        position: 'relative',
        width: '100%',
        height: '40px',
        // backgroundColor:'lightgrey'
      };
    
      const leftProgressBarStyles = {
        position: 'absolute',
        top: '0',
        right: '50%',
        height: '100%',
        width: `${x / 2}%`,
        backgroundColor: 'blue',
      };
    
      const rightProgressBarStyles = {
        position: 'absolute',
        top: '0',
        left:'50%',
        height: '100%',
        width: `${y / 2}%`,
        backgroundColor: 'red',
      };
    
      return (
        <div style={containerStyles}>
          <div  style={progressBarContainerStyles}>
            <div className="d-flex align-items-center justify-content-center" style={leftProgressBarStyles}>{x}%</div>
            <div className="d-flex align-items-center justify-content-center" style={rightProgressBarStyles}>{y}%</div>
          </div>
        </div>
      );
  
};
  
      
    


    


