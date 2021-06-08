import { useState, useEffect } from "react";
import { NotifsIcon, ProfileIcon, DoughnutChart } from "./SVGs.js";
import { motion, AnimatePresence } from "framer-motion";
import { AppleWatchDock } from "./AppleWatchDock";
import Benji from "./images/Benji.webp";
import Katherine from "./images/Katherine.webp";
import Daniel from "./images/Daniel.webp";
import User from "./images/User.webp";

const mockNotifications = [
  { username: "Benji", avatar: Benji, issueId: "1412", time: "2" },
  { username: "Daniel", avatar: Daniel, issueId: "1899", time: "8" },
  { username: "Katherine", avatar: Katherine, issueId: "4001", time: "12" },
];
const mockData = [
  { metric: "Goals Completed", achievment: 3, benchmark: 5 },
  { metric: "Issues Resolved", achievment: 15, benchmark: 16 },
  { metric: "Pull Requests Approved", achievment: 17, benchmark: 22 },
];
const mockEvents = [
  {
    mockEvent: "bug",
    repo: "draft-js",
    date: "10.21.2021",
    eventStatus: "open",
    link: "/",
  },
  {
    mockEvent: "hotfix",
    repo: "jest-fork",
    date: "06.02.2021",
    eventStatus: "open",
    link: "/",
  },
  {
    mockEvent: "legacyFix",
    repo: "litho-js",
    date: "04.06.2021",
    eventStatus: "open",
    link: "/",
  },
  {
    mockEvent: "suggestion",
    repo: "relay-modern",
    date: "29.05.2020",
    eventStatus: "open",
    link: "/",
  },
  {
    mockEvent: "hotfix",
    repo: "docuverse",
    date: "14.02.2020",
    eventStatus: "open",
    link: "/",
  },
  {
    mockEvent: "bug",
    repo: "wrangle",
    date: "01.02.2021",
    eventStatus: "open",
    link: "/",
  },
  {
    mockEvent: "suggestion",
    repo: "DS-driver",
    date: "12.02.2020",
    eventStatus: "open",
    link: "/",
  },
];

