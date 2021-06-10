import "../styles/components/Loader.css";

export const Loader = (props: { size?: number }) => {
  return (
    <svg style={{width:  props.size || "20px"}} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {props.size}
      <circle cx="50" cy="50" r="45" />
    </svg>
  );
};
