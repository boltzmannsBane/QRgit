import * as React from "react";
import { motion, useMotionValue } from "framer-motion";
import { icon } from "./settings";
import { useIconTransform } from "./use-icon-transform";

export function Item({
  colors,
  icons,
  setDrag,
  row,
  col,
  planeX,
  planeY,
  setActiveItem,
}) {
  const [index] = React.useState([Math.floor(Math.random() * 6)]);
  const [active, setActive] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const handleClick = () => {
    setActive((prevState) => !prevState);
    setDrag((prevState) => !prevState);
    setActiveItem(index);
  };
  // Calculate the origin x and y offsets of this icon based on
  // its column and row position
  const xOffset =
    col * (icon.size + icon.margin) +
    (row % 2) * ((icon.size + icon.margin) / 2);
  const yOffset = row * icon.size;

  // Transform the icon's x, y and scale based on the position of the draggable plane
  useIconTransform({ x, y, scale, planeX, planeY, xOffset, yOffset });
  return (
    <motion.div
      class="grid-item"
      data-isactive={active}
      onTap={handleClick}
      style={{
        position: "absolute",
        left: xOffset,
        top: yOffset,
        x,
        y,
        scale,
        width: icon.size,
        height: icon.size,
        borderRadius: "50%",
        // This will change the color of an icon every render. In production
        // you'd want to save this as a ref or similar. But here it makes a nice
        // visual indicator that we're doing all this without any re-renders :)
        background: `${colors[index]}`,
      }}
    >
      {icons[index]}
    </motion.div>
  );
}
