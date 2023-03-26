"use client";
import React, { useMemo, useEffect, useState } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import { useFormik } from "formik";
import * as yup from "yup";

const LeaderData: GroupLeader = {
  firstName: "John",
  lastName: "Doe",
  email: "test@gmail.com",
  phone: "1234567890",
  country: "US",
  birthDate: "2000-11-11",
  isGroupLeader: true,
  id: "1234567890",
  groupId: "1",
};

const FormSchema = yup.object().shape({
  firstName: yup.string().required("* First name is required"),
  // lastName: yup.string().required("Last name is required"),
  country: yup.string().required("* Country is required"),
  // occupation: yup.string().required("* Occupation is required"),
});

interface LeaderFormProps {
  leaderData: GroupLeader;
}

const LeaderForm = (): JSX.Element => {
  const [leaderData, setLeaderData] = useState<GroupLeader>(LeaderData);
  const countryOptions = useMemo(() => countryList().getData(), []);
  const options = useMemo(() => countryList().getData(), []);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const occupationOptions = useMemo(
    () => [
      { value: "student", label: "Student" },
      { value: "working", label: "Working Professional" },
    ],
    []
  );

  useEffect(() => {
    setLeaderData(LeaderData);
  }, []);

  const formik = useFormik({
    initialValues: {
      ...LeaderData,
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      //reset form
      formik.resetForm();
    },
  });
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Group Leader Information
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              This information can be updated at any time.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={formik.handleSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      autoComplete="given-name"
                      className="px-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={!isEditMode}
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      autoComplete="family-name"
                      className="px-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email-address"
                      autoComplete="email"
                      className="px-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <Select
                      id="country"
                      name="country"
                      options={options}
                      instanceId="react-select-3-live-region"
                      isDisabled={!isEditMode}
                      value={countryOptions.find(
                        (country) => country.value === formik.values.country
                      )}
                      onChange={(value) => {
                        formik.setFieldValue("country", value?.value || "");
                      }}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="birthDate"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Birthdate
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      id="birthDate"
                      autoComplete="bday"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5"
                      value={formik.values.birthDate}
                      onChange={formik.handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                {isEditMode ? (
                  <div className="flex gap-3 justify-center md:justify-end">
                    {" "}
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditMode(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center md:justify-end">
                    {" "}
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditMode(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaderForm;
