import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import './Todo.css';
import 'react-toastify/dist/ReactToastify.css';

function Task({ task, index, completeTask, removeTask }) {
    useEffect(() => {
        document.body.addEventListener("click", event => {
            console.log("Clicked value:",event.target.value)
        })
    }, []);

    return (
        <div>
        <div className="task" style={{ textDecoration: task.completed ? "line-through" : "" }}>
            {task.title}
            <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
            <button onClick={() => completeTask(index)}>Complete</button>
            <ToastContainer />
        </div>
        </div>
    );
}

function TimerCountDown() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [timer0, setTimer0] = useState();

    const x = document.getElementById("Timer");
    let xVal = "";
    if(x) {
        xVal = x.value;
    }
    console.log("xVal in TCD:",xVal);

    return (
        <div>
            <select
                id="Timer"
                value={timer0}
                onChange={(e) => setTimer0(e.target.value)}>
                <option value="1000" id="timer1">1 Seconds</option>
                <option value="5000" id="timer5">5 Seconds</option>
                <option value="10000" id="timer10">10 Seconds</option>
            </select>
            <div value="0" id="TimerUpdated"></div>
            <button onClick={notiNew(xVal)} className={"B1"}>Notify!</button>
        </div>
    );
}

function notiNew(Number) {
    // console.log(parseInt(Number.toString()));
    return () => toast('Reminder', {delay: parseInt(Number.toString())});
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
                <TimerCountDown/>
            </div>
            <div className="create-task" >
                <CreateTask addTask={addTask} />
            </div>
        </div>
    );
}

export default Todo;