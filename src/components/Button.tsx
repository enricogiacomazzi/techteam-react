import React, { PropsWithChildren } from 'react';
import { JsxElement } from 'typescript';

interface ButtonProps {
    inner?: string;
    clicked: () => void;
}


export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({inner, clicked, children}) => (
    <button className="btn btn-primary m-1" onClick={clicked}>{inner ?? children}</button>
)