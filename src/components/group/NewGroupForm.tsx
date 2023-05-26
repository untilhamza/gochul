"use client";
import React, { useMemo } from "react";
import Select from "react-select";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const FormSchema = yup.object().shape({
  district: yup.string().required("* District is required"),
});

const NewGroupForm = () => {
  const router = useRouter();
  const districtOptions = useMemo(
    () => [
      { value: "college", label: "College" },
      { value: "working", label: "Working Professional" },
      { value: "family", label: "Family" },
    ],
    []
  );
  const formik = useFormik({
    initialValues: {
      district: "",
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
              Group Information
            </h3>
            <p className="md:mt-1 text-sm text-gray-600">
              Please enter your group&apos;s information. It can be edited
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
                      htmlFor="district"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Group District
                    </label>
                    <Select
                      id="district"
                      name="district"
                      options={districtOptions}
                      instanceId="react-select-3-live-region"
                      value={districtOptions.find(
                        (item) => item.value === formik.values.district
                      )}
                      onChange={(value) => {
                        formik.setFieldValue("district", value?.value || "");
                      }}
                    />
                    {formik.touched.district && formik.errors.district && (
                      <p className="text-red-500 text-sm leading-6 font-medium">
                        {formik.errors.district}
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
                  Create
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  onClick={() => router.push("leader/members")}
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

export default NewGroupForm;
