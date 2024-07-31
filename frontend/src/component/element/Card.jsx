import { useNavigate } from "react-router-dom";
import { ButtonCard } from "./Button";

export const CardAlat = ({
  data,
  handleDeleteById,
  handlePakaiByOd,
  handleServiceById,
}) => {
  const navigate = useNavigate();
  return (
    <div className="group relative p-1 border border-slate-300 shadow-lg">
      <h2 className="text-xl p-3 text-gray-900 sm:pr-12 font-mono uppercase ">
        {data?.nama_alat} {data?.no_seri}
      </h2>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={`${data?.url}`}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex flex-col">
        <div className="w-full flex justify-between">
          <p
            className={`${
              data?.service ? "text-red-700" : "text-gray-800"
            } mt-1 text-sm`}
          >
            {data?.service ? "sedang service" : "tidak sedang di service"}
          </p>

          <p
            className={`${
              data?.dipakai ? "text-red-700" : "text-gray-800"
            } mt-1 text-sm`}
          >
            {data?.dipakai ? "sedang dipakai" : "tidak sedang di pakai"}
          </p>
        </div>
        <p className="text-sm text-black font-mono mt-8">
          kondisi saat ini {data?.kondisi}
        </p>
        <p className="text-sm text-gray-800 font-mono">
          jumlah saat ini ada {data?.jumlah}
        </p>
      </div>
      <div className="mt-4 flex flex-col z-10 gap-y-1 lg:flex-row lg:justify-evenly relative flex-wrap">
        <ButtonCard
          model={"detail"}
          handleClick={() => navigate(`/lihatalat/${data?.id}`)}
        />

        <ButtonCard
          model={"pakai"}
          handleClick={(e) => handlePakaiByOd(e, data?.id)}
        />
        <ButtonCard
          model={"service"}
          handleClick={(e) => {
            handleServiceById(e, data?.id);
          }}
        />
        <ButtonCard
          model={"hapus"}
          handleClick={(e) => {
            handleDeleteById(e, data?.id);
          }}
        />
      </div>
    </div>
  );
};
