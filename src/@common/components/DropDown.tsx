import React, {useContext} from "react"
import {Dropdown} from "flowbite-react";
import {IDropdown, TItem} from "../interface/interface";
import {GrAddCircle} from "react-icons/gr";
import {DBContext} from "../context/DBContext";


var id = 4
export default function DropDown(props: IDropdown) {
    const {setDB} = useContext(DBContext);

    function addNewItem(item: TItem) {
        id += 1
        setDB((pre: any) => [...pre, {
            id: id,
            type: item.type,
            heading: 'a',
            title: 'b',
            content: 'c',
        }])
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