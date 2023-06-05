import React, {useContext} from 'react';
import IconButton from "../../../@common/components/IconButton";
import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {iconButton} from "../../../@common/style/style";
import TextInputShow, {inputType} from "../../../@common/components/TextInputShow";
import {DBContext} from "../../../@common/context/DBContext";
import {motion} from "framer-motion"
import {useForm} from "react-hook-form";
import {AiOutlineCheck} from "react-icons/ai";

interface IBasic_info {
    index: number
    email: string,
    phone: string,
    github: string,
    linkedin: string,
    address: string,
}

type FormValues = {
    email: string,
    phone: string,
    github: string,
    linkedin: string,
    address: string,
};

function Basic_info(props: IBasic_info) {
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
            email: props.email,
            phone: props.phone,
            github: props.github,
            linkedin: props.linkedin,
            address: props.address,


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
            <TextInputShow type={inputType.text} name={'email'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.email}
                           value={getValues("email")}/>

            <TextInputShow type={inputType.text} name={'phone'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.phone}
                           value={getValues("phone")}/>
            <TextInputShow type={inputType.text} name={'linkedin'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.linkedin}
                           value={getValues("linkedin")}/>
            <TextInputShow type={inputType.text} name={'github'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.github}
                           value={getValues("github")}/>
            <TextInputShow type={inputType.text} name={'address'} isEdit={isEdit}
                           register={register}
                           defaultValue={props.address}
                           value={getValues("address")}/>


        </motion.form>
    );
}

export default Basic_info;