import React, {useContext} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {iconButton} from "../../../@common/style/style";
import TextInputShow, {inputType} from "../../../@common/components/TextInputShow";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"
import {useForm} from "react-hook-form";
import {AiOutlineCheck} from "react-icons/ai";

interface IEducation {
    index: number
    result: string
    institution: string
    passing_year: string
}

type FormValues = {
    result: string
    institution: string
    passing_year: string
};

function Education(props: IEducation) {
    const {
        register, reset,
        setValue, getValues,
        handleSubmit
    } = useForm<FormValues>();
    const [isEdit, setIsEdit] = React.useState(false)
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
        setIsEdit(prev => !prev)

    }

    React.useEffect(() => {
        reset({
            result: props.result,
            institution: props.institution,
            passing_year: props.passing_year,
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
            <TextInputShow type={inputType.text} name={'result'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.result}
                           value={getValues("result")}/>

            <TextInputShow type={inputType.text} name={'passing_year'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.passing_year}
                           value={getValues("passing_year")}/>
            <TextInputShow type={inputType.textarea}
                           name={'institution'} isEdit={isEdit} register={register} defaultValue={props.institution}
                           value={getValues("institution")}/>
        </motion.form>
    );
}

export default Education;