import React from 'react';


type IIconButton = {
    Icon: any
    style?: string
    onclick: any
};

function IconButton(props: IIconButton) {
    return (
        <button
            onClick={props.onclick}
            type="button"
            className={props?.style}>
            {
                props.Icon
            }
        </button>
    );
}

export default IconButton;