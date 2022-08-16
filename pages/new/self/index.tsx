import { NextPage } from "next";
import { useState } from "react";
import SingleSelfService from "../../../components/SelfService/Single";

const SelfService: NextPage = () => {
  const [selection, setSelection] = useState<"single" | "bulk">("single");

  const displayContent = () => {
    switch (selection) {
      case "single":
        return <SingleSelfService />
      case "bulk":
        return <></>
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
          <li className="-mb-px mr2 last:mr-0 flex-auto text-center">
            <a 
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (selection === "single" 
                  ? "text-white bg-blue-700"
                  : "text-blue-600 bg-white"
                )
              }
              onClick={e => {
                e.preventDefault();
                setSelection("single")
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Single Upload
            </a>
          </li>
          <li className="-mb-px mr2 last:mr-0 flex-auto text-center">
            <a 
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (selection === "bulk" 
                  ? "text-white bg-blue-700"
                  : "text-blue-600 bg-white"
                )
              }
              onClick={e => {
                e.preventDefault();
                setSelection("bulk")
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Bulk Upload
            </a>
          </li>
        </ul>
      </div>
      {displayContent()}
    </div>
  )
}

export default SelfService;