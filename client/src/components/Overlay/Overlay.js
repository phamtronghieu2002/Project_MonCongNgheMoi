export default function OverLay({ children, zIndex = 9999 }) {
    return (

        <div

            style={
                {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: zIndex,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center'
                }
            }
            className="overlay">
            {children}
        </div>
    );
}