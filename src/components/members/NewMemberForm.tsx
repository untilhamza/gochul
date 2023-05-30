"use client";
import React, { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { Member } from "@prisma/client";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ErrorPageDetails from "../error/ErrorPageDetails";

interface INewMemberFormProps {
  groupId: string;
}

const FormSchema = yup.object().shape({
  firstName: yup.string().required("* First name is required"),
  country: yup.string().required("* Country is required"),
});

const NewMemberForm = ({ groupId }: INewMemberFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const countryOptions = useMemo(() => countryList().getData(), []);
  const { data: session, status } = useSession({
    required: true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("groupId", groupId);

  // read ?edit=MemberId from the url
  const editMemberId = searchParams?.get("edit");
  const editFirstName = searchParams?.get("firstName");
  const editLastName = searchParams?.get("lastName");
  const editCountry = searchParams?.get("country");

  //@ts-ignore
  const leaderId = session?.user?.id;

  const handleMemberSubmit = async (values: Partial<Member>) => {
    if (editMemberId) {
      return handleMemberEdit(values);
    }

    const newMemberData = {
      firstName: values.firstName,
      lastName: values.lastName,
      country: values.country,
    };
    //@ts-ignore
    const userId = session?.user?.id;
    try {
      setIsLoading(true);
      const result = await axios.post(
        `/api/leader/${userId}/group/${groupId}/member`,
        {
          ...newMemberData,
        }
      );
      formik.resetForm();
      setIsLoading(false);
      router.push(`/leader/members`);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleMemberEdit = async (values: Partial<Member>) => {
    const newMemberData = {
      firstName: values.firstName,
      lastName: values.lastName,
      country: values.country,
    };
    //@ts-ignore
    const userId = session?.user?.id;
    try {
      setIsLoading(true);
      const result = await axios.put(
        `/api/leader/${userId}/group/${groupId}/member/${editMemberId}`,
        {
          ...newMemberData,
        }
      );
      formik.resetForm();
      setIsLoading(false);
      router.push(`/leader/members`);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: editFirstName || "",
      lastName: editLastName || "",
      country: editCountry || "",
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      await handleMemberSubmit(values);
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      id={"country"}
                      name={"country"}
                      options={countryOptions}
                      instanceId="react-select-3-live-region"
                      value={
                        countryOptions.find(
                          (country) => country.value === formik.values.country
                        ) || null
                      }
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
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-end gap-2 mt-5">
                {isLoading && (
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-blue-500 py-2 px-3 font-semibold text-white w-full md:w-auto"
                    disabled={isLoading}
                  >
                    Loading ...
                  </button>
                )}
                {!isLoading && (
                  <>
                    {" "}
                    <Link
                      type="button"
                      className="inline-flex justify-center rounded-md bg-red-500 py-2 px-3 font-semibold text-white hover:bg-red-600 w-full md:w-auto"
                      href="leader/members"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-md inline-flex justify-center w-full md:w-auto"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMemberForm;
