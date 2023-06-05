import React from 'react';

export enum inputType {
    'text' = 'text',
    'textarea' = 'textarea'
}

type TTextInputShow = {
    name: string
    isEdit: boolean

    register: any
    value?: string
    defaultValue?: string
    style?: string
    type: inputType
    children?: any
};


function TextInputShow(props: TTextInputShow) {
    function renderInputType(type: inputType) {
        switch (type) {
            case inputType.text:
                return <input defaultValue={props?.defaultValue} {...props.register(props.name)} type="text"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder="" required/>
            case inputType.textarea:
                return <textarea defaultValue={props?.defaultValue} {...props.register(props.name)} rows={4}
                                 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 placeholder=""></textarea>
            default:
                return null
        }

    }

    return (
        <div>
            {
                props.isEdit ?
                    renderInputType(props.type)
                    :
                    <p className={props?.style}>
                        {props?.value}
                    </p>
            }
            {
                props?.children
            }
        </div>
    );
}

export default TextInputShow;