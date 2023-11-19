import { create } from "zustand";

import photoData from "./../types/photo";
import request from "@/server";
import { UseFormReset } from "react-hook-form";
import UseFormInputs from "@/types/formInputs";
import { LIMIT } from "@/constants";
import { SetStateAction } from "react";

const crud = <T>(url: string) => {
  interface initialStateTypes {
    allData: T[];
    loading: boolean;
    photoLoad: boolean;
    photo: photoData | null;
    page: number;
    total: number;
    selected: null | string;
    search: string;
    isModalOpen: boolean;
    isModalLoad: boolean;
    closeModal: () => void;
    showModal: (
      reset: UseFormReset<UseFormInputs>,
      setCategory: React.Dispatch<SetStateAction<string>>
    ) => void;
    getAllData: (search: string, page: number) => void;
    addData: (values: object) => void;
    getSingleData: (id: string, reset: UseFormReset<UseFormInputs>) => void;
    updateData: (values: object, id: string) => void;
    uploadPhoto: (file: FormData) => void;
    deleteData: (id: string) => void;
    handleSearch: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    setPage: (page: number) => void;
  }

  return create<initialStateTypes>()((set, get) => {
    const setState = (newState: object) => {
      return set((state) => ({ ...state, ...newState }));
    };

    return {
      allData: [],
      loading: false,
      photoLoad: false,
      photo: {
        _id: "",
        url: "",
      },
      page: 1,
      total: 0,
      selected: null,
      search: "",
      isModalOpen: false,
      isModalLoad: false,
      closeModal: () => {
        setState({ isModalOpen: false, photo: null });
      },
      showModal: (reset, setCategory) => {
        setState({ isModalOpen: true, selected: null, photo: null });
        reset({
          firstName: "",
          lastName: "",
          username: "",
          phoneNumber: "",
          password: "",
          category: "",
          title: "",
          price: "",
          image: {
            url: "",
            _id: "",
          },
          quantity: "",
        });
        setCategory("");
      },
      getAllData: async (search, page) => {
        try {
          const params = {
            search,
            page,
            limit: LIMIT,
          };
          setState({ loading: true });
          const { data } = await request.get(url, {
            params,
          });
          let newData;
          if (url === "user") {
            newData = data.users?.map((el: object, i: number) => ({
              ...el,
              key: i,
            }));
          } else if (url === "product") {
            newData = data.products?.map((el: object, i: number) => ({
              ...el,
              key: i,
            }));
          }
          setState({ allData: newData, total: data?.total });
        } finally {
          setState({ loading: false });
        }
      },
      addData: async (values) => {
        try {
          setState({ isModalLoad: true });
          await request.post(url, values);
          const { page, search, getAllData } = get();
          setState({ isModalOpen: false });
          getAllData(search, page);
        } finally {
          setState({ isModalLoad: false });
        }
      },
      getSingleData: async (id, reset) => {
        setState({ selected: id });
        const { data } = await request.get<UseFormInputs>(`${url}/${id}`);
        reset(data);
        setState({ isModalOpen: true, image: data.image });
      },
      updateData: async (values, id) => {
        try {
          setState({ isModalLoad: true });
          await request.put(`${url}/${id}`, values);
          const { page, search, getAllData } = get();
          setState({ isModalOpen: false });
          getAllData(search, page);
        } finally {
          setState({ isModalLoad: false });
        }
      },
      uploadPhoto: async (file) => {
        try {
          setState({ photoLoad: true });
          const { data } = await request.post(`upload`, file);
          setState({ photo: data });
        } finally {
          setState({ photoLoad: false });
        }
      },
      deleteData: async (id) => {
        await request.delete(`${url}/${id}`);
        const { getAllData, search, page } = get();
        getAllData(search, page);
      },
      handleSearch: (e) => {
        setState({ search: e.target.value, page: 1 });
      },
      setPage: (page) => {
        setState({ page });
      },
    };
  });
};

export default crud;
