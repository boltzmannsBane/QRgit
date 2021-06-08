import "./App.css";
import { useState, useEffect } from "react";
import ExitButton from "./components/ExitButton";
import NavLoadingIndicator from "./components/NavLoadingIndicator";
import ExternalLinkIcon from "./components/ExternalLinkIcon";
import { Issue, PinnedIssue } from "./components/Issue";
import {
  UserMenuButtons,
  DashboardOverview,
  DashboardGoalsDigest,
  Repos,
  UserOverview,
} from "./components/DashboardComponents";

import { motion, AnimatePresence } from "framer-motion";

const viewsArray = ["Dashboard", "Issues", "Releases"];
const views = [<Dashboard />, <IssuesScreen />];

function App() {
  const [activeView, setActiveView] = useState(viewsArray[0]);
  const [displayView, setDisplayView] = useState("Dashboard");
  const [loading, setLoading] = useState(false);

  useEffect(() => console.log(loading), [loading]);

  useEffect(() => {
    let completed;
    function handleLoading() {
      completed = window.setTimeout(() => {
        setLoading(false);
        setDisplayView(activeView);
      }, 1500);
    }
    handleLoading();
    return () => {
      clearTimeout(completed);
    };
  }, [activeView]);

  const handleViewChange = () => views[viewsArray.indexOf(displayView)];

  return (
    <div class="container">
      <Menu
        activeView={activeView}
        setActiveView={setActiveView}
        loading={loading}
        setLoading={setLoading}
      />
      <div class="content-container">
        <div class="git-icon-container">
          <div class="git-icon" />
        </div>
        <AnimatePresence exitBeforeEnter>{handleViewChange()}</AnimatePresence>
        <Popup />
        <div class="cursor" />
      </div>
    </div>
  );
}

export default App;

function Menu({ activeView, setActiveView, loading, setLoading }) {
  const [pending, setPending] = useState(false);

  const showLoader = (ani) => {
    if (loading && activeView === ani) return <NavLoadingIndicator />;
  };

  return (
    <div class="menu">
      <div>
        <h1>qGit Client</h1>
        <input type="text" placeholder="Search" />
        <nav>
          {viewsArray.map((el, index) => (
            <div
              // reminder that component state doesn't persist on route change.
              // either exclude the menu from the router or find some other way around.
              // maybe context.
              class="nav-item"
              data-isclicked={activeView === el}
              onClick={() => {
                setActiveView(el);
                setLoading("pending");
              }}
            >
              <div class="nav-icon"></div>
              <p
              // href="/"
              >
                {el}
              </p>
              <div class="spacer" />
              {showLoader(el)}
            </div>
          ))}
        </nav>
        <div class="divider" />
        <a class="secondary" href="/">
          <span class="git-icon"></span>
          <span class="git-link">view on GitHub</span>
          <ExternalLinkIcon />
        </a>
      </div>{" "}
      <div class="spacer" />
      <a href="/" class="secondary feedback">
        <div>
          leave feedback
          <ExternalLinkIcon />
        </div>
      </a>
    </div>
  );
}

function IssuesScreen() {
  const [detailsScreenState, setDetailsScreenState] = useState(false);
  return (
    <>
      <Filter />
      <IssuesContent setDetailsScreenState={setDetailsScreenState} />
      <IssueDiscussion
        detailsScreenState={detailsScreenState}
        setDetailsScreenState={setDetailsScreenState}
      />
    </>
  );
}

function Filter() {
  useEffect(() => {
    var marker = document.querySelector("#marker");
    var items = document.querySelectorAll("div.filter > p");
    function indicator(e) {
      marker.style.left = e.offsetLeft + "px";
      marker.style.width = e.offsetWidth + "px";
    }

    indicator(items[0]);

    items.forEach((item) =>
      item.addEventListener("click", (e) => {
        indicator(e.target);
      })
    );
  }, []);
  return (
    <>
      <div class="filter-container">
        <div class="filter">
          <div id="marker" />

          <p>newest</p>
          <p>oldest</p>
          <p>most active</p>
        </div>
      </div>
    </>
  );
}

function IssuesContent({ setDetailsScreenState }) {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div class="content">
      <PinnedIssues />
      <div class="issues-content">
        {issues.map(() => (
          <Issue sdss={setDetailsScreenState} />
        ))}
      </div>
      <div class="load-more-btn-container">
        <div class="load-more-btn">
          <p>Load more</p>
        </div>
      </div>
    </div>
  );
}
function IssuesLoadingScreen() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <>
      {" "}
      {arr.map(() => (
        <div class="issue loading">
          <div class="issue-box"></div>
          <div class="issue-details"></div>
        </div>
      ))}
    </>
  );
}

function PinnedIssues() {
  return (
    <div class="pinned-container">
      <PinnedIssue />
      <PinnedIssue />
    </div>
  );
}

function IssueDiscussion({ detailsScreenState, setDetailsScreenState }) {
  return (
    <div class="discussion" data-isopen={detailsScreenState}>
      <nav>
        <span onClick={() => setDetailsScreenState(false)}>go back</span>
        <span>share</span>
      </nav>{" "}
      <div class="discussion-container">
        <h1>
          Missing script: relay-compiler <span class="issue-id">#69420</span>
        </h1>
        <p>
          <b>alejomonp</b> opened this issue 4 days ago · 1 comment
        </p>
        <p>
          <span>View on GitHub</span>
          <span>-</span>
          <span>Copy Link</span>
        </p>
        <div class="divider" />
        <div class="comment">
          <div class="comment-details">
            <div class="avatar-container"></div>
            <p>
              <b>alejomonp</b> commented 5 days ago
            </p>
            <div class="spacer" />
            <div class="icon-placeholder" />
          </div>
          <div class="comment-body">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div class="comment">
          <div class="comment-details">
            <div class="avatar-container"></div>
            <p>
              <b>alejomonp</b> commented 5 days ago
            </p>
          </div>
          <div class="comment-body">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div class="comment">
          <div class="comment-details">
            <div class="avatar-container"></div>
            <p>
              <b>alejomonp</b> commented 5 days ago
            </p>
          </div>
          <div class="comment-body">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <footer>1 2 3</footer>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div class="dashboard">
      <div class="dashboard-menu">
        <div class="spacer" />
        <UserMenuButtons />
      </div>
      <main>
        <UserOverview />

        <Repos />
        <DashboardOverview />
        <DashboardGoalsDigest />
        <DashboardTaskTimetable />
      </main>
      <div class="user-info-panel"></div>
    </div>
  );
}

function DashboardTaskTimetable() {
  return <></>;
}

function Popup() {
  const [clicked, setClicked] = useState(false);
  return (
    <div class="popup-container" data-isclicked={clicked}>
      <ExitButton setClicked={setClicked} />
      <div class="popup-gradient-box">
        <div class="popup-gradient" />
      </div>
      <div class="popup">
        {" "}
        <div>
          <h2>ver. 0.12.4</h2>
          <span class="spacer"></span>
        </div>{" "}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
      </div>
    </div>
  );
}
