import { useState, useEffect } from "react";
import { NotifsIcon, DoughnutChart } from "./SVGs.js";
import { motion, AnimatePresence } from "framer-motion";
import { AppleWatchDock } from "./AppleWatchDock";
import Benji from "./images/Benji.webp";
import Katherine from "./images/Katherine.webp";
import Daniel from "./images/Daniel.webp";
import User from "./images/User.webp";



const mockCommit = [
<><pre>{"const CommitNode = ({ data }) => {"}</pre>
<pre>{"  const [hovered, setHovered] = useState(false);"}</pre>

<pre><code class="addition">{" + const [active, setActive] = useState(false);"}</code></pre>


<pre><code class="addition">{" + const id = makeid(6);"}</code></pre>


<pre>{"function makeid(length) {"}</pre>
  
<pre>{"    var result = [];"}</pre>

<pre>{"@@ -344,12 +346,29 @@ const CommitNode = ({ data }) => {"}</pre>

<pre>{"    }"}</pre>

    <pre>{"    return result.join(``);"}</pre>

    <pre>{"  }"}</pre>

  <pre>{""}</pre>

<pre><code class="addition">{" + useEffect(() => {"}</code></pre>


  <pre><code class="addition">{" +   // select a current node"}</code></pre>

    <pre>{"    const node = document.getElementById(id);"}</pre>

    <pre><code class="addition">{" +   // handle click on that node"}</code></pre>

    <pre><code class="addition">{" +   node.addEventListener(`click`, () => {"}</code></pre>

    <pre><code class="addition">{" +     //create a list of active nodes"}</code></pre>

      <pre><code class="addition">{" +     // convert HTML collection into a mappable array"}</code></pre>

      <pre><code class="addition">{" +     const activeNodesArray = Array.from(activeNodes);"}</code></pre>

      <pre><code class="addition">{" +     // remove active class from the old nodes"}</code></pre>

      <pre><code class="addition">{" +     activeNodesArray !== [] &&"}</code></pre>

      <pre><code class="addition">{" +       activeNodesArray.map((el) => el.classList.remove(`active`));"}</code></pre>

        <pre><code class="addition">{" +     // add active class to the current node"}</code></pre>

      <pre><code class="addition">{" +     !node.classList.contains(`active`) && node.classList.add(`active`);"}</code></pre>

      <pre><code class="addition">{" +   });"}</code></pre>

    <pre><code class="addition">{" + }, []);"}</code></pre>

  <pre>{"  return ("}</pre>

  <pre>{"    <div"}</pre>

    <pre>{"      onMouseOver={() => setHovered(true)}"}</pre>

      <pre>{"      onMouseLeave={() => setHovered(false)}"}</pre>

      <pre><code class="removal">{" -     class=`commit-node`"}</code></pre>

      <pre><code class="removal">{" -     id={makeid(6)}"}</code></pre>

      <pre><code class="addition">{" +     class={`commit-node `}"}</code></pre>

      <pre><code class="addition">{" +     id={id}"}</code></pre>

      <pre>{""}</pre>
    <pre>{">"}</pre></>
]
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
const randomNumber = (number) => Math.floor(Math.random() * number);
const mockGoalsData = [
  {
    goal: "Lorem Ipsum",
    remaining: randomNumber(12),
    completion: 30,
    started: "08.08.21",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    tasks: [
      { title: "Lorem Ipsum", start: 1, finish: 3 },
      { title: "Dolor Sit Amet", start: 2, finish: 5 },
      { title: "Consectur adipiscing", start: 4, finish: 6 },
      { title: "Elit Sed Do", start: 3, finish: 5 },
      { title: "Eisumod tempor", start: 2, finish: 2 },
      { title: "Incididunt ut labore", start: 3, finish: 7 },
    ],
  },

  {
    goal: "Dolor Sit",
    remaining: randomNumber(12),
    completion: 70,
    started: "29.10.21",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    tasks: [
      { title: "Lorem Ipsum", start: 5, finish: 7 },
      { title: "Dolor Sit Amet", start: 3, finish: 3 },
      { title: "Consectur adipiscing", start: 1, finish: 3 },
      { title: "Elit Sed Do", start: 3, finish: 6 },
      { title: "Eisumod tempor", start: 1, finish: 7 },
      { title: "Incididunt ut labore", start: 1, finish: 6 },
    ],
  },
  {
    goal: "Amet Consectur",
    remaining: randomNumber(12),
    completion: 50,
    started: "11.01.21",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tasks: [
      { title: "Lorem Ipsum", start: 2, finish: 4 },
      { title: "Dolor Sit Amet", start: 3, finish: 3 },
      { title: "Consectur adipiscing", start: 1, finish: 6 },
      { title: "Elit Sed Do", start: 4, finish: 7 },
      { title: "Eisumod tempor", start: 2, finish: 2 },
      { title: "Incididunt ut labore", start: 1, finish: 5 },
    ],
  },
  {
    goal: "Adipiscing Elit",
    remaining: randomNumber(12),
    completion: 81,
    started: "03.04.21",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tasks: [
      { title: "Lorem Ipsum", start: 1, finish: 3 },
      { title: "Dolor Sit Amet", start: 2, finish: 5 },
      { title: "Consectur adipiscing", start: 4, finish: 6 },
      { title: "Elit Sed Do", start: 3, finish: 5 },
      { title: "Eisumod tempor", start: 2, finish: 2 },
      { title: "Incididunt ut labore", start: 3, finish: 7 },
    ],
  },
  {
    goal: "Sed Do Eisumod",
    remaining: randomNumber(12),
    completion: 90,
    started: "12.02.21",
    description:
      "eque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    tasks: [
      { title: "Lorem Ipsum", start: 4, finish: 6 },
      { title: "Dolor Sit Amet", start: 3, finish: 5 },
      { title: "Consectur adipiscing", start: 1, finish: 7 },
      { title: "Elit Sed Do", start: 2, finish: 4 },
      { title: "Eisumod tempor", start: 1, finish: 3 },
      { title: "Incididunt ut labore", start: 2, finish: 5 },
    ],
  },
];
const colors = [
  "#F8DA30",
  "#7630F8",
  "#F7304D",
  "#7630F8",
  "#30F8DA",
    "#E6BA5C",
  "#3091F8",

];

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
              <a href="/"> Issue #{issueId}</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export const Repos = ({selectedRepo, setSelectedRepo}) => {
  //replace with real data later
  const repos = () => {
    let i = 0;
    let arr = [];
    for (i; i <= 14; i++) {
      arr.push(`repo-${i}`);
    }
    return arr;
  };


  return (
    <>
      <div class="repos">
        <div class="repos-container invisible-scrollbar">
          {repos().map((e, index) => (
            <Repo
selectedRepo={selectedRepo}
setSelectedRepo={setSelectedRepo}
              repoName={e}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Repo = ({ selectedRepo, setSelectedRepo, repoName, index }) => {

  return (
    <div

      onClick={(e) => setSelectedRepo(index)}
      class={`repo ${selectedRepo === index && "active"}`}
    >
      <div onClick={(e) => setSelectedRepo(index)} class="repo-body">
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
            <p class="details">Haskell</p>
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

export const DashboardOverview = ({selectedRepo}) => {
  const [activeCommit, setActiveCommit] = useState("");
  return (
    <div class="dashboard-overview">
      <h2>Repo's Git History</h2>
      <GitTopology setActiveCommit={setActiveCommit} selectedRepo={selectedRepo} />
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
 {mockCommit[0]}
        </div>
      </div>
    </div>
  );
};

const gitData = [
[
  [0, 0, 3, 0, 0],
  [0, 0, 1, 0, 0],
  [3, 0, 1, 0, 0],
  [1, 3, 1, 0, 3],
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
],
[
  [0, 0, 0, 3, 0, 0, 0],
  [0, 0, 3, 1, 0, 3, 0],
  [0, 0, 1, 1, 3, 4, 0],
  [0, 0, 3, 3, 1, 1, 0],
  [0, 3, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 3, 1, 1, 1, 3],
  [3, 1, 1, 3, 4, 3, 4],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 4, 3, 1, 3, 4, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [4, 3, 1, 3, 4, 1, 3],
  [1, 1, 3, 1, 1, 1, 1],
  [3, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 3, 4, 3, 3, 3, 4],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [3, 3, 1, 1, 1, 3, 4],
  [1, 4, 3, 1, 1, 1, 1],
  [1, 1, 1, 1, 3, 4, 1],
  [4, 3, 1, 1, 1, 1, 1],
  [1, 1, 4, 3, 1, 3, 3],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 3, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 3, 4, 2],
  [1, 1, 1, 3, 1, 1, 0],
  [1, 3, 3, 1, 3, 2, 0],
  [2, 1, 1, 1, 1, 0, 0],
  [0, 1, 3, 1, 1, 0, 0],
  [0, 1, 1, 3, 1, 0, 0],
  [0, 2, 3, 1, 2, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 3, 0, 0, 0],
  [0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
]
];

const GitTopology = ({ setActiveCommit, selectedRepo }) => {
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
  
  const makeReverse = (val) => {
  if (val > gitData[0][0].length / 2) return "reverse" }

  const gitMapElementsTable = (branchIndex, vertIndex) => [
    // 0 - "nothing"
    <div class="branch" />,

    // 1 - "normal"
    <div style={{ background: `${colors[branchIndex]}` }} class={`branch `} />,

    // 2 - "branch created"
    <div
      style={{ background: `${colors[branchIndex]}` }}
      class={`branch  birth ${makeReverse(branchIndex)}`}
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
                branchIndex > gitData[0][0].length / 2
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
      class={`branch ${makeReverse(branchIndex)}`}
    >
      <CommitNode setActiveCommit={setActiveCommit} data={commits[0]} />
    </div>,

    // 4 - "pull request"
    <div
      class={`branch  ${makeReverse(branchIndex)}`}
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
                branchIndex > gitData[0][0].length / 2
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

  const rows =   gitData[selectedRepo%2].map((row, index) => (
    <div class="lines-container">
      {columns(row)}
      <div class="ruler" />
    </div>
  ));

  function buildTree(val, branchIndex, vertIndex) {
    return gitMapElementsTable(branchIndex, vertIndex)[val];
  }

  const [open, setOpen] = useState(false);

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
          {gitData[selectedRepo%2][0].map((element, index) => (
            <div class="notification-item">
              <b>branch-{index}</b>
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
  const [activeGoal, setActiveGoal] = useState(mockGoalsData[0].goal);

  function handleClick(title) {
    setActiveGoal(title);
  }

  const activeGoalData = () => {
    let data = [];
    mockGoalsData.map((e) => {
      if (e.goal === activeGoal) return (data = e);
    });
    return data;
  };
  const { remaining, description } = activeGoalData();
  return (
    <div class="goals-digest-container">
      <div class="goals-block">
        <h2>Your Goals</h2>{" "}
        {mockGoalsData.map((e, i) => (
          <GoalsDigestGoalRow
            stroke={i}
            dashOffset={e.completion}
            data={e}
            handleClick={handleClick}
            state={activeGoal}
          />
        ))}
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
              <h1>~{remaining} days</h1>
              <div class="is-on-track on-track">
                <p>
                  <b>on track</b>
                </p>
              </div>
            </div>

            <div class="spacer"></div>
            <div class="body-text">
              <p>{description}</p>
            </div>
          </div>

          <GoalOverviewGanttChart activeGoalData={activeGoalData} />
        </div>
      </div>
    </div>
  );
};

const GoalsDigestGoalRow = ({
  state,
  data,
  stroke,
  dashOffset,
  handleClick,
}) => {
  function checkActiveGoal(el, state) {
    if (state === data.goal) return "active";
  }
  return (
    <div
      class={`goal-row ${checkActiveGoal(data.goal, state)}`}
      onClick={() => handleClick(data.goal)}
    >
      <div></div>
      <div>
        <h2>{data.goal} </h2>
        <p class="details">started {data.started}</p>
      </div>
      <div class="spacer" />
      <div>
        <DoughnutChart stroke={colors[stroke]} dashOffset={dashOffset} />
        <p>{dashOffset}%</p>
      </div>
    </div>
  );
};

const GoalOverviewGanttChart = ({ activeGoal, activeGoalData }) => {
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
            {activeGoalData().tasks.map((e, i) => (
              <div
                style={{
                  gridRow: `${i + 1}`,
                  gridColumn: `${e.start}/${e.finish}`,
                }}
              >
                <div
                  class="grow"
                  style={{
                    background: `${colors[i]}`,
                  }}
                >
                  <p>{e.title}</p>
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
