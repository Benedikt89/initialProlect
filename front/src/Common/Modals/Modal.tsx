import React, {ReactNode} from 'react';
import styled from "styled-components";

interface I_Props {
    title?: string
    visible: boolean
    closeModal: () => void
    acceptCallback?: () => void
    children?: ReactNode
}

const WithModal: React.FC<I_Props> = (props: I_Props) => {

    return (
        <ModalWrapper style={{display: props.visible ? 'flex' : 'none'}} onClick={props.closeModal}>
            <ModalInner style={{ zIndex: 20 }}>
                <ModalContent>
                    <CloseArea>
                        <CloseButton onClick={props.closeModal}>X</CloseButton>
                    </CloseArea>
                    <ModalHeader>
                        <h2>{ props.title ? props.title : 'title' }</h2>
                    </ModalHeader>
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                    <ModalFooter>
                        {props.acceptCallback && <button onClick={props.acceptCallback}>Accept</button>}
                    </ModalFooter>
                </ModalContent>
            </ModalInner>
        </ModalWrapper>
    );
};

export default WithModal;

const CloseArea = styled.a`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 0;
    color: rgba(0,0,0,.45);
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    -webkit-transition: color .3s;
    transition: color .3s;
`;
const CloseButton = styled.span`
    display: block;
    width: 56px;
    height: 56px;
    font-size: 16px;
    font-style: normal;
    line-height: 56px;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
    pointer-events: auto;
    `;

const ModalWrapper = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 9;
`;
const ModalInner = styled.div`
    position: fixed;
    top: calc(50vh - 50px);
    left: calc(50vw - 410px);
    transform-origin: 249px 375px;
    box-sizing: border-box;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum","tnum";
    padding: 0 0 24px;
    pointer-events: none;
    z-index: 1000;
`;
const ModalContent = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    z-index: 21;
    width: 420px;
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-radius: 4px;
    -webkit-box-shadow: 0 4px 12px rgba(0,0,0,.15);
    box-shadow: 0 4px 12px rgba(0,0,0,.15);
    pointer-events: none;
`;
const ModalHeader = styled.div`
    padding: 16px 24px;
    color: rgba(0,0,0,.65);
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
`;
const ModalBody = styled.div`
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
`;
const ModalFooter = styled.div`
    padding: 10px 16px;
    text-align: right;
    background: transparent;
    border-top: 1px solid #e8e8e8;
    border-radius: 0 0 4px 4px;
`;
