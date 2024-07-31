import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";

import { useDashboard, useToken } from "../state/zustand";
import { ButtonCard } from "../component/element/Button";
import { useFormik } from "formik";
import { AlertSukses } from "../component/element/Alert";
import { Table } from "../component/element/Table";
import Input from "../component/element/Input";
import Overlay from "../component/fragment/Overlay";
import { currentDate } from "../libs/Waktu";
import {
  APIGetAlatExtra,
  APIHapusRiwayatPakai,
  APIHapusRiwayatService,
} from "../services/API_CALL.service";
import { ErrorMessage } from "../component/element/Message";

const GetAlatById = () => {
  const { id } = useParams();
  const { dashboard } = useDashboard();
  const [alats, setAlats] = useState([]);
  const { token } = useToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [sukses, setSukses] = useState(false);
  const [service, setService] = useState(false);
  useEffect(() => {
    APIGetAlatExtra(id, (cb) =>{ setAlats(cb?.data?.data), console.log(cb)});
  }, []);
 
  

  const exportToExcel = (tableID, filename = "") => {
    let downloadurl;
    let dataFileType = "application/vnd.ms-excel";
    let tableSelect = document.getElementById(tableID);
    let tableHTMLData = tableSelect.outerHTML.replace(/ /g, "%20");

    filename = filename ? filename + ".xls" : "export_excel_data.xls";

    downloadurl = document.createElement("a");

    document.body.appendChild(downloadurl);

    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob(["\ufeff", tableHTMLData], {
        type: dataFileType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadurl.href = "data:" + dataFileType + ", " + tableHTMLData;

      downloadurl.download = filename;

      downloadurl.click();
    }
  };
  return (
    <div
      className={`${
        dashboard ? "w-4/5" : "w-full"
      } relative flex justify-center mt-4`}
    >
      <div className="w-full flex justify-center absolute p-1">
        {sukses ? (
          <AlertSukses
            handleClose={() => {
              setSukses(!sukses);
              window.location.reload();
            }}
            title={"sukses menambah data"}
            quote={"sukses memambahkan data service kendaraan"}
          />
        ) : (
          <></>
        )}
      </div>
      {alats
        ? alats?.map((data) => (
            <div key={data?.id} className="flex flex-col items-center w-[95%]">
              {service ? (
                <Overlay
                  close={() => setService(!service)}
                  errorMessage={errorMessage}
                  title={"tambahkan service"}
                  handleSubmit={formik.handleSubmit}
                >
                  {" "}
                  <Input
                    formik={formik}
                    formikName={"jenis_service"}
                    inputPlaceholder={"jenis service"}
                    inputType={"text"}
                  />
                  <Input
                    formik={formik}
                    formikName={"biaya"}
                    inputPlaceholder={"biaya"}
                    inputType={"number"}
                  />
                  <Input
                    formik={formik}
                    formikName={"waktu"}
                    inputType={"date"}
                  />
                </Overlay>
              ) : (
                ""
              )}

              <div className="aspect-h-1 aspect-w-1 w-3/5 grid place-content-center overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-96 p-4">
                <img
                  src={`${data?.url}`}
                  className="h-full w-full object-cover object-center lg:h-96 lg:w-96"
                />
              </div>
              <div className="w-full py-2">
                <h1 className="font-semibold text-slate-900 text-2xl tracking-wider uppercase pt-4">
                  {data?.nama_alat}
                </h1>
                <p className="text-slate-800 lg:py-2">
                  kondisi alat saat ini {data?.kondisi} , sedang&nbsp;
                  <span
                    className={`${
                      data?.dipakai ? "text-red-600" : "text-slate-600"
                    } font-bold `}
                  >
                    {data?.dipakai ? " dipakai" : "tidak dipakai"}
                  </span>
                  &nbsp;dan sedang&nbsp;
                  <span
                    className={`${
                      data?.dipakai ? "text-red-600" : "text-slate-600"
                    } font-bold `}
                  >
                    {data?.service ? " diservice" : "tidak diservice"}
                  </span>
                  &nbsp;dan diperoleh dari&nbsp;
                  <span
                    className={`${
                      data?.dipakai ? "text-red-600" : "text-slate-600"
                    } font-bold `}
                  >
                     {data.diperoleh}
                  </span>
                </p>
            
                {data?.dipakais.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <p className="text-center mt-4 text-red-500 text-md mb-10">
                          jika alat mempunyai riwayat pernah digunakan , maka
                          alat tidak bisa dihapus
                        </p>
                        <div className="overflow-hidden">
                          <Table
                            tableId={"riwayatPakai-table"}
                            th1={"id pakai"}
                            th2={"nama peminjam"}
                          >
                            {data?.dipakais?.map((pakai) => (
                              <tr
                                key={pakai?.id}
                                className="border-b border-neutral-200 dark:border-white/10"
                              >
                                <td className="whitespace-nowrap text-center px-6 py-4 font-medium">
                                  {pakai?.id}
                                </td>
                                <td className="whitespace-nowrap text-center px-6 py-4">
                                  {pakai?.nama_pemakai}
                                </td>
                                <td className="whitespace-nowrap text-center px-6 py-4">
                                  {pakai?.waktu_pinjam}
                                </td>
                                <td className="whitespace-nowrap text-center px-6 py-4">
                                  {pakai?.waktu_selesai}
                                </td>
                                <td
                                  onClick={() =>
                                    APIHapusRiwayatPakai(pakai?.id, (cb) => {
                                      if (cb.status === 200) {
                                        window.location.reload();
                                      }
                                    })
                                  }
                                  className="whitespace-nowrap text-center px-6 py-4 cursor-pointer"
                                >
                                  hapus
                                </td>
                              </tr>
                            ))}
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <h1 className="text-red-600 italic">
                    alat ini belum pernah di pakai sama sekali
                  </h1>
                )}
                <div
                  className={`${
                    data?.dipakais.length > 0 ? "" : "hidden"
                  } w-full flex justify-center`}
                >
                  <button
                    type="submit"
                    onClick={() => exportToExcel("riwayatPakai-table")}
                    className="rounded-md bg-indigo-600 px-3 text-sm uppercase text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-10  tracking-wider w-3/4 lg:w-2/6 py-2.5"
                  >
                    Export riwayat pemakaian to excel
                  </button>
                </div>

                {data?.services.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <p className="text-center mt-4 text-red-500 text-md mb-10">
                          jika alat mempunyai riwayat pernah di service , maka
                          alat tidak bisa dihapus
                        </p>
                        <div className="overflow-hidden">
                          <Table
                            tableId={"riwayatService-table"}
                            th1={"id service"}
                            th2={"jenis service"}
                          >
                            {data?.services?.map((service) => (
                              <tr
                                key={service?.id}
                                className="border-b border-neutral-200 dark:border-white/10"
                              >
                                <td className="whitespace-nowrap text-center px-6 py-4 font-medium">
                                  {service?.id}
                                </td>
                                <td className="whitespace-nowrap text-center px-6 py-4">
                                  {service?.jenis_service}
                                </td>
                                <td className="whitespace-nowrap text-center px-6 py-4">
                                  {service?.waktu}
                                </td>
                                <td className="whitespace-nowrap text-center px-6 py-4">
                                  {service?.waktu_selesai}
                                </td>
                                <td
                                  onClick={() =>
                                    APIHapusRiwayatService(service?.id, (cb) => {
                                      if (cb.status === 200) {
                                        window.location.reload();
                                      }
                                    })
                                  }
                                  className="whitespace-nowrap text-center px-6 py-4 cursor-pointer"
                                >
                                  hapus
                                </td>
                              </tr>
                            ))}
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <h1 className="text-red-600 italic">
                    alat ini belum pernah di service sama sekali
                  </h1>
                )}
                  <div
                  className={`${
                    data?.services.length > 0 ? "" : "hidden"
                  } w-full flex justify-center`}
                >
                  <button
                    type="submit"
                    onClick={() => exportToExcel("riwayatService-table")}
                    className="rounded-md bg-indigo-600 px-3 text-sm uppercase text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-10  tracking-wider w-3/4 lg:w-2/6 py-2.5"
                  >
                    Export data service to excel
                  </button>
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

const DetailAlatPage = () => {
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
        <GetAlatById />
      </div>
    </div>
  );
};

export default DetailAlatPage;
