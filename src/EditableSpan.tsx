import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string,
    onChange: (newValue: string) => void;
}

export function EditableSpan(props: EditableSpanPropsType) {

    const test = props.title.split(" ").map(elem => {
        if (elem.includes("#")) {
            return <span style={{color: "red"}}>{" " + elem}</span>
        }
        return <span>{" " + elem}</span>
    })
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    let activatedEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    let activatedViewMode = () => {
        setEditMode(false)
        props.onChange(title)

    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    return editMode
        ? <input onBlur={activatedViewMode} onChange={onChangeTitleHandler} value={title} autoFocus/>
        : <div onDoubleClick={activatedEditMode}> {test}</div>
}