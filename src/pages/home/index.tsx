import React, {useEffect, useRef} from "react"
import DropDown from "../../@common/components/DropDown";
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
import Picture from "./components/Picture";
import IconButton from "../../@common/components/IconButton";
import {iconButton} from "../../@common/style/style";
import {BiDownload} from "react-icons/bi";
import jsPDF from "jspdf";

type FormValues = {
    title: string;
    content: string;
    heading: string;
    duration: string;
    description: string;
    institution: string;
    result: string;
    passing_year: string;
    subject: string;
    email: string,
    phone: string,
    github: string,
    linkedin: string,
    address: string,
    picture: string,
};
export default function Home() {
    let init = true
    const {
        register,
        reset,
        setValue,
        getValues
    } = useForm<FormValues>();

    const [data, setData] = React.useState(() => {
        const storedData = localStorage.getItem('data');
        if (storedData) {
            const dataFromStorage = JSON.parse(storedData)
            return dataFromStorage
        }
        return []
    })


    useEffect(() => {
        console.log('data', 'lcoal', data)
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);


    const dropDownItems = [
        {name: 'summary', type: Types.summary},
        {name: 'education', type: Types.education},
        {name: 'heading', type: Types.heading},
        {name: 'line', type: Types.line},
        {name: 'project', type: Types.project},
        {name: 'basic_info', type: Types.basic_info},
        {name: 'picture', type: Types.picture},
    ]

    function renderSection(item: any) {
        switch (item.type) {

            case Types.summary:
                return <Summary key={item?.id}
                                {...item}/>


            case Types.heading:
                return <Heading key={item.id} {...item}/>

            case Types.line:
                return <Line key={item.id} {...item}/>

            case Types.project:
                return <Project
                    key={item.id}
                    {...item}

                />
            case Types.education:
                return <Education
                    key={item.id}
                    {...item}

                />

            case Types.basic_info:
                return <Basic_info
                    key={item.id}
                    {...item}

                />

            case Types.picture:
                return <Picture key={item.id} {...item}/>


            default:
                return null

        }

    }

    const reportTemplateRef = useRef(null);

    const handleGeneratePdf = () => {
        // const doc = new jsPDF('p', 'px', [1050, 1485]);
        //
        //
        // // Adding the fonts.
        // doc.setFont('arial', 'normal');
        //
        // // @ts-ignore
        // doc.html(reportTemplateRef.current, {
        //         async callback(doc: jsPDF) {
        //
        //             await doc.save('document');
        //             window.open(doc.output('bloburl')); // To debug.
        //         }
        //     },
        // );

        const content = document.getElementById('divToPrint')!
        console.log("content", content)

        const doc = new jsPDF('p', 'px', "a4");
        doc.html(content, {
            callback: function (doc) {
                doc.save('sample.pdf');
                window.open(doc.output('bloburl'));
            },
            html2canvas: {scale: 0.43}
        });
        // doc.save("a4.pdf");
        // window.open(doc.output('bloburl'));
    };


    return (

        <>
            <div className="float-right sticky top-0 ">
                <IconButton style={iconButton.download} Icon={<BiDownload/>}
                            onclick={handleGeneratePdf}/>
            </div>

            <DBContext.Provider value={{data, setData, register, reset, setValue, getValues, init}}>


                <div ref={reportTemplateRef} id="divToPrint"
                     className="mx-40  rounded min-h-screen bg-gray-50 flex flex-col items-center">


                    <AnimatePresence>
                        {
                            data.map((item: any, index: number) => {
                                return renderSection({...item, index})
                            })
                        }
                    </AnimatePresence>
                    <div data-html2canvas-ignore="true" className="m-2">
                        <DropDown items={dropDownItems}/>

                    </div>
                </div>
            </DBContext.Provider>


        </>
    )
}