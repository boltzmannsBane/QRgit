export default function ExitButton({ setClicked }) {
  return (
    <div class="exit-btn" onClick={() => setClicked(true)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26Z"     
          />
        </g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.8755 8.34215C17.466 7.93266 16.802 7.93272 16.3925 8.34227L12.9337 11.8011L9.54108 8.40846C9.1316 7.99897 8.46765 7.99903 8.0581 8.40858C7.64855 8.81813 7.64849 9.48209 8.05797 9.89157L11.4506 13.2842L7.99172 16.743C7.58217 17.1526 7.58211 17.8165 7.99159 18.226C8.40108 18.6355 9.06503 18.6355 9.47458 18.2259L12.9334 14.767L16.3261 18.1597C16.7356 18.5692 17.3995 18.5691 17.8091 18.1596C18.2186 17.75 18.2187 17.0861 17.8092 16.6766L14.4166 13.2839L17.8753 9.82513C18.2849 9.41558 18.285 8.75163 17.8755 8.34215Z"
          fill="#8E8E93"
        />
        <defs>
          <filter
            id="filter0_b"
            x="-54.3656"
            y="-54.3656"
            width="134.731"
            height="134.731"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="27.1828" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
