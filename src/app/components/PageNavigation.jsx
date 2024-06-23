import "./PageNavigation.scss";

import Link from "next/link";

const PageNavigation = (props) => {
  const { pageName, link } = props;

  return (
    <div className="PageNavigation">
      <Link href={link}>
        <button className="">
          <span class="details">{pageName} &nbsp;&nbsp;&nbsp; </span>
          <span class="arrow">&#8594;</span>
        </button>
      </Link>
    </div>
  );
};

export default PageNavigation;