const colors = ["#F8DA30", "#7630F8", "#F7304D", "#7630F8", "#30F8DA"];

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
        <div
          class={`tray notifications-tray ${openTray("notifications-button")}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Latest Events</h2>
          {mockNotifications.map((el) => (
            <NotificationItem data={el} />
          ))}
          <button
            class="view-more disabled"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <b>View More</b>
          </button>
        </div>
      </button>
    </>
  );
};

function NotificationItem({ data }) {
  const { username, avatar, issueId, time } = data;

  return (
    <div
      class="notification-item disabled"
      onClick={(e) => e.stopPropagation()}
    >
      <div class="notification-item-icon">
        <img src={avatar} alt={username} />
      </div>
      <div class="notification-item-body grow">
        <div class="author">
          <p>
            <b>{username}</b>
          </p>
          <span class="spacer"></span>
          <p class="time">{time}h</p>
        </div>
        <div class="notification-event">
          <p>
            Commented on{" "}
            <span>
              <a href="#"> Issue #{issueId}</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export const Repos = () => {
  //replace with real data later
  const repos = () => {
    let i = 0;
    let arr = [];
    for (i; i <= 14; i++) {
      arr.push(`repo-${i}`);
    }
    return arr;
  };

  const [activeRepo, setActiveRepo] = useState();

  useEffect(() => activeRepo && console.log(activeRepo), [activeRepo]);

  return (
    <>
      <div class="repos">
        <div class="repos-container invisible-scrollbar">
          {repos().map((e, index) => (
            <Repo
              activeRepo={activeRepo}
              setActiveRepo={setActiveRepo}
              repoName={e}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Repo = ({ activeRepo, setActiveRepo, repoName, index }) => {
  const [id, setId] = useState("");

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
    function createId() {
      return new Promise((resolve, reject) => {
        const id = makeid(10);
        return resolve(id);
      });
    }
    createId().then((id) => {
      setId(id);
      index === 0 && setActiveRepo(id);
    });
  }, []);

  return (
    <div
      id={id}
      onClick={(e) => setActiveRepo(id)}
      class={`repo ${activeRepo === id && "active"}`}
    >
      <div onClick={(e) => setActiveRepo(id)} class="repo-body">
        <h2>
          {repoName} <div class="spacer" />
          <svg
            viewBox="0 0 16 16"
            version="1.1"
            height="16"
            width="16"
            onClick={(e) => e.stopPropagation()}
            class="copy-link-icon"
          >
            <path
              fill-rule="evenodd"
              d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
            ></path>
          </svg>
        </h2>
        <div class="repo-commit-info details">
          <svg
            onClick={(e) => e.stopPropagation()}
            viewBox="0 0 16 16"
            version="1.1"
            height="16"
            width="16"
            style={{ marginRight: ".3rem" }}
          >
            <path
              fill-rule="evenodd"
              d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"
            ></path>
          </svg>{" "}
          41 commits
        </div>
        <div class="languages">
          <span>
            <div class="language-icon" />
            <p class="details">C++</p>
          </span>
          <span>
            <svg
              aria-label="fork"
              role="img"
              viewBox="0 0 16 16"
              version="1.1"
              data-view-component="true"
              height="16"
              width="16"
              stroke="#a9a8a"
              fill="#a9a8ad"
            >
              <path
                fill-rule="evenodd"
                d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
              ></path>
            </svg>
            <p class="details">12</p>
          </span>
          <span>
            <p class="details">10.02.22</p>
          </span>
        </div>
        <p class="details">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </div>
    </div>
  );
};

export const DashboardOverview = () => {
  const [activeCommit, setActiveCommit] = useState("");
  return (
    <div class="dashboard-overview">
      <h2>Repo's Git History</h2>
      <GitTopology setActiveCommit={setActiveCommit} />
      <div class="commits grow invisible-scrollbar">
        <div class="commit-info">
          <h2>
            <span class="details">commit</span>
            <span class="hash">{activeCommit}</span>
            <div class="spacer" />
            <span style={{ marginRight: ".5rem" }}>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                data-view-component="true"
                height="16"
                width="16"
                class="copy-link-icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                ></path>
              </svg>
            </span>
            <span>
              <svg
                aria-label="Show options"
                role="img"
                viewBox="0 0 16 16"
                version="1.1"
                data-view-component="true"
                height="16"
                width="16"
                class="options-icon"
              >
                <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
            </span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="commit-overview"></div>
        <div class="commit-body">
          <pre>
            <code>
              <CommitBody />
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

const CommitBody = () => {
  const mockData = () => {
    let i = 0;
    let arr = [];
    for (i; i <= 20; i++) {
      arr.push(i);
    }
    return arr;
  };
  let i = 1000;

  const additions = mockData().map(() => {
    i++;
    if (i > 1008 && i < 1016)
      return (
        <p class="addition">
          <span>{i} +</span>
          {`Lorem Ipsum = () => {Dolor Si Amet}`}
        </p>
      );
    return (
      <p>
        <span>{i}</span> Lorem Ipsum
      </p>
    );
  });

  const removals = mockData().map(() => {
    i++;
    if (i > 1028 && i < 1034)
      return (
        <p class="removal">
          <span>{i} -</span>
          {`Lorem Ipsum = () => {Dolor Si Amet}`}
        </p>
      );
    return (
      <p>
        <span>{i}</span> Lorem Ipsum
      </p>
    );
  });

  return (
    <>
      <div class="additions">{additions}</div>
      <div class="removals">{removals}</div>
    </>
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

const GitTopology = ({ setActiveCommit }) => {
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
      <CommitNode setActiveCommit={setActiveCommit} data={commits[0]} />
      <svg>
        <defs>
          <linearGradient
            id={`linear-created-${branchIndex}`}
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
          stroke={`url(#linear-created-${branchIndex})`}
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
      <CommitNode setActiveCommit={setActiveCommit} data={commits[0]} />
    </div>,

    // 4 - "pull request"
    <div
      class={`branch  ${branchIndex > 1 && "reverse"}`}
      style={{ background: `${colors[branchIndex]}` }}
    >
      <svg>
        <defs>
          <linearGradient
            id={`linear-1${branchIndex}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stop-color={colors[branchIndex]} />
            <stop
              offset="100%"
              stop-color={
                branchIndex > 2
                  ? colors[branchIndex - 1]
                  : colors[branchIndex + 1]
              }
            />
          </linearGradient>
        </defs>
        <path
          d="M25 5  0 25"
          stroke-width="3"
          stroke={`url(#linear-1${branchIndex})`}
        />
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

  const [open, setOpen] = useState(false);
  const branches = ["master", "dev", "dev2", "experimental", "experimental1"];

  return (
    <div
      onClick={() => setOpen(false)}
      class="git-topology invisible-scrollbar"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prevState) => !prevState);
        }}
        class={`view-more `}
      >
        <span>
          <p>branch</p>
        </span>
        <div class="spacer"></div>
        <span>
          <div class="dropdown-indicator" data-isopen={open}>
            <div class="one" />
            <div class="two" />
          </div>
        </span>
        <div class={`tray ${open ? "open" : "closed"}`}>
          {branches.map((element, index) => (
            <div class="notification-item">
              <b>{element}</b>
              <div class="spacer" />
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                data-view-component="true"
                height="16"
                width="16"
                fill={colors[index]}
              >
                <path
                  fill-rule="evenodd"
                  d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"
                ></path>
              </svg>
            </div>
          ))}
        </div>
      </div>
      <div class="box">{rows}</div>
    </div>
  );
};

