import "./_icon.scss";

const Icon = (props) => (
  <div className={`icon ${props.className}`}>{props.children}</div>
);

export default Icon;
