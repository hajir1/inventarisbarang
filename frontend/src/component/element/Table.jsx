import React from "react";

export const Table = ({ children, tableId, th1, th2 }) => {
  return (
    <table
      id={`${tableId}`}
      className="min-w-full text-left text-sm font-light text-surface "
    >
      <thead className="border-b border-neutral-200 font-medium ">
        <tr>
          <th
            scope="col"
            className="px-2 py-4   uppercase font-normal text-center tracking-wider"
          >
            {th1}
          </th>
          <th
            scope="col"
            className="px-2 py-4   uppercase font-normal text-center tracking-wider"
          >
            {th2}
          </th>
          <th
            scope="col"
            className="px-2 py-4   uppercase font-normal text-center tracking-wider"
          >
            waktu awal
          </th>
          <th
            scope="col"
            className="px-2 py-4   uppercase font-normal text-center tracking-wider"
          >
            waktu selesai
          </th>
          <th
            scope="col"
            className="px-2 py-4   uppercase font-normal text-center tracking-wider"
          >
            opsi
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
export const Table2 = ({ children, th1, th2, th3, th4, th5, th6 }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-surface ">
              <thead className="border-b border-neutral-200 font-medium ">
                <tr>
                  <th scope="col" className="px-2 py-4 uppercase  font-normal text-center">
                    {th1}
                  </th>
                  <th scope="col" className="px-2 py-4 uppercase  font-normal text-center">
                    {th2}
                  </th>
                  <th scope="col" className="px-2 py-4 uppercase font-normal text-center">
                    {th3}
                  </th>

                  <th scope="col" className="px-2 py-4 uppercase font-normal text-center">
                    {th4}
                  </th>
                  <th scope="col" className="px-2 py-4 uppercase font-normal text-center">
                    {th5}
                  </th>

                  <th scope="col" className="px-2 py-4 uppercase font-normal text-center">
                    {th6}
                  </th>
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
