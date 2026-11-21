import { useCycle } from "../src/hooks/useCycle";

const activities = [
  ["gym", "lifting at the gym"],
  ["travel", "planning the next trip"],
  ["sports", "watching a match"],
  ["music", "lost in a playlist"],
];

const Hobbies = () => {
  const { index, pause, resume } = useCycle(activities.length, 1600);
  const [key, label] = activities[index];

  return <p className="hobbies" onMouseEnter={pause} onMouseLeave={resume}>
    Off the clock, I’m probably{" "}
    <a className="hobbies-now" key={key} href="#off-the-clock">
      {label}
    </a>
  </p>;
};

export default Hobbies;
