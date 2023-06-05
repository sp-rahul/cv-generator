import React, {useContext} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {heading, iconButton} from "../../../@common/style/style";
import TextInputShow, {inputType} from "../../../@common/components/TextInputShow";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"
import {useForm} from "react-hook-form";
import {AiOutlineCheck} from "react-icons/ai";

interface IHeading {
    index: number
    title: string
}

type FormValues = {
    title: string;
};

function Heading(props: IHeading) {
    const {
        register, reset,
        setValue, getValues,
        handleSubmit
    } = useForm<FormValues>();

    const [isEdit, setISdit] = React.useState(false)
    const {setData} = useContext(DBContext);
    const onSubmit = (data: any) => {
        setData((pre: any) => {
            pre[props.index] = {...pre[props.index], ...data};
            return [...pre]
        })
    };

    function handleDelete(index: number) {
        setData((pre: any) => {
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
        });
    }, [])

    return (
        <motion.form
            exit={{scale: [0.5, 0]}} animate={{
            scale: [0.5, 1],
            borderRadius: ["20%", "0%"],
        }} className='border w-full text-left py-4  px-2 relative'>
            <div className="absolute top-0 right-0 flex ">
                {!isEdit && <IconButton style={iconButton.secondary} Icon={<MdModeEdit/>}
                                        onclick={() => handleEdit(props.index)}/>}
                {isEdit && <IconButton style={iconButton.primary} Icon={<AiOutlineCheck/>}
                                       onclick={() => handleEdit(props.index)}/>}
                <IconButton style={iconButton.error} Icon={<MdDeleteForever/>}
                            onclick={() => handleDelete(props.index)}/>
            </div>
            <TextInputShow type={inputType.text} style={heading.title} name={'title'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.title}
                           value={getValues("title")}/>

        </motion.form>
    );
}

export default Heading;