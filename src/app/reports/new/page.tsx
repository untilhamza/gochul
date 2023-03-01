"use client";
import React, { useState, useRef, useEffect } from "react";

const ReportSubmission: React.FC = () => {
  const [membersPresent, setMembersPresent] = useState<any>([]);
  const [eventsActivities, setEventsActivities] = useState<string>("");
  const [online, setOnline] = useState<boolean>(false);
  const [prayerRequests, setPrayerRequests] = useState<string>("");

  const handleInputPrayerRequests = (e: any) => {
    setPrayerRequests(e.target.value);
  };

  const handleInputEventsActivities = (e: any) => {
    setEventsActivities(e.target.value);
  };

  const handleMembersPresent = (checkedValues: any) => {
    console.log("checked = ", checkedValues);
    setMembersPresent(checkedValues);
  };

  const options = [
    { label: "Leader", value: "Leader" },
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
    { label: "Banana", value: "Banana" },
    { label: "Mango", value: "Mango" },
    { label: "Pineapple", value: "Pineapple" },
    { label: "Strawberry", value: "Strawberry" },
  ];

  const onFinish = (values: any) => {
    console.log("Report submitted: ", values);
  };

  return (
    <form
      onSubmit={onFinish}
      className="shadow-md rounded-md max-w-[936px] mx-auto overflow-hidden p-3 bg-white px-6"
    >
      <div className="mb-5 items-center md:grid grid-rows-2 md:grid-rows-1 md:grid-cols-8">
        <div className="col-span-2 text-gray-800 font-semibold">
          Members Present :
        </div>
        <div className="col-span-6 md:grid grid-cols-3 gap-4">
          {options.map((option) => {
            return (
              <div
                key={option.value}
                className="md:col-span-1 grid grid-cols-4 p-2 items-center"
              >
                <label htmlFor={option.value} className="col-span-2">
                  {option.label}
                </label>
                <input
                  className="col-span-2"
                  id={option.value}
                  type="checkbox"
                  name={option.value}
                  value={option.value}
                  checked={membersPresent.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setMembersPresent([...membersPresent, e.target.value]);
                    } else {
                      setMembersPresent(
                        membersPresent.filter(
                          (member: string) => member !== e.target.value
                        )
                      );
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-5 items-center md:grid grid-rows-2 md:grid-rows-1 md:grid-cols-8">
        <label className="md:col-span-2 text-start font-semibold">
          Events / Activities:
        </label>
        <textarea
          className={`border px-3 py-4 shadow-md rounded-md box-border focus:outline-none focus:outline-blue-300 md:col-span-6 text-sm resize-none w-full md:max-w-[600px]`}
          placeholder="Events / Activities"
          onInput={(e) => {
            //@ts-ignore}
            setEventsActivities(e.target.value);
          }}
          value={eventsActivities}
        />
      </div>

      <div className="mb-5 items-center md:grid grid-rows-2 md:grid-rows-1 md:grid-cols-8">
        <div className="md:col-span-2 text-start font-semibold">Location :</div>
        <div className="md:col-span-2 flex items-center space-x-2 md:justify-between">
          <div className="flex items-center space-x-3">
            <label htmlFor="online">Online</label>
            <input
              id="online"
              type="radio"
              name="location"
              value="online"
              checked={online}
              onChange={(e) => setOnline(true)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <label htmlFor="offline">Offline</label>
            <input
              id="offline"
              type="radio"
              name="location"
              value="offline"
              checked={!online}
              onChange={(e) => setOnline(false)}
            />
          </div>
        </div>
      </div>

      <div className="mb-5 items-center md:grid grid-rows-2 md:grid-rows-1 md:grid-cols-8">
        <label className="md:col-span-2 text-start font-semibold">
          Prayer Requests:
        </label>
        <textarea
          className={`border px-3 py-4 shadow-md rounded-md box-border focus:outline-none focus:outline-blue-300 md:col-span-6 text-sm resize-none w-full md:max-w-[600px]`}
          placeholder="Prayer Requests"
          onInput={handleInputPrayerRequests}
          value={prayerRequests}
        />
      </div>

      <div>
        <div className="flex p-2 space-x-3 justify-center justify-lg-end">
          <button
            type="submit"
            className="border px-3 py-2 shadow-sm rounded-md bg-blue-500 hover:bg-white text-white hover:text-blue-500 hover:border border-blue-500 font-bold"
          >
            Submit
          </button>
          <button
            type="button"
            className="border px-3 py-2 shadow-sm rounded-md text-red-500 border-red-500 hover:bg-red-500 hover:text-white font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReportSubmission;
