import { useState } from "react";
import {
    DndContext,
    closestCorners,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const initialTasks = [
    { id: "1", title: "Setup project", status: "To Do", priority: "Medium" },
    { id: "2", title: "Implement authentication", status: "In Progress", priority: "High" },
    { id: "3", title: "Fix styling issues", status: "In Progress", priority: "Low" },
    { id: "4", title: "Deploy to production", status: "Done", priority: "High" },
];

const statuses = ["To Do", "In Progress", "Done"];
const priorities = ["Low", "Medium", "High"];

const TaskBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskPriority, setNewTaskPriority] = useState("Medium");

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === active.id ? { ...task, status: over.id } : task
            )
        );
    };

    const addTask = () => {
        if (!newTaskTitle.trim()) return;
        const newTask = {
            id: String(tasks.length + 1),
            title: newTaskTitle,
            status: "To Do",
            priority: newTaskPriority,
        };
        setTasks([...tasks, newTask]);
        setNewTaskTitle("");
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="p-6 bg-gray-800 min-h-screen">
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="New task title"
                        className="p-2 border rounded text-black"
                    />
                    <select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                        className="p-2 border rounded text-black"
                    >
                        {priorities.map((priority) => (
                            <option key={priority} value={priority}>{priority}</option>
                        ))}
                    </select>
                    <button onClick={addTask} className="p-2 bg-green-500 text-black rounded">
                        Add Task
                    </button>
                </div>
                <div className="flex justify-around">
                    {statuses.map((status) => (
                        <SortableContext key={status} items={tasks.filter(t => t.status === status)} strategy={verticalListSortingStrategy}>
                            <TaskColumn key={status} status={status} tasks={tasks.filter(task => task.status === status)} deleteTask={deleteTask} />
                        </SortableContext>
                    ))}
                </div>
            </div>
        </DndContext>
    );
};

const TaskColumn = ({ status, tasks, deleteTask }: { status: string; tasks: { id: string; title: string; status: string; priority: string }[], deleteTask: (id: string) => void }) => {
    const { setNodeRef } = useDroppable({ id: status });

    return (
        <div ref={setNodeRef} className="w-1/3 p-4 bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">{status}</h2>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
            ))}
        </div>
    );
};

const TaskCard = ({ task, deleteTask }: { task: { id: string; title: string; status: string; priority: string }, deleteTask: (id: string) => void }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });
    const style = { transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined };

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} style={style} className="p-4 mb-2 bg-blue-500 text-white rounded-md cursor-grab">
            <div className="flex justify-between">
                <div>
                    <strong>{task.title}</strong>
                    <p className="text-sm">Priority: {task.priority}</p>
                </div>
                <button onClick={() => deleteTask(task.id)} className="ml-2 text-red-500">✖</button>
            </div>
        </div>
    );
};

export default TaskBoard;
