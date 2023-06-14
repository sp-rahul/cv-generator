import React, {useContext} from "react"
import {Dropdown} from "flowbite-react";
import {IDropdown, TItem, Types} from "../interface/interface";
import {GrAddCircle} from "react-icons/gr";
import {DBContext} from "../context/DBContext";
import {v4 as uuid} from 'uuid';
import {SetItem} from "../functions/common";


export default function DropDown(props: IDropdown) {
    const {data, setData} = useContext(DBContext);

    function addNewItem(item: TItem) {
        let id: string = uuid();
        let newItem: boolean = true
        console.log("id", id)
        switch (item.type) {
            case Types.heading:
                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type,
                    title: 'Title heading',
                    newItem: newItem,
                    is_new: true


                }])
                break;

            case Types.summary:
                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type,
                    heading: '',
                    title: '',
                    content: '',
                    is_new: true
                }])

                break;
            case Types.line:
                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type,
                    is_new: true
                }])

                break;
            case Types.project:
                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type,
                    heading: '',
                    title: '',
                    content: '',
                    duration: '',
                    description: '',
                    is_new: true
                }])

                break;

            case Types.education:
                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type,

                    result: '',
                    institution: '',
                    passing_year: '',
                    subject: '',
                    is_new: true

                }])

                break;

            case Types.basic_info:

                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type,
                    email: 'abc@gmail.com',
                    phone: '01878787832',
                    github: 'github.com/sp-rahul',
                    linkedin: 'linked.com/abc',
                    address: 'Mirpur Dhaka',
                    is_new: true


                }])

                break;

            case Types.picture:
                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type,
                    is_new: true,
                    picture: "",
                }])

                break;

            default:
                break;
        }
        SetItem(data)

    }

    return (
        <Dropdown
            className="m-2 "
            dismissOnClick={true}
            arrowIcon={true}
            floatingArrow={true}
            label={<GrAddCircle/>}

        >
            {
                props.items.map((item: TItem) => {

                    return (<Dropdown.Item onClick={() => addNewItem(item)}>
                        {
                            item.name
                        }
                    </Dropdown.Item>)
                })
            }
        </Dropdown>
    )
}