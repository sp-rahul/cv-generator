import React, {useContext} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever} from "react-icons/md";
import {iconButton} from "../../../@common/style/style";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"

interface ILine {
    index: number
}

function Line(props: ILine) {
    const [isEdit, setISdit] = React.useState(false)
    const {setData} = useContext(DBContext);

    function handleDelete(index: number) {
        setData((pre: any) => {
            pre.splice(index, 1)
            return [...pre]
        })
    }


    return (
        <motion.div
            exit={{scale: [0.5, 0]}} animate={{
            scale: [0.5, 1],
            borderRadius: ["20%", "0%"],
        }} className='h-px my-8 border-black border-4 w-full relative'>
            <div className="absolute top-0 right-0 flex ">
                <IconButton style={iconButton.error} Icon={<MdDeleteForever/>}
                            onclick={() => handleDelete(props.index)}/>
            </div>


        </motion.div>
    );
}

export default Line;