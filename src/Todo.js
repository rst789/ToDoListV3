import React, { useState, useEffect } from 'react';
import './Todo.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Task({ task, index, completeTask, removeTask }) {

    const [timer0, setTimer0] = useState();

    useEffect(() => {
        document.body.addEventListener("click", event => {
            console.log(event.target.value)
            // toast("Reminder", { delay: event.target.toString() } )
        })
    }, [])

    const notify = () => toast('Reminder', { delay: timer0 });

    return (
        <div>
            {/*Maybe it's select?*/}
            <select id="Timer"
                    value={timer0}
                    onChange={(e) => setTimer0(e.target.value)}>
                <option value="1000">1 Seconds</option>
                <option value="5000">5 Seconds</option>
                <option value="10000">10 Seconds</option>
            </select>
            <h4>Selected Timer: {timer0}</h4>
        <div className="task" style={{ textDecoration: task.completed ? "line-through" : "" }}>
            {task.title}
            <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
            <button onClick={() => completeTask(index)}>Complete</button>
            <button onClick={notify} className={"B1"}>Notify!</button>
            <ToastContainer />
        </div>
        </div>
    );
}

function CreateTask({ addTask }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

function Todo() {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([
        {
            title: "Grab some Pizza",
            completed: true
        },
        {
            title: "Do your workout",
            completed: true
        },
        {
            title: "Hangout with friends",
            completed: false
        }
    ]);

    useEffect(() => { setTasksRemaining(tasks.filter(task => !task.completed).length) }, [tasks]);

    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };

    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };
    return (
        <div className="todo-container">

            <div className="header">Pending tasks ({tasksRemaining})</div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        key={index}
                    />
                ))}
            </div>
            <div className="create-task" >
                <CreateTask addTask={addTask} />
            </div>
        </div>
    );
}

export default Todo;