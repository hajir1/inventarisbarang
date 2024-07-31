import React, { useEffect, useState } from "react";
import Dashboard from "../component/fragment/Dashboard";
import Navbar from "../component/fragment/Navbar";
import {
  APIGetAlat,
  APIGetAlatByName,
  APIHapusAlat,
  APIHapusAlatById,
  APILogin,
  APITambahPakai,
  APITambahService,
} from "../services/API_CALL.service";
import { useDashboard, useToken } from "../state/zustand";
import { AlertGagal, AlertSukses } from "../component/element/Alert";
import { useFormik } from "formik";
import { Search } from "../component/fragment/Search";
import { CardAlat } from "../component/element/Card";
import Input from "../component/element/Input";
import Overlay from "../component/fragment/Overlay";
import { useNavigate } from "react-router-dom";
import { currentDate } from "../libs/Waktu";

const GetDataMobil = () => {
  const [alats, setAlats] = useState([]);
  const { dashboard } = useDashboard();
  const { token } = useToken();
  const [searchAlats, setSearchAlats] = useState("");
  const [alatsByName, setAlatsByName] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [pakaiById, setPakaiById] = useState(null);
  const [serviceById, setServiceById] = useState(null);
  const [hapusById, setHapusById] = useState(null);
  const [hapus, setHapus] = useState(false);
  const [suksesPakai, setSuksesPakai] = useState(false);
  const [suksesService, setSuksesService] = useState(false);
  useEffect(() => {
    APIGetAlat((cb) => {
      setAlats(cb?.data?.data);
    });
  }, []);

  useEffect(() => {
    if (searchAlats !== "") {
      APIGetAlatByName(searchAlats, (cb) => {
        if (cb?.data?.data) {
          setAlatsByName(cb?.data?.data);
        } else {
          setAlatsByName([]);
        }
      });
    } else {
      setAlatsByName([]);
    }
  }, [searchAlats]);
  const handleDeleteById = (e, id) => {
    e.preventDefault();
    const dataId = alats.find((item) => item.id === id);
    setHapusById(dataId.id);
  };

  const formik = useFormik({
    initialValues: {
      username: "admin",
      password: "",
    },
    onSubmit: (value) => {
      APILogin(value, (cb) => {
        if (cb.status === 200) {
          APIHapusAlat(cb?.data?.accessToken, (cb) => {
            if (cb.status === 200) {
              window.location.reload();
            } else {
              alert(
                "hapus seluruh data riwayat pakai atau service terlebih dahulu"
              );
              window.location.reload();
            }
          });
        } else {
          alert("password salah");
          window.location.reload();
        }
      });
    },
  });
  const handlePakaiById = (e, id) => {
    const dataId = alats.find((item) => item.id === id);
    setPakaiById(dataId.id);
    formikPakai.setFieldValue("alat_id", id);
  };

  const formikPakai = useFormik({
    initialValues: {
      waktu_pinjam: "",
      nama_pemakai: ``,
      deskripsi: "",
      alat_id: "",
    },
    onSubmit: (value) => {
      APITambahPakai(value, (cb) => {
        if (cb?.status === 200) {
          setPakaiById(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
          setSuksesPakai(true);
        } else {
          value.alat_id = ""
          value.jenis_service= ""
          value.waktu= ""
          if (cb?.response?.data?.message !== "") {
            setErrorMessage(cb?.response?.data?.message);
          } else {
            setErrorMessage(cb?.message);
          }
        }
      });
    },
  });
  const formikService = useFormik({
    initialValues: {
      jenis_service: ``,
      alat_id: ``,
      waktu: "",
    },
    onSubmit: (value) => {
      APITambahService(value, (cb) => {
        if (cb?.status === 200) {
          setServiceById(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
          setSuksesService(true);
        } else {
          value.alat_id = ""
          value.jenis_service= ""
          value.waktu= ""
          if (cb?.response?.data?.message !== "") {
            setErrorMessage(cb?.response?.data?.message);
          } else {
            setErrorMessage(cb?.message);
          }
        }
      });
    },
  });
  const handleServiceById = (e, id) => {
    const dataId = alats.find((item) => item.id === id);
    setServiceById(dataId.id);

    formikService.setFieldValue("alat_id", id);
  };

  return (
    <div className={`${dashboard ? "w-4/5 p-1" : "w-full"} relative`}>
      {alats?.length < 1 && (
        <h2 className="text-xl pt-5 text-center text-gray-900 sm:pr-12 font-mono uppercase ">
          tidak ada alat
        </h2>
      )}
      {alats?.length > 1 && (
        <h1 className="text-base italic text-red-600 text-right mr-10">
          jika alat mempunyai riwayat service atau dipakai tidak bisa dihapus
        </h1>
      )}
      <div className="w-full flex justify-center absolute">
        {suksesPakai ? (
          <AlertSukses
            handleClose={() => {
              setSuksesPakai(!suksesPakai);
            }}
            title={"sukses menambah data pinjaman"}
            quote={"silahkan cek di halaman alat dipakai"}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="w-full flex justify-center absolute">
        {suksesService ? (
          <AlertSukses
            handleClose={() => {
              setSuksesService(!suksesService);
              
            }}
            title={"sukses menambah data service"}
            quote={"silahkan cek di halaman alat service"}
          />
        ) : (
          <></>
        )}
      </div>
      {hapus && (
        <AlertGagal
          type={"hard"}
          height={"h-64"}
          handleDelete={formik.handleSubmit}
          handleClose={() => setHapus(false)}
          quote={"apakah anda yakin ingin menghapus seluruh data"}
        >
          <form>
            {" "}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline my-2"
              id="password"
              type="password"
              placeholder="masukkan password"
              {...formik.getFieldProps("password")}
            />
          </form>
        </AlertGagal>
      )}
      <Search
        btnClick={() => setHapus(true)}
        changeInput={(e) => setSearchAlats(e.target.value)}
        valueInput={searchAlats}
        classFormat={alats}
      />
      <div className="w-full flex  mt-6 gap-x-6 gap-y-10 flex-wrap justify-center">
        {alatsByName?.length > 0
          ? alatsByName?.map((alat) => (
              <div
                key={alat?.id}
                className={`${
                  dashboard ? "md:w-[30%]" : "w-[45%] lg:w-[30%]"
                } relative`}
              >
                {hapusById === alat?.id && (
                  <AlertGagal
                    handleClose={() => setHapusById(null)}
                    height={"h-40"}
                    quote={`apakah anda yakin ingin menghapus alat ${alat?.nama_alat}`}
                    handleDelete={(e) => {
                      APIHapusAlatById(alat?.id, (cb) => {
                        if (cb?.status === 200) {
                          window.location.reload();
                        }
                      });
                    }}
                  />
                )}
                {pakaiById === alat?.id && (
                  <Overlay
                    close={() => {setErrorMessage(""),setPakaiById(null)}}
                    errorMessage={""}
                    handleSubmit={formikPakai.handleSubmit}
                    title={`pinjam alat ${alat?.nama_alat}`}
                  >
                    <p className="text-red-600 text-sm italic">
                      {alat?.dipakai ? "alat sedang di pakai" : ""}
                    </p>
                    <p className="text-red-600 text-sm italic">
                      {alat?.service ? "alat sedang di service" : ""}
                    </p>
                    <input
                      onChange={formikPakai.handleChange}
                      type="text"
                      placeholder="nama pemakai"
                      name="nama_pemakai"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 pl-2 mt-2"
                    />

                    <Input
                      formik={formikPakai}
                      formikName={"waktu_pinjam"}
                      inputType={"date"}
                    />

                    <div className="col-span-full">
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
                          {...formikPakai.getFieldProps("deskripsi")}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none pl-4 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>
                    </div>
                    <p className="text-red-600 text-sm italic text-center">
                      {errorMessage}
                    </p>
                  </Overlay>
                )}
                {serviceById === alat?.id && (
                  <Overlay
                    close={() => {setErrorMessage(""),setServiceById(null)}}
                    errorMessage={""}
                    handleSubmit={formikService.handleSubmit}
                    title={`service alat ${alat?.nama_alat}`}
                  >
                    <p className="text-red-600 text-sm italic">
                      {alat?.dipakai ? "alat sedang di pakai" : ""}
                    </p>
                    <p className="text-red-600 text-sm italic">
                      {alat?.service ? "alat sedang di service" : ""}
                    </p>

                    <Input
                      formik={formikService}
                      formikName={"jenis_service"}
                      inputType={"text"}
                      inputPlaceholder={`jenis service`}
                    />
                    <Input
                      formik={formikService}
                      formikName={"waktu"}
                      inputType={"date"}
                    />

                    <p className="text-red-600 text-sm italic text-center">
                      {errorMessage}
                    </p>
                  </Overlay>
                )}
                <CardAlat
                  data={alat}
                  handlePakaiByOd={handlePakaiById}
                  handleDeleteById={handleDeleteById}
                  handleServiceById={handleServiceById}
                />
              </div>
            ))
          : alats?.map((alat) => (
              <div
                key={alat?.id}
                className={`${
                  dashboard ? "md:w-[30%]" : "w-[45%] lg:w-[30%]"
                } relative`}
              >
                {hapusById === alat?.id && (
                  <AlertGagal
                    handleClose={() => setHapusById(null)}
                    height={"h-40"}
                    quote={`apakah anda yakin ingin menghapus alat ${alat?.nama_alat}`}
                    handleDelete={(e) => {
                      APIHapusAlatById(alat?.id, (cb) => {
                        if (cb?.status === 200) {
                          window.location.reload();
                        }
                      });
                    }}
                  />
                )}
                {pakaiById === alat?.id && (
                  <Overlay
                    close={() => setPakaiById(null)}
                    errorMessage={""}
                    handleSubmit={formikPakai.handleSubmit}
                    title={`pinjam alat ${alat?.nama_alat}`}
                  >
                    <p className="text-red-600 text-sm italic">
                      {alat?.dipakai ? "alat sedang di pakai" : ""}
                    </p>
                    <p className="text-red-600 text-sm italic">
                      {alat?.service ? "alat sedang di service" : ""}
                    </p>

                    <Input
                      formik={formikPakai}
                      formikName={"nama_pemakai"}
                      inputType={"text"}
                      inputPlaceholder={`nama pemakai`}
                    />
                    <Input
                      formik={formikPakai}
                      formikName={"waktu_pinjam"}
                      inputType={"date"}
                    />

                    <div className="col-span-full">
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
                          {...formikPakai.getFieldProps("deskripsi")}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none pl-4 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>
                    </div>
                    <p className="text-red-600 text-sm italic text-center">
                      {errorMessage}
                    </p>
                  </Overlay>
                )}
                {serviceById === alat?.id && (
                  <Overlay
                    close={() => setServiceById(null)}
                    errorMessage={""}
                    handleSubmit={formikService.handleSubmit}
                    title={`service alat ${alat?.nama_alat}`}
                  >
                    <p className="text-red-600 text-sm italic">
                      {alat?.dipakai ? "alat sedang di pakai" : ""}
                    </p>
                    <p className="text-red-600 text-sm italic">
                      {alat?.service ? "alat sedang di service" : ""}
                    </p>

                    <Input
                      formik={formikService}
                      formikName={"jenis_service"}
                      inputType={"text"}
                      inputPlaceholder={`jenis service`}
                    />
                    <Input
                      formik={formikService}
                      formikName={"waktu"}
                      inputType={"date"}
                    />

                    <p className="text-red-600 text-sm italic text-center">
                      {errorMessage}
                    </p>
                  </Overlay>
                )}
                <CardAlat
                  data={alat}
                  handlePakaiByOd={handlePakaiById}
                  handleDeleteById={handleDeleteById}
                  handleServiceById={handleServiceById}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

const LihaAlatPage = () => {
  const { token } = useToken();
  const navigate = useNavigate();
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
        <GetDataMobil />
      </div>
    </div>
  );
};

export default LihaAlatPage;
