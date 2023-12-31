import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "../components/TaskItem";
import Spinner from "../components/Spinner";
import { getTasks, reset } from "../features/tasks/taskSlice";

function Completed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );
  const setOfTasks = tasks.slice(0, 20);
  const newTasks = setOfTasks.filter((item) => item.completed === true);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getTasks());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="px-4 py-4">
      <section className="heading">
        <h1 className="text-4xl font-semibold mb-8">Your Completed Task(s)</h1>
      </section>

      <section className="mx-auto w-fit px-10">
        {newTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <h3>You don't have any complete task at the moment.</h3>
        )}
      </section>
    </div>
  );
}

export default Completed;
