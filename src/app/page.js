"use client";
import Loader from "@/components/loader";
import { useState } from "react";

export default function Home() {
  const files = [
    {
      name: "420-Jerome-Avenue-PENDING-.pdf",
      id: "asst_ty2q2wM52LBUuTB0vcDBLTEz",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState(null);
  const [asst, setAsst] = useState(files[0].id);

  const handleSubmit = async () => {
    if (query.length) {
      setLoading(true);
      try {
        const res = await fetch(`/api/openai?assistant=${asst}`, {
          method: "POST",
          body: JSON.stringify({ query }),
        });
        const { message } = await res.json();
        setMessage(message);
        setM;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen h-fit container mx-auto flex justify-center">
      <div className="flex flex-col max-w-[700px] w-full mt-20 gap-3 p-4">
        <label>Select file</label>
        <select
          onChange={(e) => setAsst(e.target.value)}
          value={asst}
          className="w-full outline-none border border-gray-300 py-3 px-6 rounded-xl"
        >
          {files.map((element, index) => (
            <option value={element.id} key={index}>
              {element.name}
            </option>
          ))}
        </select>
        <label className="mb-2">Your message...</label>
        <div className="w-full relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full outline-none border border-gray-300 py-3 px-6 rounded-xl"
          />
          {loading && Boolean(query.length) ? (
            <Loader />
          ) : (
            <button
              onClick={handleSubmit}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-white rounded-xl py-2 px-5 bg-blue-400"
            >
              Enter
            </button>
          )}
        </div>
        {message && (
          <div className="mt-4">
            <h4 className="font-semibold">Response</h4>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
