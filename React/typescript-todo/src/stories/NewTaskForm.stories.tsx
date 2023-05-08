import NewTaskForm from "../components/NewTaskForm";
import TaskProvider from "../contexts/TaskProvider";

export default {
    title: "Component/NewTaskForm",
    component: NewTaskForm,
};

export const Default = () => {
    return (
        <TaskProvider>
            <NewTaskForm />
        </TaskProvider>
    );
};
