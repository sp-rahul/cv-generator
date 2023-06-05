import React, {useContext} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {iconButton, summary} from "../../../@common/style/style";
import TextInputShow, {inputType} from "../../../@common/components/TextInputShow";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"
import {useForm} from "react-hook-form";
import {AiOutlineCheck} from "react-icons/ai";

interface IProject {
    index: number;
    title: string;
    heading: string;
    content: string;
    duration: string;
    description: string;
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
            content: props.content,
            heading: props.heading,
            duration: props.duration,
            description: props.description,
        });
    }, [])

    const handleConvert = () => {
        const desc: string = getValues("description");
        console.log('desc', desc)
        let array: string[] = []
        if (typeof desc === 'string') {
            array = desc.split(',');
            console.log(array);
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
                {handleConvert()}
            </TextInputShow>


        </motion.form>
    );
}

export default Project;