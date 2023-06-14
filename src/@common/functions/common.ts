export function handleDelete(id: string, setData: any) {
    setData((prev: any) => {
        const new_db = prev.filter((item: any) => item.id !== id)
        return [...new_db]
    })

}

export const onSubmit = (data: any, id: any, setData: any) => {
    setData((pre: any) => {
        const new_db = pre.map((el: any) => {
            if (el.id === id) {
                return {...el, ...data}
            }
            return el
        })
        return [...new_db]
    })
};

export function handleEdit(id: any, data: any, setData: any, handleSubmit: any, isEdit: any, setIsEdit: any) {


    if (isEdit) {
        handleSubmit((data: any) => onSubmit({...data, is_new: false}, id, setData))()
    }
    setIsEdit((prev: boolean) => !prev)

}

export function SetItem(data: any) {
    localStorage.setItem('data', JSON.stringify(data));

}