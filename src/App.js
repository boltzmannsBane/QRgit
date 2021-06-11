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
import Benji from "./components/images/Benji.webp";
import Katherine from "./components/images/Katherine.webp";
import Daniel from "./components/images/Daniel.webp";
import User from "./components/images/User.webp";

import { AnimatePresence } from "framer-motion";

const mockCommentsData = [
  {
    comments: [
      { author: "Daniel", date: "yesterday", pfp: Daniel },
      { author: "Katherine", date: "yesterday", pfp: Katherine },
      { author: "Caroline", date: "yesterday", pfp: User },
      { author: "Benji", date: "yesterday", pfp: Benji },
    ],
  },

  {
    comments: [
      { author: "Katherine", date: "yesterday", pfp: Katherine },
      { author: "Caroline", date: "yesterday", pfp: User },
      { author: "Katherine", date: "yesterday", pfp: Katherine },
      { author: "Daniel", date: "yesterday", pfp: Daniel },
      { author: "Benji", date: "yesterday", pfp: Benji },
      { author: "Katherine", date: "yesterday", pfp: Katherine },
    ],
  },
];

const commentsMockBody = [
  <pre>
    Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of
    lather on which a mirror and a razor lay crossed. A yellow dressinggown,
    ungirdled, was sustained gently behind him on the mild morning air. He held
    the bowl aloft and intoned:
     <code>—Introibo ad altare Dei.</code>
     Halted, he peered down the dark winding stairs and called out coarsely: 
<code>—Come up, Kinch! Come up, you fearful jesuit!</code>
 Solemnly he came forward and mounted the round gunrest.
    He faced about and blessed gravely thrice the tower, the surrounding land
    and the awaking mountains. Then, catching sight of Stephen Dedalus, he bent
    towards him and made rapid crosses in the air, gurgling in his throat and
    shaking his head. Stephen Dedalus, displeased and sleepy, leaned his arms on
    the top of the staircase and looked coldly at the shaking gurgling face that
    blessed him, equine in its length, and at the light untonsured hair, grained
    and hued like pale oak.
  </pre>,
  <pre>
    Buck Mulligan peeped an instant under the mirror and then covered the bowl
    smartly.
    <code>—Back to barracks! he said sternly.</code>
    He added in a preacher’s tone:
    <code>
      —For this, O dearly beloved, is the genuine Christine: body and soul and
      blood and ouns. Slow music, please. Shut your eyes, gents. One moment. A
      little trouble about those white corpuscles. Silence, all.
    </code>
    He peered sideways up and gave a long slow whistle of call, then paused
    awhile in rapt attention, his even white teeth glistening here and there
    with gold points. Chrysostomos. Two strong shrill whistles answered through
    the calm.
    <code>
      —Thanks, old chap, he cried briskly. That will do nicely. Switch off the
      current, will you?
    </code>
    He skipped off the gunrest and looked gravely at his watcher, gathering
    about his legs the loose folds of his gown. The plump shadowed face and
    sullen oval jowl recalled a prelate, patron of arts in the middle ages. A
    pleasant smile broke quietly over his lips.
  </pre>,
  <pre>
    <code>
      —The mockery of it! </code>
      he said gaily.
      <code>—Your absurd name, an ancient Greek!
    </code>
    He pointed his finger in friendly jest and went over to the parapet,
    laughing to himself. Stephen Dedalus stepped up, followed him wearily
    halfway and sat down on the edge of the gunrest, watching him still as he
    propped his mirror on the parapet, dipped the brush in the bowl and lathered
    cheeks and neck. Buck Mulligan’s gay voice went on.
    <code>
      —My name is absurd too: Malachi Mulligan, two dactyls. But it has a
      Hellenic ring, hasn’t it? Tripping and sunny like the buck himself. We
      must go to Athens. Will you come if I can get the aunt to fork out twenty
      quid?
    </code>
  </pre>,
  <pre>
    He laid the brush aside and, laughing with delight, cried:
    <code>—Will he come? The jejune jesuit!</code>
    Ceasing, he began to shave with care.
    <code>—Tell me, Mulligan, </code>
    Stephen said quietly.
    <code>—Yes, my love?</code>
    <code>—How long is Haines going to stay in this tower?</code>
    Buck Mulligan showed a shaven cheek over his right shoulder.
    <code>
      —God, isn’t he dreadful? </code>
      he said frankly.
      <code>—A ponderous Saxon. He thinks
      you’re not a gentleman. God, these bloody English! Bursting with money and
      indigestion. Because he comes from Oxford. You know, Dedalus, you have the
      real Oxford manner. He can’t make you out. O, my name for you is the best:
      Kinch, the knife-blade.
    </code>
    He shaved warily over his chin.
    <code>
      —He was raving all night about a black panther,</code>
      Stephen said.
      <code>—Where is his
      guncase?
    </code>
  </pre>,
  <pre><code>—A woful lunatic!</code>
  Mulligan said. 
  <code>—Were you in a funk?</code>

<code>—I was,</code> 
Stephen said with energy and growing fear. 
<code>—Out here in the dark with a man I don’t know raving and moaning to himself about shooting a black panther. You saved men from drowning. I’m not a hero, however. If he stays on here I am off.</code>

Buck Mulligan frowned at the lather on his razorblade. He hopped down from his perch and began to search his trouser pockets hastily.</pre>,
  <pre><code>—Scutter!</code> 
  he cried thickly.

He came over to the gunrest and, thrusting a hand into Stephen’s upper pocket, said:

<code>—Lend us a loan of your noserag to wipe my razor.</code>

Stephen suffered him to pull out and hold up on show by its corner a dirty crumpled handkerchief. Buck Mulligan wiped the razorblade neatly. Then, gazing over the handkerchief, he said:

<code>—The bard’s noserag! A new art colour for our Irish poets: snotgreen. You can almost taste it, can’t you?</code></pre>,
];

