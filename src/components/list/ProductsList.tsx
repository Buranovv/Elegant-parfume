"use client";

import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useGetData from "@/zustand/getData";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductsCard from "../card/productCard/ProductsCard";
import UniversalData from "@/types/universalData";
import request from "@/server";
import Loader2 from "../shares/loader/Loader2";
import Pagination from "@mui/material/Pagination";
import "./style.scss";

const ProductsList = () => {
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [allData, setAllData] = useState<UniversalData[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [callback, setCallback] = useState(false);

  const { categories, getAllCategories } = useGetData();

  const refetch = () => setCallback(!callback);
  const pageSize = Math.ceil(total / 12);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const { data } = await request.get(`product`, {
          params: {
            page,
            limit: 12,
            sort,
            search,
            category: filter ? filter : undefined,
          },
        });
        setAllData(data?.products);
        setTotal(data?.total);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, [page, sort, search, filter, callback]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);

    refetch();
  };
  const handleFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
    setPage(1);

    refetch();
  };
  const handleSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
    setPage(1);

    refetch();
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    refetch();
  };

  const sortParams = [
    {
      name: `Eng so'nggi mahsulotlar`,
      value: `""`,
    },
    {
      name: `Eng eski mahsulotlar`,
      value: `oldest`,
    },
    {
      name: `Eng ko'p sotilganlar`,
      value: `sold`,
    },
    {
      name: `Eng kam sotilgan`,
      value: `-sold`,
    },
    {
      name: `Eng qimmat mahsulotlar`,
      value: `price`,
    },
    {
      name: `Eng arzon mahsulotlar`,
      value: `-price`,
    },
    {
      name: `Sarlavha bo'yicha o'sish`,
      value: `title`,
    },
    {
      name: `Sarlavha bo'yicha kamayish`,
      value: `-title`,
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "40px" }}>Barcha mahsulotlar ({total})</h2>
      <div className="productsForm">
        <div className="searchBox">
          <input
            className="search"
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            value={search}
          />
          <SearchIcon className="svg" />
        </div>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Category</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Category"
              value={filter}
              onChange={handleFilter}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((ctgr, i) => (
                <MenuItem key={i} value={ctgr._id}>
                  {ctgr.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-smalll-label">Saralash</InputLabel>
            <Select
              labelId="demo-select-smalll-label"
              id="demo-select-smalll"
              value={sort}
              label="Sorting"
              onChange={handleSort}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {sortParams.map((el) => (
                <MenuItem key={el.name} value={el.value}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <Box sx={{ width: "100%", marginTop: "40px" }}>
        {loading ? (
          <Loader2 />
        ) : (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          >
            {allData.map((pr, i) => (
              <Grid key={i} item lg={3} md={4} sm={6} xs={12}>
                <ProductsCard {...pr} />
              </Grid>
            ))}
          </Grid>
        )}
        {total > 12 ? (
          <Pagination count={pageSize} page={page} onChange={handleChange} />
        ) : null}
      </Box>
    </div>
  );
};

export default ProductsList;
