import React, {useContext} from "react"
import {Dropdown} from "flowbite-react";
import {IDropdown, TItem, Types} from "../interface/interface";
import {GrAddCircle} from "react-icons/gr";
import {DBContext} from "../context/DBContext";


var id = 4
export default function DropDown(props: IDropdown) {
    const {setData} = useContext(DBContext);

    function addNewItem(item: TItem) {
        id += 1;
        switch (item.type) {
            case Types.heading:
                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type,
                    title: 'Title heading',
                }])
                break;
            case Types.summary:
                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type,
                    heading: 'heading summary',
                    title: 'title summary',
                    content: 'content summary',
                }])
                break;
            case Types.line:
                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type
                }])
                break;
            case Types.project:
                setData((pre: any) => [...pre, {
                    id: id,
                    type: item.type,
                    heading: 'Heading project',
                    title: 'Title',
                    content: 'Content Project',
                    duration: 'march 2020 - december 2020',
                    description: 'js, java, c'
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


                }])
                break;
            default:
                break;
        }

    }

    return (
        <Dropdown
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