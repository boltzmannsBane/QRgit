import { useState, useEffect } from "react";
import { NotifsIcon, ProfileIcon, DoughnutChart } from "./SVGs.js";
import { motion, AnimatePresence } from "framer-motion";

export const UserMenuButtons = () => {
  const [state, setState] = useState(false);
  const [NIS, setNIS] = useState(true);

  // checks state for the current active button (notifications/profile) and returns an "open"/"closed" class based on the result
  // aslo works for the buttons (highlighting them onclick)
  const openTray = (element) => {
    if (state === element) return "open";
    else return "closed";
  };

  // selects the currently active dashboard menu button
  //function accepts event and the element who's tray you want to open (notifications/profile)
  //if the element is "notifications" it removes the notificatin indicator
  const handleClick = (e, element) => {
    e.stopPropagation();
    state !== element && setState(element);
    state === element && setState(null);
    element === "notifications-button" && setNIS(false);
  };

  function handleTraySwipeDown() {
    setState(false);
  }

  // set active button (notifications/profile) state to FALSE if a click occurs outside the buttons ot their child elements, thus closing whichever one is currently active
  useEffect(() => {
    const body = document.querySelector("body");
    body.addEventListener("click", function () {
      setState(false);
    });
    // on mobile, moves & appends the notification/profile tray to the top of the
    // content-container class element
    function handleTray() {
      const contentContainer = document.querySelector(".content-container");
      //the tray class is currently hardcoded, replace with dynamic IDs later
      const tray = document.querySelector(`.notifications-tray`);
      const isMobile = window.innerWidth <= 768;
      tray && isMobile && contentContainer.append(tray);
    }
    handleTray();
  }, []);

  return (
    <>
      <button
        class={`user-info-button ${openTray("notifications-button")}`}
        id="notifications-button"
        onClick={(e) => handleClick(e, "notifications-button")}
      >
        <NotifsIcon />
        <div class={`notification-indicator ${!NIS && "hidden"}`} />
        <motion.div
          layout
          drag={window.innerWidth <= 820 && "y"}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.9}
          onDragEnd={(event, info) => {
            info.offset.y > 300 && handleTraySwipeDown();
          }}
          class={`tray notifications-tray ${openTray("notifications-button")}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Latest Events</h2>
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <button
            class="view-more disabled"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <b>View More</b>
          </button>
        </motion.div>
      </button>

      <button
        class={`user-info-button  disabled ${
          state === "profile-button" && "selected"
        }`}
        id="profile-button"
      >
        <ProfileIcon />
        {/* <div class="tray profile-tray"></div> */}
      </button>
    </>
  );
};

function NotificationItem() {
  return (
    <div
      class="notification-item disabled"
      onClick={(e) => e.stopPropagation()}
    >
      <div class="notification-item-icon"></div>
      <div class="notification-item-body">
        <div class="author">
          <p>
            <b>Frank Sinatra</b>
          </p>
          <span class="spacer"></span>
          <p class="time">19h</p>
        </div>
        <div class="notification-event">
          <p>
            Commented on{" "}
            <span>
              <a href="#"> Issue #69420</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export const DashboardOverview = () => {
  return (
    <div class="dashboard-overview">
      <GitTopology />
      <div class="commits">commits</div>
    </div>
  );
};

const gitData = [
  [0, 0, 3, 0, 0],
  [0, 0, 1, 0, 0],
  [3, 0, 1, 0, 3],
  [1, 3, 1, 0, 1],
  [1, 1, 1, 0, 1],
  [3, 4, 3, 3, 1],
  [1, 1, 1, 1, 3],
  [1, 3, 1, 1, 1],
  [3, 1, 1, 1, 1],
  [1, 4, 3, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 4, 3, 3, 3],
  [3, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [4, 3, 1, 3, 4],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [4, 3, 3, 4, 3],
  [3, 1, 1, 1, 1],
  [1, 3, 1, 3, 1],
  [1, 1, 1, 1, 3],
  [1, 3, 1, 1, 1],
  [3, 1, 1, 1, 1],
  [1, 1, 1, 3, 3],
  [1, 4, 3, 1, 1],
  [1, 1, 1, 3, 4],
  [1, 1, 1, 1, 1],
  [1, 3, 3, 4, 2],
  [2, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 2, 0],
  [0, 1, 1, 0, 0],
  [0, 2, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
];

const GitTopology = () => {
  //eh

  const commits = [
    {
      hash: "35e32b6a00dec02ae7d7c45c6b7106779a124685",
      date: "10.12.2021",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  useEffect(() => {
    const gitMap = document.querySelector(".git-topology");
    const cursor = document.querySelector(".cursor");

    gitMap.addEventListener(
      "mousemove",
      () =>
        !cursor.classList.contains("active") && cursor.classList.add("active")
    );
    gitMap.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");

      cursor.classList.remove("pressed");
    });
    gitMap.addEventListener("mousedown", () => cursor.classList.add("pressed"));
    gitMap.addEventListener("mouseup", () =>
      cursor.classList.remove("pressed")
    );

    gitMap.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mousemove", (e) => {
      cursor.setAttribute(
        "style",
        "top:  " + (e.clientY - 10) + "px; left: " + (e.clientX - 10) + "px; "
      );
    });

    let pos = { top: 0, left: 0, x: 0, y: 0 };
    let isDown = false;

    function mouseDownHandler(e) {
      pos = {
        // The current scroll
        top: gitMap.scrollTop,
        // Get the current mouse position
        y: e.clientY,
      };

      isDown = true;
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    }

    function mouseMoveHandler(e) {
      if (!isDown) return;
      const dy = e.clientY - pos.y;

      // Scroll the element
      gitMap.scrollTop = pos.top - dy;
    }

    function mouseUpHandler() {
      isDown = false;
    }
  }, []);

  const colors = ["#F8DA30", "#7630F8", "#F7304D", "#7630F8", "#30F8DA"];
  const gitMapElementsTable = (branchIndex, vertIndex) => [
    // 0 - "nothing"
    <div class="branch" />,

    // 1 - "normal"
    <div style={{ background: `${colors[branchIndex]}` }} class={`branch `} />,

    // 2 - "branch created"
    <div
      style={{ background: `${colors[branchIndex]}` }}
      class={`branch  birth ${branchIndex > 1 && "reverse"}`}
    >
      <CommitNode data={commits[0]} />
      <svg>
        <defs>
          <linearGradient
            id={`linear-${branchIndex}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stop-color={
                branchIndex > 2
                  ? colors[branchIndex - 1]
                  : colors[branchIndex + 1]
              }
            />
            <stop offset="100%" stop-color={colors[branchIndex]} />
          </linearGradient>
        </defs>
        <path
          stroke={`url(#linear-${branchIndex})`}
          d="M25 5  -5 25"
          stroke-width="3"
        />
      </svg>
    </div>,

    // 3 - "a commit node"
    <div
      style={{ background: `${colors[branchIndex]}` }}
      class={`branch ${branchIndex > 1 && "reverse"}`}
    >
      <CommitNode data={commits[0]} />
    </div>,

    // 4 - "pull request"
    <div
      class={`branch  ${branchIndex > 1 && "reverse"}`}
      style={{ background: `${colors[branchIndex]}` }}
    >
      <svg>
        <path d="M25 5  0 25" stroke-width="3" stroke={colors[branchIndex]} />
      </svg>
    </div>,
  ];

  const columns = (arr, vertIndex) =>
    arr.map((branch, branchIndex) => buildTree(branch, branchIndex, vertIndex));

  const rows = gitData.map((row, index) => (
    <div class="lines-container">
      {columns(row)}
      <div class="ruler" />
    </div>
  ));

  function buildTree(val, branchIndex, vertIndex) {
    return gitMapElementsTable(branchIndex, vertIndex)[val];
  }

  return (
    <div class="git-topology">
      <div class="view-more">
        <span>
          <p>branch</p>
        </span>
        <div class="spacer"></div>
        <span>
          <p>v</p>
        </span>
      </div>
      <div class="box">{rows}</div>
    </div>
  );
};