const CommitNode = ({ data, setActiveCommit }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const id = makeid(10);

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
      onClick={() => setActiveCommit(id)}
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
          stroke={0}
          dashOffset={30}
          handleClick={handleClick}
          el={1}
          state={activeGoal}
        />
        <GoalsDigestGoalRow
          stroke={1}
          dashOffset={70}
          handleClick={handleClick}
          el={2}
          state={activeGoal}
        />
        <GoalsDigestGoalRow
          stroke={2}
          dashOffset={50}
          handleClick={handleClick}
          el={3}
          state={activeGoal}
        />
        <GoalsDigestGoalRow
          stroke={3}
          dashOffset={81}
          handleClick={handleClick}
          el={4}
          state={activeGoal}
        />
        <GoalsDigestGoalRow
          stroke={4}
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
        <h2>Lorem </h2>
        <p class="details">started 10.02.21</p>
      </div>
      <div class="spacer" />
      <div>
        <DoughnutChart stroke={colors[stroke]} dashOffset={dashOffset} />
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
          <div class="filler"></div> <div class="filler" />
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

export const UserOverview = () => {
  const iconsTable = {
    bug: (
      <div class="overview-icon new-bug">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="-5 0 100 100"
          fill="#242731"
        >
          <path
            d="M80.563,75.847c1.741-2.637,2.77-5.788,2.77-9.18C83.333,57.461,75.872,50,66.667,50c-0.18,0-0.346,0.046-0.524,0.052
	c-0.13-0.904-0.234-1.822-0.413-2.695l10.94-4.531l-2.552-6.158l-10.222,4.238c-2.236-5.938-5.7-10.775-9.896-13.867l6.002-14.486
	L53.845,10L48.04,24.011c-1.517-0.443-3.092-0.678-4.703-0.678s-3.188,0.234-4.704,0.678L32.829,10l-6.159,2.552l6.003,14.486
	c-4.199,3.092-7.66,7.93-9.896,13.867l-10.225-4.238L10,42.825l10.944,4.531c-0.391,1.928-0.681,3.92-0.824,5.977H10.003V60H20.12
	c0.144,2.058,0.434,4.05,0.824,5.977l-10.941,4.531l2.549,6.159l10.225-4.238C26.712,82.884,34.44,90,43.337,90
	c6.019,0,11.49-3.288,15.628-8.64c2.314,1.218,4.909,1.973,7.702,1.973c3.395,0,6.546-1.028,9.183-2.773L85.286,90L90,85.286
	L80.563,75.847z M43.337,30c4.346,0,8.353,2.845,11.357,7.383c-7.168,3.418-15.547,3.418-22.715,0C34.98,32.839,38.991,30,43.337,30
	z M53.841,77.188c-2.891,3.821-6.563,6.146-10.504,6.146c-9.033,0-16.667-12.213-16.667-26.666c0-4.838,0.869-9.408,2.347-13.373
	c9.037,4.369,19.597,4.375,28.643,0.007c0.947,2.539,1.608,5.345,1.986,8.301C53.962,54.251,50,59.98,50,66.667
	C50,70.677,51.478,74.31,53.841,77.188z M66.667,76.667c-5.524,0-10-4.479-10-10c0-5.527,4.476-10,10-10c5.523,0,10,4.473,10,10
	C76.667,72.188,72.19,76.667,66.667,76.667z"
          />
        </svg>
      </div>
    ),
    help: (
      <div class="overview-icon new-help-wanted">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 100 100"
          fill="#242731"
        >
          <path
            d="M76.667,9.999H23.333c-3.667,0-6.667,3-6.667,6.667v30c0,3.667,3,6.667,6.667,6.667h20L50,59.999l6.667-6.667h20
	c3.665,0,6.666-3,6.666-6.667v-30C83.333,12.999,80.332,9.999,76.667,9.999z M76.667,46.666H53.906L50,50.57l-3.906-3.905h-22.76
	v-30h53.333V46.666z"
          />
          <polygon points="50.107,39.999 44.889,39.999 49.89,23.332 55.11,23.332 " />
          <path
            d="M36.952,23.332l-5.98,5.977c-1.295,1.296-1.295,3.418,0,4.714l5.98,5.977l3.535-3.535l-4.798-4.798l4.798-4.798
	L36.952,23.332z"
          />
          <path
            d="M63.054,39.999l5.977-5.977c1.295-1.296,1.295-3.418,0-4.714l-5.977-5.977l-3.535,3.535l4.798,4.798l-4.798,4.798
	L63.054,39.999z"
          />
          <path
            d="M56.667,73.332c0,3.682-2.985,6.667-6.667,6.667c-3.678,0-6.667-2.985-6.667-6.667s2.988-6.666,6.667-6.666
	C53.682,66.666,56.667,69.65,56.667,73.332z"
          />
          <path d="M63.333,89.999c0-3.682-2.984-6.667-6.666-6.667l-13.333,0.004c-3.682,0-6.667,2.984-6.667,6.666L63.333,89.999z" />
          <path
            d="M83.333,73.332c0,3.682-2.984,6.667-6.666,6.667c-3.679,0-6.667-2.985-6.667-6.667s2.988-6.666,6.667-6.666
	C80.349,66.666,83.333,69.65,83.333,73.332z"
          />
          <path d="M90,89.999c0-3.682-2.985-6.667-6.667-6.667L70,83.336v6.666L90,89.999z" />
          <path
            d="M16.667,73.332c0,3.682,2.985,6.667,6.667,6.667c3.678,0,6.667-2.985,6.667-6.667s-2.988-6.666-6.667-6.666
	C19.652,66.666,16.667,69.65,16.667,73.332z"
          />
          <path d="M10,89.999c0-3.682,2.985-6.667,6.667-6.667L30,83.336v6.666L10,89.999z" />
        </svg>
      </div>
    ),
    legacyFix: (
      <div class="overview-icon new-legacy-fix">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 100 100"
          fill="#242731"
        >
          <polygon points="66.667,36.667 61.953,41.38 70.573,50 61.95,58.62 66.663,63.333 80,50 " />
          <polygon points="33.333,63.333 38.047,58.62 29.427,50 38.05,41.38 33.337,36.667 20,50 " />
          <rect
            x="19.835"
            y="46.667"
            transform="matrix(-0.2588 0.9659 -0.9659 -0.2588 111.2357 14.6421)"
            width="60.33"
            height="6.666"
          />
        </svg>
      </div>
    ),
    documentation: (
      <div class="overview-icon new-documentation">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 100 100"
          fill="#242731"
        >
          <path
            d="M83.333,13.333H16.667C13.001,13.333,10,16.331,10,20v60c0,3.665,3.001,6.667,6.667,6.667h66.666
	C86.999,86.667,90,83.665,90,80V20C90,16.331,86.999,13.333,83.333,13.333z M83.333,80H16.667V20h66.666V80z"
          />
          <rect x="23.333" y="26.667" width="6.667" height="6.666" />
          <rect x="36.667" y="26.667" width="20" height="6.666" />
          <rect x="23.333" y="40" width="6.667" height="6.667" />
          <rect x="36.667" y="40" width="40" height="6.667" />
          <rect x="23.333" y="53.333" width="6.667" height="6.667" />
          <rect x="36.667" y="53.333" width="26.666" height="6.667" />
          <rect x="23.333" y="66.667" width="6.667" height="6.666" />
          <rect x="36.667" y="66.667" width="33.333" height="6.666" />
        </svg>
      </div>
    ),
    suggestion: (
      <div class="overview-icon new-suggestion">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 100 100"
          fill="#242731"
        >
          <polygon points="62.57,36.667 57.421,36.667 64.088,10.001 69.244,10.001 " />
          <path
            d="M78.053,10.001l10.976,10.977c1.296,1.295,1.296,3.417,0,4.713L78.053,36.667l-3.535-3.535l9.798-9.798l-9.798-9.798
	L78.053,10.001z"
          />
          <path
            d="M48.609,36.667L37.633,25.691c-1.296-1.296-1.296-3.418,0-4.713l10.976-10.977l3.535,3.535l-9.798,9.798l9.798,9.798
	L48.609,36.667z"
          />
          <path
            d="M76.666,63.332H49.999c0-7.363-5.97-13.332-13.333-13.332h-20v-6.667H10v46.664h6.667v-4.297l13.531,3.379
	c3.558,0.893,9.437,1.186,13.063,0.658l42.62-6.914c0.817-0.339,1.55-0.827,2.165-1.445c1.207-1.205,1.953-2.871,1.953-4.714
	C89.999,69.302,84.028,63.332,76.666,63.332z M42.304,83.143c-2.77,0.41-7.77,0.15-10.491-0.527l-15.146-3.789v-22.16h20
	c3.675,0,6.667,2.994,6.667,6.666H30v6.667h46.666c3.612,0,6.549,2.896,6.646,6.49L42.304,83.143z"
          />
        </svg>
      </div>
    ),
    hotfix: (
      <div class="overview-icon new-hotfix">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 100 100"
          fill="#242731"
        >
          <path d="M90,40H70V10L36.667,60h20v30L90,40z M49.121,53.333l14.212-21.315v14.649h14.209L63.333,67.981V53.333H49.121z" />
          <rect x="10" y="53.333" width="20" height="6.667" />
          <rect x="16.667" y="40" width="23.333" height="6.667" />
          <rect x="30" y="26.667" width="16.667" height="6.667" />
          <rect x="16.667" y="66.667" width="33.333" height="6.666" />
        </svg>
      </div>
    ),
  };
  return (
    <div class="user-overview">
      <div>
        <div class="user-info">
          <img src={User} alt="user-icon"></img>
          <img
            class="emoji"
            alt="space_invader"
            height="20"
            width="20"
            src="https://github.githubassets.com/images/icons/emoji/unicode/1f47e.png"
          />
        </div>
        <div class="user-credentials">
          <p class="details" style={{ textAlign: "center" }}>
            welocome back,
          </p>
          <h1 style={{ textAlign: "center" }}>caroline</h1>
        </div>
      </div>
      <div class="achievments-grid">
        <div class="achievments-chart">
          <svg width="180" height="180">
            <defs>
              <linearGradient id="linear-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color={colors[0]} />
                <stop offset="100%" stop-color={colors[1]} />
              </linearGradient>
            </defs>
            <circle
              cx="90"
              cy="90"
              r="75"
              stroke="#E4E4E4"
              stroke-opacity="0.1"
              stroke-width="15"
              fill="transparent"
            />
            <circle
              id="path"
              cx="90"
              cy="90"
              r="75"
              stroke="url(#linear-1)"
              stroke-linecap="round"
              stroke-width="15"
              stroke-dasharray={`300, 471.24`}
              fill="transparent"
              transform="rotate(-90 90,90)"
            />
          </svg>
          <div class="chart-start" style={{ top: "12.5px" }} />

          <svg width="140" height="140" class="chart-2">
            <defs>
              <linearGradient id="linear-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color={colors[2]} />
                <stop offset="100%" stop-color={colors[3]} />
              </linearGradient>
            </defs>
            <circle
              cx="70"
              cy="70"
              r="55"
              stroke="#E4E4E4"
              stroke-opacity="0.1"
              stroke-width="15"
              fill="transparent"
            />
            <circle
              id="path"
              cx="70"
              cy="70"
              r="55"
              stroke="url(#linear-2)"
              stroke-linecap="round"
              stroke-width="15"
              stroke-dasharray={`300, 345.58`}
              fill="transparent"
              transform="rotate(-90 70,70)"
            />
          </svg>

          <div class="chart-start" style={{ top: "33px" }} />
          <svg width="100" height="100" class="chart-3">
            <defs>
              <linearGradient id="linear-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color={colors[4]} />
                <stop offset="100%" stop-color={colors[0]} />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="35"
              stroke="#E4E4E4"
              stroke-opacity="0.1"
              stroke-width="15"
              fill="transparent"
            />
            <circle
              id="path"
              cx="50"
              cy="50"
              r="35"
              stroke="url(#linear-3)"
              stroke-linecap="round"
              stroke-width="15"
              stroke-dasharray={`150, 219.91`}
              fill="transparent"
              transform="rotate(-90 50,50)"
            />
          </svg>

          <div class="chart-start" style={{ top: "53px" }} />
        </div>

        <div class="achievment">
          <h1
            style={{
              backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
            }}
          >{`${mockData[0].achievment}/${mockData[0].benchmark}`}</h1>
          <h2>Goals Completed</h2>
        </div>
        <div class="achievment">
          <h1
            style={{
              backgroundImage: `linear-gradient(to right, ${colors[2]}, ${colors[3]})`,
            }}
          >{`${mockData[1].achievment}/${mockData[1].benchmark}`}</h1>
          <h2>Issues Closed</h2>
        </div>

        <div class="achievment">
          <h1
            style={{
              backgroundImage: `linear-gradient(to right, ${colors[4]}, ${colors[0]})`,
            }}
          >{`${mockData[2].achievment}/${mockData[2].benchmark}`}</h1>
          <h2 style={{ textAlign: "center" }}>Pull Requests Approved</h2>
        </div>
      </div>
      <AppleWatchDock />
    </div>
  );
};
