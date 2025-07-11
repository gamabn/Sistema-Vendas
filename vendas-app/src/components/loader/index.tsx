interface LoaderProps {
    show: boolean;
}

export const Loader: React.FC<LoaderProps> = () => {
    return(
        <div id="loader" style={{
            backgroundColor:'rgba(255,255,255,0.5)',
            width: '100%',
            height:'100%',
            position:'fixed',
            top:'30%',
            left:'20%',
            display:'flex' ,
            justifyContent:'center',
            alignItems:'center',
            zIndex: '1000' 
             }}>
                <div style={{
                    position:'absolute',
                    left:'20%',
                    top: '30%',
                }}>
                    <div className="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        </div></div>
                   </div>
    )
}