const IssueMockBody = [
<pre>Their eyes watched him. On the slow weedy waterway he had floated on his raft coastward over Ireland drawn by a haulage rope past beds of reeds, over slime, mudchoked bottles, carrion dogs. Athlone, Mullingar, Moyvalley, I could make a walking tour to see Milly by the canal. Or cycle down. Hire some old crock, safety. Wren had one the other day at the auction but a lady’s. Developing waterways. James M’Cann’s hobby to row me o’er the ferry. Cheaper transit. By easy stages. Houseboats. Camping out. Also hearses. To heaven by water. Perhaps I will without writing. Come as a surprise, Leixlip, Clonsilla. Dropping down lock by lock to Dublin. With turf from the midland bogs. Salute. He lifted his brown straw hat, saluting Paddy Dignam.

They drove on past Brian Boroimhe house. Near it now.

<code>—I wonder how is our friend Fogarty getting on.</code> Mr Power said.

<code>—Better ask Tom Kernan,</code> Mr Dedalus said.</pre>, 
<pre>The priest closed his book and went off, followed by the server. Corny Kelleher opened the sidedoors and the gravediggers came in, hoisted the coffin again, carried it out and shoved it on their cart. Corny Kelleher gave one wreath to the boy and one to the brother-in-law. All followed them out of the sidedoors into the mild grey air. Mr Bloom came last folding his paper again into his pocket. He gazed gravely at the ground till the coffincart wheeled off to the left. The metal wheels ground the gravel with a sharp grating cry and the pack of blunt boots followed the trundled barrow along a lane of sepulchres.

The ree the ra the ree the ra the roo. Lord, I mustn’t lilt here.

<code>—The O’Connell circle.</code> Mr Dedalus said about him.

Mr Power’s soft eyes went up to the apex of the lofty cone.

<code>—He’s at rest,</code> he said, 
<code>in the middle of his people, old Dan O’. But his heart is buried in Rome. How many broken hearts are buried here, Simon!</code></pre>,  
<pre>Your heart perhaps but what price the fellow in the six feet by two with his toes to the daisies? No touching that. Seat of the affections. Broken heart. A pump after all, pumping thousands of gallons of blood every day. One fine day it gets bunged up: and there you are. Lots of them lying around here: lungs, hearts, livers. Old rusty pumps: damn the thing else. The resurrection and the life. Once you are dead you are dead. That last day idea. Knocking them all up out of their graves. Come forth, Lazarus! And he came fifth and lost the job. Get up! Last day! Then every fellow mousing around for his liver and his lights and the rest of his traps. Find damn all of himself that morning. Pennyweight of powder in a skull. Twelve grammes one pennyweight. Troy measure.

Corny Kelleher fell into step at their side.

<code>—Everything went off A1,</code> he said. <code>What?</code>

He looked on them from his drawling eye. Policeman’s shoulders. With your tooraloom tooraloom.

<code>—As it should be,</code> Mr Kernan said.

<code>—What? Eh?</code> Corny Kelleher said.

Mr Kernan assured him.

<code>—Who is that chap behind with Tom Kernan? John Henry Menton asked. I know his face.</code></pre>]
const IssuesMockData = [
  {
    author: "Benji",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut enim ad minim veniam",
    date: "yesterday",
        body: IssueMockBody[2],
    status: "open",
    tags: ["docs", "help", "legacy"],
    link: "",
    pfp: Benji,
    isPinned: false,
  },
  {
    author: "Katherine",
    title: "Ut enim ad minim veniam, quis nostrud exercitation ullamco sed do eiusmod tempor incididunt ut labore",
    date: "yesterday",
    body: IssueMockBody[0],
    status: "open",
    tags: ["docs"],
    link: "",
    pfp: Katherine,
    isPinned: false,
  },
  {
    author: "Daniel",
    title: "[epic] Enable Rust Compiler for OSS",
    date: "2 days ago",
    body: IssueMockBody[1],
    status: "open",
    tags: ["docs", "help"],
    link: "",
    pfp: Daniel,
    isPinned: true,
  },
  {
    author: "Caroline",
    title: "[new] Future Releases",
    date: "3 days ago",
    body: IssueMockBody[2],
    status: "open",
    tags: ["help"],
    link: "",
    pfp: User,
    isPinned: true,
  },
  {
    author: "Benji",
    title: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua boris nisi ut aliquip ex ea commodo",
    date: "5 days ago",
    body: IssueMockBody[0],
    status: "open",
    tags: ["help"],
    link: "",
    pfp: Benji,
    isPinned: false,
  },
  {
    author: "Katherine",
    title: "Laboris nisi ut aliquip ex ea commodo consequat cillum dolore eu fugiat nulla pariatur",
    date: "5 days ago",
    body: IssueMockBody[1],
    status: "open",
    tags: ["legacy"],
    link: "",
    pfp: Katherine,
    isPinned: false,
  },
  {
    author: "Daniel",
    title: "Esse cillum dolore eu fugiat nulla pariatur in culpa qui officia deserunt mollit anim id est laborum",
    date: "5 days ago",
    body: IssueMockBody[2],
    status: "open",
    tags: ["docs", "legacy"],
    link: "",
    pfp: Daniel,
    isPinned: false,
  },
  {
    author: "Caroline",
    title: "Sunt in culpa qui officia deserunt mollit anim id est laborum rem aperiam, eaque ipsa quae ab illo",
    date: "1 week ago",
    body: IssueMockBody[0],
    status: "open",
    tags: ["help"],
    link: "",
    pfp: User,
    isPinned: false,
  },
  {
    author: "Benji",
    title: "Totam rem aperiam, eaque ipsa quae ab illo veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    date: "01.01.2022",
    body: IssueMockBody[1],
    status: "open",
    tags: ["help"],
    link: "",
    pfp: Benji,
    isPinned: false,
  },
  {
    author: "Katherine",
    title:
      "Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo aspernatur aut odit aut fugit",
    date: "02.02.2022",
    body: IssueMockBody[2],
    status: "open",
    tags: ["help"],
    link: "",
    pfp: Katherine,
    isPinned: false,
  },
  {
    author: "Daniel",
    title:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit",
    date: "05.09.2021",
    body: IssueMockBody[0],
    status: "open",
    tags: ["docs"],
    link: "",
    pfp: Daniel,
    isPinned: false,
  },
  {
    author: "Caroline",
    title: "Sed quia consequuntur magni dolores eos qui ratione, qui dolorem ipsum sit amet, consectetur, adipisci velit, sed quia non numquam",
    date: "29.02.2021",
    body: IssueMockBody[1],
    status: "open",
    tags: ["help", "legacy"],
    link: "",
    pfp: User,
    isPinned: false,
  },
  {
    author: "Benji",
    title: "Neque porro quisquam est, qui dolorem ipsum sit amet, consectetur, adipisci velit, sed quia non numquam",
    date: "10.10.2021",
    body: IssueMockBody[2],
    status: "open",
    tags: ["docs", "help", "legacy"],
    link: "",
    pfp: Benji,
    isPinned: false,
  },
  {
    author: "Katherine",
    title:
      "Quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam",
    date: "01.02.2022",
    body: IssueMockBody[0],
    status: "open",
    tags: ["docs", "help"],
    link: "",
    pfp: Katherine,
    isPinned: false,
  },
  {
    author: "Daniel",
    title:
      "Eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem",
    date: "02.05.2021",
    body: IssueMockBody[1],
    status: "open",
    tags: ["help"],
    link: "",
    pfp: Daniel,
    isPinned: false,
  },
  {
    author: "Caroline",
    title:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis incidunt ut labore et dolore magnam aliquam quaerat voluptatem",
    date: "16.10.2021",
    body: IssueMockBody[2],
    status: "open",
    tags: ["docs", "help"],
    link: "",
    pfp: User,
    isPinned: false,
  },
];

