import React, { useEffect, useState } from "react";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";
import { useDashboard, useToken } from "../state/zustand";

import { ButtonCard } from "../component/element/Button";
import { AlertGagal } from "../component/element/Alert";
import IconGembok from "../component/element/Icon/IconGembok";
import { useNavigate } from "react-router-dom";
import {
  APIBatalkanService,
  APIGetService,
  APISelesaiService,
} from "../services/API_CALL.service";
import { Table2 } from "../component/element/Table";

const GetDataService = () => {
  const { dashboard } = useDashboard();
  const [hapusCard, setHapusCard] = useState(null);
  const [services, setServices] = useState([]);
  useEffect(() => {
    APIGetService((cb) => {
      setServices(cb?.data?.data);
    });
  }, []);


  return (
    <div className={`${dashboard ? "w-4/5" : "w-full"} p-2 relative`}>
      {services?.length > 0 ? (
        <>
          {" "}
          <h2 className="text-xl pt-5 text-center text-gray-900 sm:pr-12 font-mono uppercase ">
            seluruh alat yang di service
          </h2>
          <div className="flex justify-evenly w-full  flex-wrap gap-x-1 gap-y-3 ">
            <Table2
              th1={`nama alat`}
              th2={`kondisi`}
              th3={`deskripsi`}
              th4={`jenis service`}
              th5={`waktu`}
              th6={`opsi`}
            >
              {services?.map((service) => (
                <tr
                  key={service?.id}
                  className="border-b border-neutral-200 dark:border-white/10"
                >
                  <td className="whitespace-nowrap text-center px-6 py-4 font-medium">
                    {service?.nama_alat}
                  </td>
                  <td className="whitespace-nowrap text-center px-6 py-4">
                    {service?.kondisi}
                  </td>
                  <td className="whitespace-nowrap text-center px-6 py-4">
                    {service?.deskripsi}
                  </td>
                  <td className="whitespace-nowrap text-center px-6 py-4">
                    {service?.services[0]?.jenis_service}
                  </td>
                  <td className="whitespace-nowrap text-center px-6 py-4">
                    {service?.services[0]?.waktu}
                  </td>

                  <td className="whitespace-nowrap text-center px-6 py-4">
                    <button
                      onClick={() => {
                        APIBatalkanService(
                          service?.id,
                          service?.services[0]?.id,
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
                        APISelesaiService(
                          service?.id,
                          service?.services[0]?.id,
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
          </div>
        </>
      ) : (
        <h2 className="text-xl pt-5 text-center text-gray-900 sm:pr-12 font-mono uppercase ">
          tidak ada alat yang sedang di service
        </h2>
      )}
    </div>
  );
};
const ServicePage = () => {
  const { token } = useToken();
  const navigate = useNavigate();
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
        <GetDataService />
      </div>
    </div>
  );
};

export default ServicePage;