const CommitNode = ({ data }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const id = makeid(6);

  function makeid(length) {
    var result = [];
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  }

  useEffect(() => {
    // select a current node
    const node = document.getElementById(id);
    // handle click on that node
    node.addEventListener("click", () => {
      //create a list of active nodes
      const activeNodes = document.getElementsByClassName("commit-node active");
      // convert HTML collection into a mappable array
      const activeNodesArray = Array.from(activeNodes);
      // remove active class from the old nodes
      activeNodesArray !== [] &&
        activeNodesArray.map((el) => el.classList.remove("active"));
      // add active class to the current node
      !node.classList.contains("active") && node.classList.add("active");
    });
  }, []);
  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      class={`commit-node `}
      id={id}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            class={`commit-description `}
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            <div>
              <p>{data.date}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DashboardGoalsDigest = () => {
  const [activeGoal, setActiveGoal] = useState();

  function handleClick(el) {
    setActiveGoal(el);
  }

  useEffect(() => setActiveGoal(1), []);

  return (
    <div class="goals-digest-container">
      <div class="goals-block">
        <h2>Your Goals</h2>{" "}
        <GoalsDigestGoalRow
          stroke={"#ba5ce6"}
          dashOffset={30}
          handleClick={handleClick}
          el={1}
          state={activeGoal}
        />
        <GoalsDigestGoalRow
          stroke={"#5cb5e6"}
          dashOffset={70}
          handleClick={handleClick}
          el={2}
          state={activeGoal}
        />
        <GoalsDigestGoalRow
          stroke={"#e6ba5c"}
          dashOffset={50}
          handleClick={handleClick}
          el={3}
          state={activeGoal}
        />
        <GoalsDigestGoalRow
          stroke={"#5cb5e6"}
          dashOffset={81}
          handleClick={handleClick}
          el={4}
          state={activeGoal}
        />
        <GoalsDigestGoalRow
          stroke={"#ba5ce6"}
          dashOffset={90}
          handleClick={handleClick}
          el={5}
          state={activeGoal}
        />
        <button class="view-more disabled">
          <b>View More</b>
        </button>
      </div>

      <div class="tasks-block grow">
        <h2>Goal Overview</h2>
        <div class="grow">
          <div class="goal-description">
            <div class="two">
              <h2>due est. </h2>
              <h1>~12 days</h1>
              <div class="is-on-track on-track">
                <p>
                  <b>on track</b>
                </p>
              </div>
            </div>

            <div class="spacer" />
            <div class="body-text">
              <p>
                From time to time, I'll open up a document in vim and find that
                my manual folds are completely messed up. It's like vim decides
                to ignore its usual markers and, instead, start interpreting
                random bits of text as being fold points.
              </p>
            </div>
          </div>

          <GoalOverviewGanttChart />
        </div>
      </div>
    </div>
  );
};

const GoalsDigestGoalRow = ({ state, stroke, dashOffset, handleClick, el }) => {
  function checkActiveGoal(el, state) {
    if (state === el) return "active";
  }

  return (
    <div
      class={`goal-row ${checkActiveGoal(el, state)}`}
      onClick={() => handleClick(el)}
    >
      <div></div>
      <div>
        <h2>Get rich </h2>
        <p class="details">started 10.02.21</p>
      </div>
      <div class="spacer" />
      <div>
        <DoughnutChart stroke={stroke} dashOffset={dashOffset} />
        <p>{dashOffset}%</p>
      </div>
    </div>
  );
};

const GoalOverviewGanttChart = () => {
  const months = ["Sept", "Oct", "Nov", "Dec", "Jan", "Feb"];

  useEffect(() => {
    const chart = document.querySelector(".goal-gantt-chart-container");
    const gantt = document.querySelector(".charts-overimposed");
    const cursor = document.querySelector(".cursor");

    // custom cursor controls for the gantt chart scroll UX
    gantt.addEventListener(
      "mousemove",
      () =>
        !cursor.classList.contains("active") && cursor.classList.add("active")
    );
    gantt.addEventListener("mouseleave", () =>
      cursor.classList.remove("active")
    );
    gantt.addEventListener("mousedown", () => cursor.classList.add("pressed"));
    gantt.addEventListener("mouseup", () => cursor.classList.remove("pressed"));

    chart.addEventListener("mousedown", mouseDownHandler);

    // hor scroll functionality for the chart's responsiveness
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    let isDown = false;

    function mouseDownHandler(e) {
      pos = {
        // The current scroll
        left: chart.scrollLeft,
        top: chart.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      isDown = true;
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    }

    function mouseMoveHandler(e) {
      if (!isDown) return;
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      chart.scrollTop = pos.top - dy;
      chart.scrollLeft = pos.left - dx;
    }

    function mouseUpHandler() {
      isDown = false;
      chart.style.cursor = "grab";
      chart.style.removeProperty("user-select");
    }
  }, []);

  return (
    <>
      <div class="goal-gantt-chart-container grow">
        <div class="labels-row">
          {months.map((el, i) => (
            <div class={i === 3 && "active"}>
              <p>{el}</p>
            </div>
          ))}
        </div>
        <motion.div class="chart-body grow">
          <div class="filler" /> <div class="filler" />
          <div class="filler" /> <div class="filler" />
          <div class="filler" /> <div class="filler" />
          <div class="charts-overimposed">
            {months.map((e, i) => (
              <div
                style={{ gridRow: `${i + 1}`, gridColumn: `${i + 1}/${i + 1}` }}
              >
                <div class="grow">
                  <p>lsget sm pussy tnit aaaaa</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};
