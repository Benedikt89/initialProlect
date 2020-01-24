import React from 'react';

const WithModal: React.FC = (props:any) => {
    return (
        <div style={{
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.9
        }}>
            {props.children}
        </div>
    );
};

export default WithModal;
