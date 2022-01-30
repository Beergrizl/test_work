import React, {ChangeEvent, useState} from 'react';
import s from './App.module.scss';
import {AddItemForm} from "./AddItemForm";
import {v1} from "uuid";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone?: boolean
    tag?: string
}


function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([]);
    const [tasks2, setTasks2] = useState<Array<TaskType>>([]);


    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false, tag: ''}
        title.split(' ').map(item => {
            if (item.includes('#')) {
                setTasks([...tasks, {id: v1(), title: title, isDone: false, tag: item}])
            } else {
                setTasks([...tasks, task])
            }
        })
    }

    function changeTaskStatus(id: string, newIsDoneValue: boolean) {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = newIsDoneValue
            setTasks([...tasks])
        }
    }

    const filterTaskHandler = () => {
        filterTask()
    }

    function filterTask() {
        let task = tasks.filter(t => t.isDone === true);
        if (task.length) {
            setTasks2(task);
        } else {
            setTasks2([]);
            setTasks([...tasks])
        }
    }

    function removeTask(id: string) {
        let newTask = tasks.filter(t => t.id !== id);
        setTasks([...newTask]);
    }

    function removeTag(id: string) {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.tag = ''
        }
        const noTagTask = tasks.map(el => {
            if (el.id === id) {
                return task
            }
            return el
        })
        setTasks(noTagTask as any)
    }

    function changeTaskTitle(id: string, newTitle: string) {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle
            newTitle.split(' ').map(item => {
                if (item.includes('#')) {
                    if (task) {
                        task.tag = item
                    }
                }
            })
        }
        setTasks([...tasks])
    }

    let tag = tasks.find(t => t.tag !== '')
    const task = tasks2.length ? tasks2 : tasks;

    return (
        <div className={s.body}>
            <h1> Enter your task</h1>
            <div>

                <AddItemForm addItem={addTask}/>
                <div>
                    <ul>
                        {task.map(t => {
                            // let testTitle = t.title.split(" ").map(elem=>{
                            //     if(elem.includes("#")){
                            //         return <span style={{color: "red"}}>{" "+ elem}</span>
                            //     }
                            //     return <span>{" "+ elem}</span>
                            // })

                            const removeTaskHandler = () => removeTask(t.id)
                            const removeTagHandler = () => removeTag(t.id)
                            const onChangeTitleHandler = (newTitle: string) => {
                                changeTaskTitle(t.id, newTitle);
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                changeTaskStatus(t.id, newIsDoneValue);
                            }

                            return <li key={t.id} className={s.li}>
                                {/*<div>{testTitle}</div>*/}
                                <div className={s.block}>

                                    <div className={s.taskBlock}>
                                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                        <button onClick={removeTaskHandler}>x</button>
                                    </div>
                                    <div className={s.tagBlock}>
                                        {t.tag &&
                                            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>}
                                        {t.tag}
                                        {t.tag && <button onClick={removeTagHandler}>x</button>}
                                    </div>
                                </div>
                            </li>
                        })
                        }
                    </ul>
                    {tag && <button onClick={filterTaskHandler} className={s.button}>filter by tag</button>}
                </div>
            </div>
        </div>
    )
}

export default App;
