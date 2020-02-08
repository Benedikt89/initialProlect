import React, {ReactNode} from "react";
import styled from "styled-components";

interface I_Props {
    visible: boolean
    content: React.ReactNode
    children?: ReactNode
    color?: string
}

const Popover: React.FC<I_Props> = ({visible, content, children, color}: I_Props) => {
    return (
        <div style={{
            position: 'relative',
            width: "fit-content"
        }}>
            {visible &&
            <PopoverContent style={{backgroundColor: color ? color : 'white'}}>
                {content}
            </PopoverContent>}
            {children}
        </div>
    )
};
export default Popover;

const PopoverContent = styled.div`
    position: absolute;
    left: 120px;
    transform-origin: -4px 0px;
    padding-left: 10px;
    box-sizing: border-box;
    margin: 0;
    padding: 10px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum","tnum";
    z-index: 1030;
    font-weight: 400;
    white-space: normal;
    text-align: left;
    cursor: auto;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.15);
    box-shadow: 0 2px 8px rgba(0,0,0,.15);
`;