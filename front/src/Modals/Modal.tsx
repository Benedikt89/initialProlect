import React, {useState} from 'react';

const WithModal: React.FC = (props: any) => {

    const [displaing, setDisplaing] = useState("none")

    const showDiv = () => {
        if (displaing === 'none') setDisplaing('flex')
        else setDisplaing('none')
    }

    let myStyles = {
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.9,
        display: `${displaing}`
    }

    let myStylesBack = {
        display: `${displaing}`,
        color: "black",
        width:"100%",
        height:"100%",
        opacity: "0.5"
    }

    return (
        <div>
            <div style={myStylesBack}>
                <div style={myStyles}>
                    {props.children}
                </div>

            </div>
            <button onClick={showDiv}>Show more variants</button>
        </div>

    );
};

export default WithModal;
