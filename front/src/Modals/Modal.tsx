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
        <ModalWrapper style={{display: props.visible ? 'flex' : 'none'}}>
            <ModalInner>
                <ModalContent>
                    <CloseArea>
                        <CloseButton onClick={props.closeModal}>X</CloseButton>
                    </CloseArea>
                    <ModalHeader>
                        {props.title && <h2>title</h2>}
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
    `;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;
const ModalInner = styled.div`
    width: 520px;
    transform-origin: 249px 375px;
    box-sizing: border-box;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum","tnum";
    position: relative;
    top: 100px;
    width: auto;
    margin: 0 auto;
    padding: 0 0 24px;
    pointer-events: none;
`;
const ModalContent = styled.div`
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-radius: 4px;
    -webkit-box-shadow: 0 4px 12px rgba(0,0,0,.15);
    box-shadow: 0 4px 12px rgba(0,0,0,.15);
    pointer-events: auto;
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
