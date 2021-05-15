import { useState, useEffect } from "react";
import { NotifsIcon, ProfileIcon, DoughnutChart } from "./SVGs.js";
import { motion } from "framer-motion";

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
  return <></>;
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
          <div class="goal-description">b</div>
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

  return (
    <div class="goal-gantt-chart-container grow">
      <div class="labels-row">
        {months.map((el, i) => (
          <div class={i === 3 && "active"}>
            <p>{el}</p>
          </div>
        ))}
      </div>
      <div class="chart-body grow">
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
      </div>
    </div>
  );
};
