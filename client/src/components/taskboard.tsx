import  { useState } from "react";
import { DndContext, closestCorners, useDraggable, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const initialTasks = [
    { id: "1", title: "Setup project", status: "To Do" },
    { id: "2", title: "Implement authentication", status: "In Progress" },
    { id: "3", title: "Fix styling issues", status: "In Progress" },
    { id: "4", title: "Deploy to production", status: "Done" },
];

const statuses = ["To Do", "In Progress", "Done"];

const TaskBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === active.id ? { ...task, status: over.id } : task
            )
        );
    };

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="flex justify-around p-6 bg-gray-100 min-h-screen">
                {statuses.map((status) => (
                    <SortableContext key={status} items={tasks.filter(t => t.status === status)} strategy={verticalListSortingStrategy}>
                        <TaskColumn key={status} status={status} tasks={tasks.filter(task => task.status === status)} />
                    </SortableContext>
                ))}
            </div>
        </DndContext>
    );
};

const TaskColumn = ({ status, tasks }: { status: string; tasks: { id: string; title: string; status: string }[] }) => {
    const { setNodeRef } = useDroppable({ id: status });

    return (
        <div ref={setNodeRef} className="w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">{status}</h2>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

const TaskCard = ({ task }: { task: { id: string; title: string; status: string } }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} style={style} className="p-4 mb-2 bg-blue-500 text-white rounded-md cursor-grab">
            {task.title}
        </div>
    );
};

export default TaskBoard;
