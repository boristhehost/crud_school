import PageNavigation from "../components/PageNavigation";

export default function ShowSchoolsLayout({ children }) {
  return (
    <>
      <PageNavigation pageName={"Add Schools"} link={"/addschool"} />
      {children}
    </>
  );
}
