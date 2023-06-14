import React, {useRef} from 'react';
import './App.css';
import Home from "./pages/home";
import jsPDF from "jspdf";
import IconButton from "./@common/components/IconButton";
import {iconButton} from "./@common/style/style";
import {BiDownload} from "react-icons/bi";


function App() {

    const reportTemplateRef = useRef(null);

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a1',
            putOnlyUsedFonts: true,
        });


        // Adding the fonts.
        doc.setFont('arial', 'normal');
        

        // @ts-ignore
        doc.html(reportTemplateRef.current, {
                async callback(doc: jsPDF) {

                    await doc.save('document');
                },

                x: 10,
                y: 10,
                margin: 10,
                windowWidth: 650,
            },
        );
    };


    return (
        <div>
            <div className="float-right sticky top-0 ">
                <IconButton style={iconButton.download} Icon={<BiDownload/>}
                            onclick={handleGeneratePdf}/>
            </div>


            <div ref={reportTemplateRef}>
                <Home/>
            </div>


        </div>

    );


}

export default App;

