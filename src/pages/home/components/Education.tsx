import React, {useContext, useState} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {iconButton} from "../../../@common/style/style";
import TextInputShow, {inputType} from "../../../@common/components/TextInputShow";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"
import {useForm} from "react-hook-form";
import {AiOutlineCheck} from "react-icons/ai";
import {handleDelete, handleEdit} from "../../../@common/functions/common";

interface IEducation {
    index: number
    result: string
    institution: string
    passing_year: string
    subject: string
    id: string,
    is_new: boolean
}

type FormValues = {
    result: string
    institution: string
    passing_year: string
    subject: string
};

function Education(props: IEducation) {
    console.log("Hit education")
    const {
        register, reset,
        getValues,
        handleSubmit
    } = useForm<FormValues>();
    const [isEdit, setIsEdit] = React.useState(props?.is_new)
    const {data, setData} = useContext(DBContext);
    const [count, setCount] = useState(1)


    React.useEffect(() => {
        reset({
            result: props.result,
            institution: props.institution,
            passing_year: props.passing_year,
        });
    }, [])

    return (
        <motion.form
            key={props.id}
            exit={{scale: [0.5, 0]}} animate={{
            scale: [0.5, 1],
            borderRadius: ["20%", "0%"],
        }} className=' group border w-full text-left py-4  px-2 relative'>
            <div className="absolute top-0 right-0 flex ">
                <IconButton style={iconButton.secondary} Icon={!isEdit ? <MdModeEdit/> : <AiOutlineCheck/>}
                            onclick={() => handleEdit(props.id, data, setData, handleSubmit, isEdit, setIsEdit)}/>

                <IconButton style={iconButton.error} Icon={<MdDeleteForever/>}
                            onclick={() =>
                                handleDelete(props.id, setData)
                            }/>
            </div>
            <TextInputShow type={inputType.text} name={'result'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.result}
                           value={getValues("result")}/>

            <TextInputShow type={inputType.text} name={'passing_year'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.passing_year}
                           value={getValues("passing_year")}/>
            <TextInputShow type={inputType.text}
                           name={'subject'} isEdit={isEdit} register={register} defaultValue={props.subject}
                           value={getValues("subject")}/>

            <TextInputShow type={inputType.textarea}
                           name={'institution'} isEdit={isEdit} register={register} defaultValue={props.institution}
                           value={getValues("institution")}/>
        </motion.form>
    );
}

export default Education;