export default function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : "bg-dark";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "container card mb-3 " + bg + txt;
  }

  return (
    <div className={`mt-5 ${classes()}`} style={{ width: "45rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
