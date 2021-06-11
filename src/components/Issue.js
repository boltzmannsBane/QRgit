import { useEffect } from "react";

const OpenIssueIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9668 4.45455H11.035L11.177 14.9091H12.8248L12.9668 4.45455ZM12.0009 19.1136C12.704 19.1136 13.2793 18.5384 13.2793 17.8352C13.2793 17.1321 12.704 16.5568 12.0009 16.5568C11.2978 16.5568 10.7225 17.1321 10.7225 17.8352C10.7225 18.5384 11.2978 19.1136 12.0009 19.1136Z"
      fill="#00FFA3"
    />
    <rect
      x="1"
      y="1"
      width="22"
      height="22"
      rx="11"
      stroke="#00FFA3"
      stroke-width="2"
    />
  </svg>
);

const CommentsIcon = () => (
  <svg
    width="19"
    height="16"
    viewBox="0 0 19 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 0C1.34315 0 0 1.34315 0 3V8.39038C0 10.0472 1.34315 11.3904 3 11.3904H3.80271L4.22376 15.4176C4.26584 15.8201 4.74373 16.0085 5.04912 15.7429L10.0548 11.3904H16C17.6569 11.3904 19 10.0472 19 8.39038V3C19 1.34315 17.6569 0 16 0H3Z"
      fill="#F4F4F4"
    />
  </svg>
);

export const Issue = ({ sdss, data, comments, index }) => {
  const { title, date} = data
  
  useEffect(() => console.log(comments), [])

  return (
    <>
      <div
        class="issue"
        onClick={() => {
          sdss(index + 1);
        }}
      >
        <div class="issue-box">

          <OpenIssueIcon />
          <p>
           {title}
          </p>
          <div class="tags">
            <span class="tag docs">docs</span>
            <span class="tag help">help wanted</span>
            <span class="tag legacy">lecacy-code-api</span>
          </div>
          <div class="comments">
            <div class="comments-icon">
              <CommentsIcon />
            </div>
            <div class="comments-counter">
              <p>{comments.length}</p>
            </div>
          </div>
        </div>
        <div class="issue-details">
          <p>{date}</p>
        </div>
      </div>
    </>
  );
};

export const PinnedIssue = ({data, index, sdss, comments}) => {
const { title, date} = data
  return (
    <div class="pinned-issue" onClick={() => sdss(index)}>
      {" "}
      <p>{title}</p>
      <div class="issue-details">
        <p>{date}</p>
      </div>
      <div>
        <OpenIssueIcon />
        <div class="comments">
          <div class="comments-icon">
            <CommentsIcon />
          </div>
          <div class="comments-counter">
            <p>{comments.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
