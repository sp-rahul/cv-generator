import React from 'react';

export enum inputType {
    'text' = 'text',
    'textarea' = 'textarea',
    'file' = 'file'
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
                              className="block p-2.5 m-1 w-full text-sm text-gray-900 bg-transparent rounded border  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder={props.name} required/>
            case inputType.textarea:
                return <textarea defaultValue={props?.defaultValue} {...props.register(props.name)} rows={2}
                                 className="block p-2.5 m-1 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 placeholder={props.name}></textarea>

            case inputType.file:
                return <fieldset defaultValue={props?.defaultValue} {...props.register(props.name)} rows={2}
                                 className="block p-2.5 m-1 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 placeholder={props.name}></fieldset>
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