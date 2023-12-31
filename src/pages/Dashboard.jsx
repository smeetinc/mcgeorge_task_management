import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "../components/TaskItem";
import Spinner from "../components/Spinner";
import { getTasks, reset } from "../features/tasks/taskSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );
  const newTasks = tasks.slice(0, 20);

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
        <h1 className="text-4xl font-semibold mb-8">Welcome Back John</h1>
      </section>

      <section className="mx-auto w-fit px-10">
        {newTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <>
            <h3>
              You have not set any Task, click the button below to start adding
              tasks now.
            </h3>
            <div className="my-2 w-1/2 lg:w-1/4">
              <a href="/add">
                <button
                  className="uppercase text-sm font-bold tracking-wide bg-sky-950 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline cursor-pointer"
                >
                  Add New Task
                </button>
              </a>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
