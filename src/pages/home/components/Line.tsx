import React, {useContext} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever} from "react-icons/md";
import {iconButton} from "../../../@common/style/style";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"
import {handleDelete} from "../../../@common/functions/common";

interface ILine {

    index: number
    id: string
}

function Line(props: ILine) {

    const {setData} = useContext(DBContext);


    return (
        <motion.div
            key={props.id}
            exit={{scale: [0.5, 0]}} animate={{
            scale: [0.5, 1],
            borderRadius: ["20%", "0%"],
        }} className='group h-px my-8 border-black border-4 w-full relative'>
            <div className="absolute top-0 right-0 flex ">


                <IconButton style={iconButton.error} Icon={<MdDeleteForever/>}
                            onclick={() =>
                                handleDelete(props.id, setData)
                            }/>
            </div>


        </motion.div>
    );
}

export default Line;