import Link from "next/link";
import "./page.css";

export default function Home() {
  return (
    <div className="App">
      <div className="Section">
        <div className="Section-1">
          <h3>Add Schools</h3>
          <p>
            {" "}
            Add schools in a database by providing name, city, state, contact,
            image and email id{" "}
          </p>
          <br />{" "}
          <button>
            {" "}
            <Link href={"/addschool"}>AddSchool</Link>
          </button>{" "}
        </div>

        <div className="Section-1">
          <h3>Show Schools</h3>
          <p>
            {
              "Show schools from the database and display school's name, address, city and image"
            }
          </p>
          <br />{" "}
          <button>
            {" "}
            <Link href={"/ShowSchools"}> ShowSchools </Link>
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
