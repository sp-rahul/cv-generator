import React, {useContext} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {iconButton, summary} from "../../../@common/style/style";
import TextInputShow, {inputType} from "../../../@common/components/TextInputShow";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"
import {useForm} from "react-hook-form";
import {AiOutlineCheck} from "react-icons/ai";
import {handleDelete, handleEdit} from "../../../@common/functions/common";

interface ISummary {
    id: string
    index: number
    title: string
    heading: string
    content: string
    is_new: boolean
}

type FormValues = {
    title: string;
    content: string;
};

function Summary(props: ISummary) {
    const style = {
        mdiv: 'group border border-y rounded w-full text-left py-4  px-2 relative',
        div: "absolute top-0 right-0 flex "
    }
    const {
        register, reset,
        getValues,
        handleSubmit
    } = useForm<FormValues>();
    const [isEdit, setIsEdit] = React.useState(props?.is_new)
    const {data, setData} = useContext(DBContext);


    React.useEffect(() => {
        reset({
            title: props.title,
            content: props.content,
        });
    }, [])


    return (
        <motion.div
            key={props.id}
            exit={{scale: [0.5, 0]}}
            animate={{
                scale: [0.5, 1],
                borderRadius: ["20%", "0%"],
            }} className={style.mdiv}>

            <div className={style.div}>
                <IconButton style={iconButton.secondary} Icon={!isEdit ? <MdModeEdit/> : <AiOutlineCheck/>}
                            onclick={() => handleEdit(props.id, data, setData, handleSubmit, isEdit, setIsEdit)}/>

                <IconButton style={iconButton.error} Icon={<MdDeleteForever/>}
                            onclick={() =>
                                handleDelete(props.id, setData)
                            }/>
            </div>

            <TextInputShow type={inputType.text} style={summary.title} name={'title'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.title}
                           value={getValues("title")}/>

            <TextInputShow type={inputType.textarea}
                           name={'content'} isEdit={isEdit} register={register} defaultValue={props.content}
                           value={getValues("content")}/>
        </motion.div>
    );
}

export default Summary;