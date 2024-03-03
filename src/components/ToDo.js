import React, { useEffect, useState } from "react";

export default function Todo() {
  const [taskTittle, setTaskTittle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [formFillTask, setFormFillTask] = useState(false);
  const [formFillDescription, setFormFillDescription] = useState(false);
  const [totalTask, setTotalTask] = useState(0);
  const [totalCompletedTask, setCompletedTask] = useState(0);
  const [taskRemaining, setTaskRemaining] = useState(0);
  const [taskSkipped, setTaskSkipped] = useState(0);
  const [showCompleted, setShowCompleted] = useState(false);
  const [addAlert, setAddAlert] = useState(false);
  const [doneAlert, setDoneAlert] = useState(false);
  const [skipAlert, setskipAlert] = useState(false);
  const [completedTaskList, setCompletedTaskList] = useState([]); // FOR COMPLETED TASK
  /* timeout function to calculate remaining tasks */
  setTimeout(() => {
    const remain = totalTask - (totalCompletedTask - 1) - (taskSkipped + 1);
    setTaskRemaining(remain);
  }, 50);

  /* preventing right click */
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  /* UPDATING TASK */
  const handleTaskList = () => {
    /* checking where all requird things are filled or not */
    if (taskTittle !== "" && taskDescription !== "") {
      setAddAlert(true);
      setTimeout(() => {
        setAddAlert(false);
      }, 800);
      setFormFillTask(true);
      setFormFillDescription(true);
      const d = new Date();
      let now = new Date();
      let dd = now.getDate();
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let mm = month[now.getMonth()];
      let yyyy = now.getFullYear();
      let hr = now.getHours();
      let min = now.getMinutes();
      let sec = now.getSeconds();
      const merd = hr >= 12 ? "pm" : "am";
      let taskCreatedDate = dd + "-" + mm + "-" + yyyy;
      let taskCreatedTime = hr + ":" + min + ":" + sec + " " + merd;
      /* updating the todoList Array */
      let newTodoTask = {
        task: taskTittle,
        description: taskDescription,
        created: { date: taskCreatedDate, time: taskCreatedTime },
      };
      let updatedTaskTodoListCopy = [...taskList];
      updatedTaskTodoListCopy.push(newTodoTask); // pushing the task to update
      setTaskList(updatedTaskTodoListCopy); // updating the todo Array
      /* Storing task List in local storage in browser */
      localStorage.setItem(
        "ToDoArray",
        JSON.stringify(updatedTaskTodoListCopy)
      );
      const task = totalTask + 1;
      setTotalTask(task);
      localStorage.setItem("total", JSON.stringify(totalTask));
      console.log(taskList);
    } else {
      if (taskTittle === "") {
        setFormFillTask(false);
      }
      if (taskDescription === "") {
        setFormFillDescription(false);
      }
    }
  };

  /*   deleting task */
  const handleDeleteToDo = (index) => {
    let createCopyTodoListDelete = [...taskList];
    createCopyTodoListDelete.splice(index, 1); // Remove 1 element at the specified index
    localStorage.setItem("ToDoArray", JSON.stringify(createCopyTodoListDelete));
    console.log(createCopyTodoListDelete);
    setTaskList(createCopyTodoListDelete);
    const taskSkip = taskSkipped + 1;
    setTaskSkipped(taskSkip);
    localStorage.setItem("skipped", JSON.stringify(taskSkipped));
  };

  /* completing Task */
  const handleCompletedTask = (index) => {
    let createCompletedtaskCopy = [...taskList];
    let now = new Date();
    let dd = now.getDate();
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let mm = month[now.getMonth()];
    let yyyy = now.getFullYear();
    let hr = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    const merd = hr >= 12 ? "pm" : "am";
    let taskCompleteDate = dd + "-" + mm + "-" + yyyy;
    let taskCompleteTime = hr + ":" + min + ":" + sec + " " + merd;
    let c = createCompletedtaskCopy.at(index); // accessing completed task
    /* storing the completed task in a variable to store it */
    let completedTaskStore = {
      completedTask: c,
      completedDate: taskCompleteDate,
      completedTime: taskCompleteTime,
    };
    let completedArrayStore = [...completedTaskList]; // storing the completed task
    completedArrayStore.push(completedTaskStore); /// pushing the completed task in storage
    console.log(completedArrayStore);
    createCompletedtaskCopy.splice(index, 1);
    setCompletedTaskList(completedArrayStore);
    localStorage.setItem("ToDoArray", JSON.stringify(createCompletedtaskCopy)); // storing modified task data
    /* storing completed task locally */
    localStorage.setItem(
      "ToDoArrayCompleted",
      JSON.stringify(completedTaskList)
    );
    /*  */
    // storing usestate
    setTaskList(createCompletedtaskCopy); /* changing the main task list */
    /* setting completed task */
    const complete = totalCompletedTask + 1;
    setCompletedTask(complete);
    localStorage.setItem("completed", JSON.stringify(totalCompletedTask));
    //
  };

  /* Resting the task data */
  const handleReset = () => {
    const taskListi = [];
    setTaskList(taskListi);
    const compTask = [];
    setCompletedTaskList(compTask);
    const totalTask = 0;
    setTotalTask(totalTask);
    const skipped = 0;
    setTaskSkipped(skipped);
    const completed = 0;
    setCompletedTask(completed);
    /* updating in local storage */
    localStorage.setItem("ToDoArray", JSON.stringify([]));
    localStorage.setItem("ToDoArrayCompleted", JSON.stringify([]));
    localStorage.setItem("skipped", JSON.stringify(0));
    localStorage.setItem("completed", JSON.stringify(0));

    localStorage.setItem("total", JSON.stringify(totalTask));
  };

  /* local session storage accessing */
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("ToDoArray"));
    let savedCompletedTodo = JSON.parse(
      localStorage.getItem("ToDoArrayCompleted")
    );
    let savedTotalTask = JSON.parse(localStorage.getItem("total"));
    let saveSkipped = JSON.parse(localStorage.getItem("skipped"));
    let completed = JSON.parse(localStorage.getItem("completed"));
    if (savedTodo) {
      setTaskList(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTaskList(savedCompletedTodo);
    }
    if (savedTotalTask) {
      setTotalTask(savedTotalTask + 1);
    }
    if (saveSkipped) {
      setTaskSkipped(saveSkipped + 1);
    }
    if (completed) {
      setCompletedTask(completed + 1);
    }
  }, []);

  return (
    <>
      <div className="todo-container  flex justify-center flex-wrap select-none ">
        {/* To- do Heading */}
        <div className="flex flex-col text-center  w-full mb-19  ">
          <h1 className="text-3xl text-10xl  title-font  text-indigo-400 text-pretty font-bold">
            To-Do App
          </h1>
        </div>
        {/* To- do Heading end*/}
        <div className="todo-body   pt-0 pr-2 pl-3 lg:w-1/2 md:w-full justify-center flex md:flex-row flex-wrap   ">
          <div className="form-section container ">
            <div className="alert-c h-5 mt-2">
              {addAlert && (
                <div role="alert" className="badge badge-inf0 gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    You are moving ahead!!!!{" "}
                    <span className="text-grey-500"> Task Added</span>
                  </span>
                </div>
              )}
              {doneAlert && (
                <div role="alert" className="badge badge-success gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Hurray You have completed your task !!!</span>
                </div>
              )}
              {skipAlert && (
                <div role="alert" className="badge badge-warning gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>Warning: You have skipped your task </span>
                </div>
              )}
            </div>
            <div className="formarea">
              <br />
              <div className="inform flex flex-wrap flex-row">
                <div className="task-status mb-3  space-x-1 ">
                  <div className="btn  cursor-default  hover:text-red-500">
                    Total
                    <div className="badge badge-secondary ">{totalTask}</div>
                  </div>
                  <div className="btn  cursor-default hover:text-red-500">
                    Completed
                    <div className="badge badge-secondary">
                      {totalCompletedTask}
                    </div>
                  </div>
                  <div className="btn cursor-default hover:text-red-500">
                    Remaining
                    <div className="badge badge-secondary">{taskRemaining}</div>
                  </div>
                  <div className="btn cursor-default hover:text-red-500">
                    Skipped
                    <div className="badge badge-secondary">{taskSkipped}</div>
                  </div>
                </div>
              </div>

              {/* To do input section */}
              <div className="todo-form-section">
                <div className="todo-input ">
                  <div className="mb-3">
                    <label
                      htmlFor="Task"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Task<strong className="text-red-900"> *</strong>{" "}
                      <strong
                        className={`${
                          formFillTask ? "hidden" : "visible text-red-500"
                        }`}
                      >
                        Please fill this
                      </strong>
                    </label>
                    <input
                      type="Task"
                      id="Task"
                      value={taskTittle}
                      onFocus={() => {
                        setFormFillTask(true);
                      }}
                      onChange={(e) => {
                        setTaskTittle(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Please specify a tittle for your task"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Task Description Task
                      <strong className="text-red-900"> *</strong>
                      <strong
                        className={`${
                          formFillDescription
                            ? "hidden"
                            : "visible text-red-500"
                        }`}
                      >
                        Please fill this
                      </strong>
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      value={taskDescription}
                      onFocus={() => {
                        setFormFillDescription(true);
                      }}
                      onChange={(e) => {
                        setTaskDescription(e.target.value);
                      }}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write what you'll be doing in this task"
                    ></textarea>
                  </div>
                  <div className=" add-btn mb-2">
                    <button
                      type="submit"
                      onClick={() => {
                        handleTaskList();
                      }}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
              {/* To do input section end */}
            </div>
          </div>

          {/* start of Showing the tasks section */}
          <div className="taskShowing container">
            <div className="todo-list-item pr-5 pl-5 ">
              <div className="todo-list-item-body">
                <div className="check-task flex flex-row justify-center">
                  <div className=" add-btn mb-5 text-nowrap">
                    <button
                      type="submit"
                      onClick={() => {
                        setShowCompleted(false);
                      }}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-1.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      To-Do
                    </button>
                  </div>
                  <div className=" add-btn mb-5 pl-2">
                    <button
                      type="submit"
                      onClick={() => {
                        setShowCompleted(true);
                      }}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-1.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Done
                    </button>
                  </div>
                  <div className=" dropdown">
                    <div className=" add-btn mb-5  pl-2 text-nowrap ">
                      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-1.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Reset
                      </button>
                    </div>
                    <div
                      tabIndex={0}
                      className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-primary text-primary-content"
                    >
                      <div className="card-body">
                        <h3 className="card-title">Reset Data </h3>
                        <p>Data once Deleted cannot be reverted</p>
                        <button
                          onClick={() => {
                            handleReset();
                          }}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-1.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="all-todo  md:h-96 h-96   overflow-y-auto overflow-x-auto  md:overflow-auto">
                  {!showCompleted
                    ? taskList.map((item, index) => {
                        return (
                          <div className="taskl " key={index}>
                          
                            <div className="alert flex  overflow-x-auto ">
                              <div className="number-task text-2xl text-red-500">
                                <strong>{index + 1}</strong>.
                              </div>
                              <div className="task-content flex  flex-col">
                                <div className="title-task px-2 text-3xl text-red-500">
                                  <h1>
                                    <strong>{item.task}</strong>
                                  </h1>
                                </div>
                                <div className="description-task text-wrap px-2 ">
                                  {item.description}
                                </div>
                                <div className="description-task text-wrap overflow-auto px-2 ">
                                  <p className="text-grey-300">
                                    <span className="text-red-400">
                                      <small>
                                        created on:- {item.created.date} at{" "}
                                        <span></span>
                                        {item.created.time}
                                      </small>
                                    </span>
                                  </p>
                                </div>
                              </div>
                              {/* button delete */}
                              <div className="flex flex-row">
                                <button
                                  className="btn hover: "
                                  onClick={(index) => {
                                    handleDeleteToDo(index);
                                    setskipAlert(true);
                                    setTimeout(() => {
                                      setskipAlert(false);
                                    }, 800);

                                    console.log("Task Deleted Succesfully");
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    className="w-8 h-8"
                                    viewBox="0,0,256,256"
                                    style={{ fill: "#000000" }}
                                  >
                                    <g
                                      fill-opacity="0.30196"
                                      fill="#8c6c6c"
                                      fill-rule="nonzero"
                                      stroke="none"
                                      stroke-width="1"
                                      stroke-linecap="butt"
                                      stroke-linejoin="miter"
                                      stroke-miterlimit="10"
                                      stroke-dasharray=""
                                      stroke-dashoffset="0"
                                      font-family="none"
                                      font-weight="none"
                                      font-size="none"
                                      text-anchor="none"
                                    >
                                      <g transform="scale(8.53333,8.53333)">
                                        <path d="M14.98438,2.48633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v0.5h-5.5c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-1.48633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-1.48633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805h-5.5v-0.5c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM6,9l1.79297,15.23438c0.118,1.007 0.97037,1.76563 1.98438,1.76563h10.44531c1.014,0 1.86538,-0.75862 1.98438,-1.76562l1.79297,-15.23437z"></path>
                                      </g>
                                    </g>
                                  </svg>
                                </button>
                                <button
                                  className="btn "
                                  onClick={(index) => {
                                    handleCompletedTask(index);
                                    setDoneAlert(true);
                                    setTimeout(() => {
                                      setDoneAlert(false);
                                    }, 800);
                                    console.log("Task Compleetd");
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    className="w-8 h-8"
                                    viewBox="0,0,256,256"
                                    style={{ fill: "#000000" }}
                                  >
                                    <g
                                      fill-opacity="0.30196"
                                      fill="#c7baba"
                                      fill-rule="nonzero"
                                      stroke="none"
                                      stroke-width="1"
                                      stroke-linecap="butt"
                                      stroke-linejoin="miter"
                                      stroke-miterlimit="10"
                                      stroke-dasharray=""
                                      stroke-dashoffset="0"
                                      font-family="none"
                                      font-weight="none"
                                      font-size="none"
                                      text-anchor="none"
                                    >
                                      <g transform="scale(5.12,5.12)">
                                        <path d="M42.875,8.625c-0.03125,0.00781 -0.0625,0.01953 -0.09375,0.03125c-0.26172,0.06641 -0.48828,0.23438 -0.625,0.46875l-20.4375,31.6875l-14.0625,-12.6875c-0.24609,-0.3125 -0.65625,-0.44922 -1.04297,-0.34766c-0.38672,0.10156 -0.67187,0.42578 -0.73047,0.82031c-0.05859,0.39453 0.12109,0.78516 0.46094,0.99609l14.90625,13.5c0.21875,0.19141 0.51172,0.27734 0.80078,0.23438c0.28906,-0.04297 0.54297,-0.20703 0.69922,-0.45312l21.09375,-32.6875c0.23047,-0.32812 0.24219,-0.76172 0.03125,-1.10156c-0.21094,-0.33984 -0.60547,-0.51953 -1,-0.46094z"></path>
                                      </g>
                                    </g>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          
                          </div>
                        );
                      })
                    : completedTaskList.map((item, index) => {
                        return (
                          <div className="taskl " key={index}>
                            
                              <div className="alert">
                                <div className="number-task text-2xl text-red-500">
                                  <strong>{index + 1}</strong>.
                                </div>
                                <div className="task-content flex flex-col">
                                  <div className="title-task px-2 text-3xl text-red-500">
                                    <h1>
                                      <strong>{item.completedTask.task}</strong>
                                    </h1>
                                  </div>
                                  <div className="description-task text-wrap px-2 ">
                                    {item.completedTask.description}
                                  </div>
                                  <div className="timing flex md:flex-row space-x-1 flex-col">
                                    <div className="description-task text-wrap px-2 ">
                                      <p className="text-grey-300">
                                        <span className="text-red-400">
                                          <small>
                                            created on:-
                                            {
                                              item.completedTask.created.date
                                            } at{" "}
                                            {item.completedTask.created.time}
                                          </small>
                                        </span>
                                      </p>
                                    </div>
                                    <div className="description-task text-wrap px-2 ">
                                      <p className="text-grey-300">
                                        <span className="text-red-400">
                                          <small>
                                            completed on:- {item.completedDate}{" "}
                                            at
                                            <span></span>
                                            {item.completedTime}
                                          </small>
                                        </span>
                                        <br />
                                        <span className="text-red-800">
                                          <small> </small>
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>

          {/* end of Showing the tasks section*/}
        </div>
      </div>
    </>
  );
}
