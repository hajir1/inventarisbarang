import React, { useEffect, useState } from "react";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";
import { useDashboard, useToken } from "../state/zustand";

import { Table2 } from "../component/element/Table";
import {
  APIBatalkanPakai,
  APIGetAlatDipakai,
  APISelesaiPakai,
} from "../services/API_CALL.service";
// import { currentDate } from "../libs/Waktu";

const GetAlatDipakai = () => {
  // const { token } = useToken();
  const { dashboard } = useDashboard();
  const [dipakais, setDiapakais] = useState([]);
  //   const [tolakPesanan, terimaPesanan] = useState(null);
  useEffect(() => {
    APIGetAlatDipakai((cb) => setDiapakais(cb?.data?.data));
  }, []);
  return (
    <div className={`${dashboard ? "w-4/5" : "w-full"} p-2 relative`}>
      {dipakais?.length < 1 ? (
        <h1 className="text-xl pt-5 text-center text-gray-900 sm:pr-12 font-mono uppercase ">
          tidak ada alat yang sedang dipakai
        </h1>
      ) : (
        <Table2 th1={`nama alat`} th2={`kondisi`} th3={`nama pemakai`} th4={`waktu pinjam`} th5={`deskripsi`} th6={`opsi`}>
          {dipakais?.map((dipakai) => (
            <tr
              key={dipakai?.id}
              className="border-b border-neutral-200 dark:border-white/10"
            >
              <td className="whitespace-nowrap text-center px-6 py-4 font-medium">
                {dipakai?.nama_alat}
              </td>
              <td className="whitespace-nowrap text-center px-6 py-4">
                {dipakai?.kondisi}
              </td>
              <td className="whitespace-nowrap text-center px-6 py-4">
                {dipakai?.dipakais[0]?.nama_pemakai}
              </td>
              <td className="whitespace-nowrap text-center px-6 py-4">
                {dipakai?.dipakais[0]?.waktu_pinjam}
              </td>
              <td className="whitespace-nowrap text-center px-6 py-4">
                {dipakai?.dipakais[0]?.deskripsi}
              </td>
              <td className="whitespace-nowrap text-center px-6 py-4">
                <button
                  onClick={() => {
                    APIBatalkanPakai(
                      dipakai?.id,
                      dipakai?.dipakais[0]?.id,
                      (cb) => {
                        if (cb?.status === 200) {
                          window.location.reload();
                        }
                      }
                    );
                  }}
                  className=" text-gray-800 font-semibold py-2 px-4 border-b border-b-gray-500 rounded shadow"
                >
                  batalkan
                </button>
                <button
                  onClick={() => {
                    APISelesaiPakai(
                      dipakai?.id,
                      dipakai?.dipakais[0]?.id,
                      (cb) => {
                        if (cb?.status === 200) {
                          window.location.reload();
                        }
                      }
                    );
                  }}
                  className=" text-gray-800 font-semibold py-2 px-4 border-b border-b-gray-500 rounded shadow"
                >
                  selesai
                </button>
              </td>
            </tr>
          ))}
        </Table2>
      )}
    </div>
  );
};

const AlatDipakai = () => {
  const { token } = useToken();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (!token ) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full flex">
        <Dashboard />
        <GetAlatDipakai />
      </div>
    </div>
  );
};

export default AlatDipakai;
