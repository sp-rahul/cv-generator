import React, {useContext, useState} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {iconButton, summary} from "../../../@common/style/style";
import TextInputShow, {inputType} from "../../../@common/components/TextInputShow";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"
import {useForm} from "react-hook-form";
import {AiOutlineCheck} from "react-icons/ai";
import {handleDelete, handleEdit} from "../../../@common/functions/common";

interface IProject {
    id: string
    index: number;
    title: string;
    heading: string;
    content: string;
    duration: string;
    description: string;
    is_new: boolean
}

type FormValues = {
    title: string;
    content: string;
    heading: string;
    duration: string;
    description: string;
};

function Project(props: IProject) {
    const {register, reset, setValue, getValues, handleSubmit} = useForm<FormValues>();
    const [isEdit, setIsEdit] = React.useState(props?.is_new)
    const {setData} = useContext(DBContext);
    const {data} = useContext(DBContext)
    const [count, setCount] = useState(1)


    React.useEffect(() => {
        reset({
            title: props.title,
            content: props.content,
            heading: props.heading,
            duration: props.duration,
            description: props.description,
        });
    }, [])

    const handleConvert = () => {
        const desc: string = getValues("description");
        if (desc === '') {
            return ''
        }
        let array: string[] = []
        if (typeof desc === 'string') {
            array = desc.split(',');
            console.log(array);
        } else {
            return ''
        }

        console.log('array', array)
        return (
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">

                {array.map((el) => <li>
                    {el}
                </li>)}

            </ul>
        )

    }


    return (
        <motion.form
            key={props.id}
            exit={{scale: [0.5, 0]}} animate={{
            scale: [0.5, 1],
            borderRadius: ["20%", "0%"],
        }} className='group border w-full text-left py-4  px-2 relative'>
            <div className="absolute top-0 right-0 flex ">
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

            <TextInputShow type={inputType.text}
                           name={'duration'} isEdit={isEdit} register={register} defaultValue={props.duration}
                           value={getValues("duration")}/>


            <TextInputShow type={inputType.textarea}
                           name={'description'} isEdit={isEdit} register={register} defaultValue={props.description}

            >
                {!isEdit && handleConvert()}
            </TextInputShow>


        </motion.form>
    );
}

export default Project;