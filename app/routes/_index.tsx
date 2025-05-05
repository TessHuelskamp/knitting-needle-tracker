import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function needleKey ({ needleName, size }: {
  needleName: string,
  size: string
}) {
  return `${needleName}-${size}`
}

function nKey (n: string, s: string) {
  return needleKey({ needleName: n, size: s })
}


function NeedleCell ({
  needleName,
  size,
  value,
  toggleNeedle
}: {
  needleName: string,
  size: string,
  value: boolean
  toggleNeedle: () => void
}) {
  useEffect(() => {
    if (value !== undefined)
      console.log(needleName, size, value)
  })

  return <td className="px-6 py-4 border-r border-l border-gray-200 text-center" onClick={toggleNeedle}>{!!value ? '✅' : ""}</td>

}



export default function Index () {

  // should probs use a set but w/e
  const [library, setLibrary] = useState<Record<string, any>>({
    "Cr-0": 1,
    "Cr-10": 1,
    '16"-5': 1
  });


  function present (n: string, s: string) {
    return library.hasOwnProperty(needleKey({ needleName: n, size: s })) && !!library[nKey(n, s)]
  }


  function toggleValue (n: string, s: string) {
    setLibrary({
      ...library,
      [nKey(n, s)]: present(n, s) ? undefined : 1
    })

    console.log(n, s, library)
  }


  const needles = ["Cr", "str", "dpn", '8"', '16"', '24"', '36"', '40"', 'a', 'b', 'c', 'd']
  const sizes = ['00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']


  return (
    <div className="flex h-screen items-center justify-center background-white">
      <div className="flex flex-col items-center gap-16 h-dvh">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 mt-4">
            Knitting Needle Tracker
          </h1>
        </header>
        <div className="">
          {/* Table container */}
          <div className="max-height-[80vh] m-4 p-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                <th scope="col" className="px-6 py-3" />
                {
                  needles.map(n => <th key={n} scope="col" className="px-6 py-3 ">{n}</th>)
                }
              </thead>
              <tbody>
                {
                  sizes.map(s => {
                    return <tr key={s} className="bg-white border-b border-gray-300">
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-l border-gray-200 text-center sticky left-0 bg-gray-50">{s}</td>{
                        needles.map(n => <NeedleCell key={nKey(n, s)} needleName={n} size={s} value={library[nKey(n, s)]} toggleNeedle={() => toggleValue(n, s)} />)
                      }</tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