const viewsArray = ["Dashboard", "Issues", "Releases"];
const views = [<Dashboard />, <IssuesScreen />, <ReleasesScreen />];



function App() {
  const [activeView, setActiveView] = useState(viewsArray[0]);
  const [displayView, setDisplayView] = useState("Dashboard");
  const [loading, setLoading] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  useEffect(() => {
    let completed;
    function handleLoading() {
      completed = window.setTimeout(() => {
        setLoading(false);
        setDisplayView(activeView);
setMenuIsOpen(false)
      }, 1500);
    }
    handleLoading();
    return () => {
      clearTimeout(completed);

    };
  }, [activeView]);

  const handleViewChange = () => views[viewsArray.indexOf(displayView)];

  return (
    <div class="container" onClick={() => setMenuIsOpen(false)}>
      <Menu
      isOpen={menuIsOpen}
        activeView={activeView}
        setActiveView={setActiveView}
        loading={loading}
        setLoading={setLoading}
      />
      <div class="content-container">
        <div class="git-icon-container" onClick={(e) => {
        e.stopPropagation()
        setMenuIsOpen(true)
        }}>
          <span class="mobile-menu-btn">Menu</span>
        </div>
        <AnimatePresence exitBeforeEnter>{handleViewChange()}</AnimatePresence>
        <Popup />
        <div class="cursor" />
      </div>
    </div>
  );
}

