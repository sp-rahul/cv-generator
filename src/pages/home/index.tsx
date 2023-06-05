import React from "react"
import DropDown from "../../@common/components/DropDown";
import {items as collection} from "../../db/items";
import {Types} from "../../@common/interface/interface";
import Summary from "./components/Summary";
import {DBContext} from "../../@common/context/DBContext";
import {useForm} from "react-hook-form";
import {AnimatePresence} from "framer-motion";
import Heading from "./components/Heading";
import Line from "./components/Line";
import Project from "./components/Project";
import Education from "./components/Education";
import Basic_info from "./components/Basic_info";

type FormValues = {
    title: string;
    content: string;
    heading: string;
    duration: string;
    description: string;
    institution: string;
    result: string;
    passing_year: string;
    email: string,
    phone: string,
    github: string,
    linkedin: string,
    address: string,
};
export default function Home() {
    const {
        register, reset, setValue,
        getValues, handleSubmit
    } = useForm<FormValues>();

    const [data, setData] = React.useState(collection)
    const dropDownItems = [
        {name: 'summary', type: Types.summary},
        {name: 'education', type: Types.education},
        {name: 'heading', type: Types.heading},
        {name: 'line', type: Types.line},
        {name: 'project', type: Types.project},
        {name: 'basic_info', type: Types.basic_info},
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


            case Types.heading:
                return <Heading key={item.id} title={item.title} index={item.index}/>
            case Types.line:
                return <Line index={item.index}/>

            case Types.project:
                return <Project
                    key={item.id}
                    index={item.index}
                    title={item.title}
                    heading={item.heading}
                    content={item.content}
                    duration={item.duration}
                    description={item.description}


                />
            case Types.education:
                return <Education
                    key={item.id}
                    index={item.index}

                    result={item.result}
                    passing_year={item.passing_year}
                    institution={item.institution}

                />

            case Types.basic_info:
                return <Basic_info
                    key={item.id}
                    index={item.index}

                    email={item.email}
                    phone={item.phone}
                    github={item.github}
                    linkedin={item.linkedin}
                    address={item.address}

                />


            default:
                return null

        }

    }


    return (
        <DBContext.Provider value={{data, setData, register, reset, setValue, getValues}}>
            <div className="mx-40 border rounded min-h-screen bg-gray-50 flex flex-col items-center">


                <AnimatePresence>
                    {
                        data.map((item: any, index: number) => {
                            return renderSection({...item, index})
                        })
                    }
                </AnimatePresence>
                <div>
                    <DropDown items={dropDownItems}/>
                </div>
            </div>
        </DBContext.Provider>
    )
}