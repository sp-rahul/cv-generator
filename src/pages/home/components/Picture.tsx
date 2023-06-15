import React, {useContext, useEffect, useState} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever} from "react-icons/md";
import {iconButton} from "../../../@common/style/style";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"
import {handleDelete} from "../../../@common/functions/common";
import {AiOutlineCheck} from "react-icons/ai";

interface IPicture {

    index: number
    id: string
    picture: string
}

function Picture(props: IPicture) {

    const {data, setData} = useContext(DBContext);
    const [isDone, setIsDone] = useState(false)


    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState("")

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        (async () => {
            if (!selectedFile) {
                setPreview("")

                return
            }

            const objectUrl: any = URL.createObjectURL(selectedFile)
            let imgConvert: any = await blobToBase64(selectedFile)
            setPreview(imgConvert)

            return () => URL.revokeObjectURL(objectUrl)
        })()
    }, [selectedFile])

    const blobToBase64 = (blob: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result);
                resolve(reader.result);
            };
        });
    };

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null)

            return
        }
        setSelectedFile(e.target.files[0])
    }

    const handlePicSubmit = (id: any, data: any, setData: any) => {
        console.log("Hit on picture")
        setData((pre: any) => {
            const new_db = pre.map((el: any) => {
                if (el.id === id) {
                    return {...el, picture: preview}
                }
                return el
            })
            return [...new_db]
        })
        console.log("data", data)
    }

    function findFileImage() {

        // setIsDone(true)
        return props.picture;
    }

    return (
        <motion.div
            key={props.id}
            exit={{scale: [0.5, 0]}} animate={{
            scale: [0.5, 1],
            borderRadius: ["20%", "0%"],
        }} className=' group border w-full text-left py-4  px-2 relative'>
            <div className="absolute top-0 right-0 flex ">


                {!findFileImage() && <IconButton style={iconButton.secondary} Icon={<AiOutlineCheck/>}
                                                 onclick={() => handlePicSubmit(props.id, data, setData)}/>}


                <IconButton style={iconButton.error} Icon={<MdDeleteForever/>}
                            onclick={() =>
                                handleDelete(props.id, setData)
                            }/>
            </div>


            {!findFileImage() ? <>

                    <input className={`${preview && 'hidden'}`} name="thumbnail" id="thumbnail" type='file'
                           onChange={onSelectFile}/>
                    {preview && <label htmlFor='thumbnail'>
                        <input name="thumbnail" id="thumbnail" type='file'
                               onChange={onSelectFile}/>
                        <img
                            className={`h-auto max-w-lg rounded-lg ${!preview && 'hidden'}`}
                            style={{width: 200, height: 150}}
                            src={preview}

                        />
                    </label>
                    }
                </>

                :
                <img
                    className={"h-auto max-w-lg rounded-lg"}
                    style={{width: 200, height: 150}}
                    src={findFileImage()}
                    alt={"picture"}
                />
            }


        </motion.div>
    );
}

export default Picture;