import React, {useContext} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {iconButton, summary} from "../../../@common/style/style";
import TextInputShow, {inputType} from "../../../@common/components/TextInputShow";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"
import {useForm} from "react-hook-form";

interface ISummary {
    index: number
    title: string
    heading: string
    content: string
}

type FormValues = {
    title: string;
    content: string;
};

function Summary(props: ISummary) {
    const {register, reset, setValue, getValues, handleSubmit} = useForm<FormValues>();
    const [isEdit, setISdit] = React.useState(false)
    const {setDB} = useContext(DBContext);
    const onSubmit = (data: any) => {
        setDB((pre: any) => {
            pre[props.index] = {...pre[props.index], ...data};
            return [...pre]
        })
    };

    function handleDelete(index: number) {
        setDB((pre: any) => {
            pre.splice(index, 1)
            return [...pre]
        })
    }

    function handleEdit(index: number) {
        console.log('clicked')
        if (isEdit) {
            handleSubmit(onSubmit)()
        }
        setISdit(pre => !pre)

    }

    React.useEffect(() => {
        reset({
            title: props.title,
            content: props.content
        });
    }, [])

    return (
        <motion.form
            exit={{scale: [0.5, 0]}} animate={{
            scale: [0.5, 1],
            borderRadius: ["20%", "0%"],
        }} className='border w-full text-left py-4  px-2 relative'>
            <div className="absolute top-0 right-0 flex ">
                <IconButton style={iconButton.secondary} Icon={<MdModeEdit/>} onclick={() => handleEdit(props.index)}/>
                <IconButton style={iconButton.error} Icon={<MdDeleteForever/>}
                            onclick={() => handleDelete(props.index)}/>
            </div>
            <TextInputShow type={inputType.text} style={summary.title} name={'title'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.title}
                           value={getValues("title")}/>
            <TextInputShow type={inputType.textarea}
                           name={'content'} isEdit={isEdit} register={register} defaultValue={props.content}
                           value={getValues("content")}/>
        </motion.form>
    );
}

export default Summary;