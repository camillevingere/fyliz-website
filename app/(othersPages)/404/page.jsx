import Footer8 from "@/components/footers/Footer8";
import Header8 from "@/components/headers/Header8";
import Notfound from "@/components/otherPages/404";
import Breadcumb from "@/components/otherPages/Breadcumb";
export const metadata = {
  title: "Page Not Found || Fyliz - Automation Agency",
  description:
    "Fyliz - Automation Agency. The page you're looking for could not be found.",
};
export default function page() {
  return (
    <>
      <div className="page-wrapper uni-body panel bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden bp-xs bp-sm bp-md bp-lg bp-xl bp-xxl dom-ready">
        <Header8 />
        <div id="wrapper" className="wrap">
          <Breadcumb />
          <Notfound />
        </div>
        <Footer8 />
      </div>
    </>
  );
}