export default App;

function Menu({ isOpen, activeView, setActiveView, loading, setLoading }) {
  const showLoader = (ani) => {
    if (loading && activeView === ani) return <NavLoadingIndicator />;
  };

  return (
    <div class="menu" onClick={e => e.stopPropagation()} data-isOpen={isOpen}>
      <div>
        <h1>qrGit Client</h1>
        <input type="text" placeholder="Search" />
        <nav>
          {viewsArray.map((el, index) => (
            <div
              // reminder that component state doesn't persist on route change.
              // either exclude the menu from the router or find some other way around.
              // maybe context.
              class={`nav-item ${el === "Releases" && "disabled"}`}
              data-isclicked={activeView === el}
              onClick={() => {
                el !== "Releases" && el !== activeView && setActiveView(el);
                el !== "Releases" && el !== activeView && setLoading("pending");
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
        <a class="secondary disabled" style={{display: "flex", justifyContent: "center"}} href="/">
view on GitHub
          <ExternalLinkIcon />
        </a>
      </div>{" "}
      <div class="spacer" />
      <a href="/" class="secondary feedback disabled">
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
      {detailsScreenState && (
        <IssueDiscussion
          detailsScreenState={detailsScreenState}
          setDetailsScreenState={setDetailsScreenState}
        />
      )}
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
  const pinnedIssuesData = [];
  return (
    <div class="content">
      <PinnedIssues pinnedIssuesData={pinnedIssuesData} sdss={setDetailsScreenState}/>
      <div class="issues-content">
        {IssuesMockData.map((element, index) => {
          if (element.isPinned) pinnedIssuesData.push({element, index});
          else {
            return (
              <Issue
                data={element}
                index={index}
                sdss={setDetailsScreenState}
                comments={mockCommentsData[index % 2].comments}
              />
            );
          }
        })}
      </div>
      <div class="load-more-btn-container">
        <div class="load-more-btn">
          <p>Load more</p>
        </div>
      </div>
    </div>
  );
}

function PinnedIssues({pinnedIssuesData, sdss}) {
  return (
    <div class="pinned-container">
{pinnedIssuesData.map((e) => <PinnedIssue sdss={sdss} data={e.element} index={e.index} comments={mockCommentsData[e.index % 2].comments}/>)}
    </div>
  );
}

function IssueDiscussion({ detailsScreenState, setDetailsScreenState }) {
  const index = detailsScreenState && detailsScreenState - 1;
  const data = IssuesMockData[index];
  const { author, body, date, pfp } = data;
  const { comments } = mockCommentsData[index % 2];

  return (
    <div class="discussion" data-isopen={detailsScreenState && true}>
      <nav>
        <span onClick={() => setDetailsScreenState(false)}>go back</span>
        <span>share</span>
      </nav>{" "}
      <div class="discussion-container">
        <h1>
          Missing script: relay-compiler <span class="issue-id">#99280</span>
        </h1>
        <p>
          <b>{author}</b> opened this issue {date} · {comments.length} comments
        </p>
        <p>
          <span class="disabled">View on GitHub</span>
          <span>-</span>
          <span class="disabled">Copy Link</span>
        </p>
        <div class="divider" />
        <div class="comment">
          <div class="comment-details">
            <div class="avatar-container">
              <img src={pfp} alt={author} />
            </div>
            <p>
              <b>{author}</b> posted {date}
            </p>
            <div class="spacer" />
            <span style={{marginRight: "0.5rem"}}><svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="copy-link-icon"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></span>
            <span><svg aria-label="Show options" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="options-icon"><path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg></span>
          </div>
          <div class="comment-body">
            <p><pre>{body}</pre></p>
          </div>
        </div>
        {comments.map(({ author, pfp, date, body }, index) => (
          index <= comments.length && <div class="comment">
            <div class="comment-details">
              <div class="avatar-container">
                <img src={pfp} alt={author} />
              </div>
              <p>
                <b>{author}</b> commented {date}
              </p>
              <div class="spacer" />
            <span style={{marginRight: "0.5rem"}}><svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="copy-link-icon"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></span>
            <span><svg aria-label="Show options" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="options-icon"><path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg></span>
            </div>
            <div class="comment-body">
              <p>{commentsMockBody[index]}</p>
            </div>
          </div>
        ))}

        <footer><div class="ball-one"/><div class="ball-two"/><div class="ball-three"/></footer>
      </div>
    </div>
  );
}

function Dashboard() {
  const [selectedRepo, setSelectedRepo] = useState(0);

  return (
    <div class="dashboard">
      <div class="dashboard-menu">
        <div class="spacer" />
        <UserMenuButtons />
      </div>
      <main>
        <UserOverview />

        <Repos setSelectedRepo={setSelectedRepo} selectedRepo={selectedRepo} />
        <DashboardOverview selectedRepo={selectedRepo} />
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

function ReleasesScreen() { return <div class="releases-screen"><h1>🔨 <br /> Under <br /> construction</h1></div> }

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
Current release is an early pre-alpha demo built as a reference for the further development, the UX will likely be subject to change. The API, along with the entire backend are currently udnerwork. For now, feel free to play around and let us know what you think. 
        </p>
      </div>
    </div>
  );
}
