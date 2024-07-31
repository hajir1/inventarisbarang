import React, { useEffect, useState } from "react";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";
import { useFormik } from "formik";
import { AlertSukses } from "../component/element/Alert";
import { useDashboard, useToken } from "../state/zustand";
import { ErrorMessage } from "../component/element/Message";
import IconGambar from "../component/element/Icon/IconGambar";
import { useNavigate } from "react-router-dom";
import { currentDate } from "../libs/Waktu";
import { APITambahAlat } from "../services/API_CALL.service";

const PostDataAlat = () => {
  const [file, setFile] = useState(null);
  const { dashboard } = useDashboard();
  const { token } = useToken();
  const [sukses, setSukses] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleImageChange = (e) => {
    const files = e.target.files[0];
    if (files) {
      setFile(files);
    }
  };
  const formik = useFormik({
    initialValues: {
      nama_alat: "",
      kondisi: "tidak rusak",
      deskripsi: "",
      jumlah: 0,
      diperoleh: "",
      no_seri: "",
    },
    onSubmit: (value) => {
      const form = new FormData();
      form.append("file", file);
      form.append("nama_alat", value.nama_alat);
      form.append("kondisi", value.kondisi);
      form.append("deskripsi", value.deskripsi);
      form.append("jumlah", value.jumlah);
      form.append("diperoleh", value.diperoleh);
      form.append("no_seri", value.no_seri);
      APITambahAlat(form, (cb) => {
        if (cb?.status === 200) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setSukses(true);
          value.nama_alat = "";
          setFile(null);
          value.kondisi = "";
          value.deskripsi = "";
          setErrorMessage("");
        } else {
          setErrorMessage(cb?.response?.data?.message);
        }
      });
    },
  });
  return (
    <div className={`w-full flex justify-center p-2 `}>
      <div className=" flex justify-center absolute p-2">
        {sukses ? (
          <AlertSukses
            handleClose={() => setSukses(!sukses)}
            title={"sukses menambah data"}
            quote={"silahkan cek lihat alat untuk memastikan"}
          />
        ) : (
          <></>
        )}
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className={`${dashboard ? "w-4/5" : "w-full"} lg:w-4/5 `}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10">
            <h2 className="text-xl pt-5 text-gray-900 sm:pr-12 font-mono uppercase ">
              Tambahkan Alat
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div className="">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 border-none outline-none sm:max-w-md">
                    <input
                      type="text"
                      id="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 placeholder:tracking-wider"
                      placeholder="nama alat"
                      {...formik.getFieldProps("nama_alat")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  photo alat
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="flex justify-center">
                      {" "}
                      {file ? (
                        <img
                          className="w-44 h-44"
                          src={URL.createObjectURL(file)}
                          alt=""
                        />
                      ) : (
                        <IconGambar />
                      )}
                    </div>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={(e) => handleImageChange(e)}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="text-xl pt-5 text-gray-900 sm:pr-12 font-mono uppercase ">
              Informasi Lengkap
            </h2>

            <div className="sm:col-span-3 mt-10">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Kondisi Alat
              </label>
              <div className="mt-2">
                <select
                  {...formik.getFieldProps("kondisi")}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset outline-none sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={`tidak rusak`}>Tidak Rusak</option>
                  <option value={`rusak`}>Rusak</option>
                </select>
              </div>
            </div>
            <div className="flex justify-evenly gap-2 w-full">
              {" "}
              <div className="sm:col-span-2 mt-10">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  jumlah
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="masukkan jumlah"
                    {...formik.getFieldProps("jumlah")}
                    autoComplete="jumlah"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  outline-none pl-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 mt-10">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  no seri
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="masukkan nomor seri"
                    {...formik.getFieldProps("no_seri")}
                    autoComplete="no seri"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  outline-none pl-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 mt-10">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  diberikan oleh
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="alat diberi oleh"
                    {...formik.getFieldProps("diperoleh")}
                    autoComplete="no seri"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  outline-none pl-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="deskripsi"
                className="block text-sm font-medium mt-4 leading-6 text-gray-900"
              >
                Deskripsi
              </label>
              <div className="mt-2">
                <textarea
                  id="deskripsi"
                  rows="3"
                  {...formik.getFieldProps("deskripsi")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none pl-2 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  tracking-wider w-3/4 lg:w-1/4"
            >
              simpan
            </button>
          </div>
          <div className="w-full relative flex justify-center">
            <ErrorMessage message={errorMessage} />
          </div>
        </div>
      </form>
    </div>
  );
};

const TambahAlatPage = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full flex">
        <Dashboard />
        <PostDataAlat />
      </div>
    </div>
  );
};

export default TambahAlatPage;
