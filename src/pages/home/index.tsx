import React from "react"
import DropDown from "../../@common/components/DropDown";
import {db as data} from "../../db/db";
import {Types} from "../../@common/interface/interface";
import Summary from "./components/Summary";
import {DBContext} from "../../@common/context/DBContext";
import {useForm} from "react-hook-form";
import {AnimatePresence} from "framer-motion";

type FormValues = {
    title: string;
    content: string;
};
export default function Home() {
    const {register, reset, setValue, getValues, handleSubmit} = useForm<FormValues>();

    const [db, setDB] = React.useState(data)
    const items = [
        {name: 'summary', type: Types.summary},
        {name: 'education', type: Types.education}
    ]

    function renderSection(item: any) {
        switch (item.type) {
            case Types.summary:
                return <Summary
                    key={item.id}
                    index={item.index}
                    title={item.title}
                    heading={item.heading}
                    content={item.content}/>

            case Types.education:
                return <Summary
                    index={item.index}
                    title={item.title}
                    heading={item.heading}
                    content={item.content}/>
            default:
                return null

        }

    }


    return (
        <DBContext.Provider value={{db, setDB, register, reset, setValue, getValues}}>
            <div className="mx-40 border rounded min-h-screen bg-gray-50 flex flex-col items-center">
                <AnimatePresence>
                    {
                        db.map((el: any, index: number) => {
                            return renderSection({...el, index})
                        })
                    }
                </AnimatePresence>
                <div>
                    <DropDown items={items}/>
                </div>
            </div>
        </DBContext.Provider>
    )
}