"use client";
import React, { useMemo } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const FormSchema = yup.object().shape({
  firstName: yup.string().required("* First name is required"),
  // lastName: yup.string().required("Last name is required"),
  country: yup.string().required("* Country is required"),
  // occupation: yup.string().required("* Occupation is required"),
});

const NewMemberForm = () => {
  const router = useRouter();
  const countryOptions = useMemo(() => countryList().getData(), []);
  const occupationOptions = useMemo(
    () => [
      { value: "student", label: "Student" },
      { value: "working", label: "Working Professional" },
    ],
    []
  );
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      occupation: "",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      //reset form
      formik.resetForm();
    },
  });
  return (
    <div className="mt-10 sm:mt-0 ">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Member Information
            </h3>
            <p className="md:mt-1 text-sm text-gray-600">
              Please enter a new member&apos;s information. It can be edited
              later.
            </p>
          </div>
        </div>
        <div className="md:mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={formik.handleSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6 md:h-[230px]">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      autoComplete="given-name"
                      className="px-2 md:mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="text-red-500 text-sm leading-6 font-medium">
                        {formik.errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      autoComplete="family-name"
                      className="px-2 mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="text-red-500 text-sm leading-6 font-medium">
                        {formik.errors.lastName}
                      </p>
                    )}
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
                      options={countryOptions}
                      instanceId="react-select-3-live-region"
                      value={countryOptions.find(
                        (country) => country.value === formik.values.country
                      )}
                      onChange={(value) => {
                        formik.setFieldValue("country", value?.value || "");
                      }}
                    />
                    {formik.touched.country && formik.errors.country && (
                      <p className="text-red-500 text-sm leading-6 font-medium">
                        {formik.errors.country}
                      </p>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="occupation"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Occupation
                    </label>
                    <Select
                      id="occupation"
                      name="occupation"
                      options={occupationOptions}
                      instanceId="react-select-3-live-region"
                      value={occupationOptions.find(
                        (item) => item.value === formik.values.occupation
                      )}
                      onChange={(value) => {
                        formik.setFieldValue("occupation", value?.value || "");
                      }}
                    />
                    {formik.touched.occupation && formik.errors.occupation && (
                      <p className="text-red-500 text-sm leading-6 font-medium">
                        {formik.errors.occupation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-end gap-2 mt-5">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  onClick={() => router.push("/members")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMemberForm;
