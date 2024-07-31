export const Search = ({ classFormat, valueInput, changeInput, btnClick }) => {
  return (
    <div
      className={`${
        classFormat.length < 1 && "hidden"
      } pt-2 relative mx-auto text-gray-600 lg:w-4/5 flex justify-between p-1`}
    >
      <input
        className="block pl-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 placeholder:tracking-widest w-3/5 outline-none mt-16   sm:text-sm sm:leading-6"
        type="text"
        value={valueInput}
        onChange={changeInput}
        name="search"
        placeholder="Cari Alat"
      />
      <button
        type="submit"
        onClick={btnClick}
        className="rounded-md bg-red-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-[33%] lg:w-1/5 h-10"
      >
        hapus semua
      </button>
    </div>
  );
};
