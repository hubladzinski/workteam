import SVG from "react-inlinesvg";

const Icon = ({ src, ...props }) => (
  <div {...props}>
    <SVG src={src} />
  </div>
);

export default Icon;
