import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, SelectChangeEvent, Autocomplete } from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setFormsData } from "../api-servies/registerSlice";
import debounce from "lodash/debounce";
import axios from "axios";

import * as yup from "yup";

function UserFormComponent() {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    age: yup.string().required("Age is required"),
    mobile: yup.string().required("Mobile is required"),
    sex: yup.string().required("Sex is required"),
    idType: yup.string(),
    govtId: yup.string().test({
      name: "govtId",
      message:  "Govt Id is required for Aadhar and should have 12 numeric digits, not starting with 0 or 1 and For PAN, It should be ten-character long alpha-numeric string.",
      test: function (value: any) {
        const idType = this.parent.idType;
        if (idType === "Aadhar") {
          return /^[2-9]\d{11}$/.test(value);
        }else if (idType === "Pan") {
          return /^[A-Za-z0-9]{10}$/.test(value)
        }
        return true;
      },
    }),
    address: yup.string(),
    state: yup.string(),
    city: yup.string(),
    country: yup.string(),
    pincode: yup.number(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const debouncedFetchCountries = debounce(async (newInputValue: string) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${newInputValue}`);
      const data = response.data;

      if (data) {
        const countryNames = data.map((country: any) => country.name.common);
        setFilteredCountries(countryNames);
      }
    } catch (error) {
      console.log("Error fetching countries:", error);
    }
  }, 300);

  const handleAutocompleteInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    setInputValue(newInputValue);
    debouncedFetchCountries(newInputValue);
  };

  const handleAutocompleteChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    setSelectedCountry(newValue);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: newValue || "",
    }));
  };

  const [formData, setFormData] = useState<{
    name: string;
    age: string;
    sex: string;
    mobile: string;
    idType: string;
    govtId: string;
    address: string;
    state: string;
    city: string;
    country: string;
    pincode: number;
  }>({
    name: "",
    age: "",
    sex: "",
    mobile: "",
    idType: "",
    govtId: "",
    address: "",
    state: "",
    city: "",
    country: "",
    pincode: 0,
  });
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const selectedValue = e.target.value as any;
    setFormData((prevFormData) => ({
      ...prevFormData,
      sex: selectedValue,
    }));
  };

  const handleSelectGovtChange = (e: SelectChangeEvent<string>) => {
    const selectedValue = e.target.value as any;
    setFormData((prevFormData) => ({
      ...prevFormData,
      idType: selectedValue,
    }));
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    dispatch(setFormsData(formData));  
    setFormData({
      name: "",
      age: "",
      sex: "",
      mobile: "",
      idType: "",
      govtId: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: 0,
    });
  };
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md border-2 p-2 bg-gray-300 mb-4">
          <h1 className="text-left">Personal Details</h1>
          <div className="flex flex-wrap items-center w-full  ">
            <div className=" flexScreenStyle">
              <div className="flex items-center">
                <label className="mr-2">
                  Name<span className="text-red-500">*</span>:
                </label>
                <TextField
                  inputProps={{
                    style: {
                      padding: 2,
                    },
                  }}
                  className="w-full"
                  id="outlined-basic"
                  type="text"
                  placeholder="Enter the name"
                  variant="outlined"
                  value={formData.name}
                  {...register("name")}
                  onChange={handleInputChange}
                />
              </div>
              <p className="text-red-600 text-sm">{errors.name?.message}</p>
            </div>

            <div className=" flexScreenStyle">
              <div className="flex items-center">
                <label className="mr-2">
                  Date of Birth or Age <span className="text-red-500">*</span>:
                </label>
                <TextField
                  inputProps={{
                    style: {
                      padding: 2,
                    },
                  }}
                  className="w-full"
                  id="outlined-basic"
                  type="text"
                  placeholder="Enter the Birth"
                  variant="outlined"
                  value={formData.age}
                  {...register("age")}
                  onChange={handleInputChange}
                />
              </div>
              <p className="text-red-600 text-sm">{errors.age?.message}</p>
            </div>

            <div className=" flexScreenStyle">
              <div className="flex items-center ">
                <label className="mr-2">
                  Sex<span className="text-red-500">*</span>:
                </label>
                <FormControl fullWidth>
                  <Select style={{ height: "32px" }} className="w-full" labelId="demo-simple-select-label" id="demo-simple-select" {...register("sex")} value={formData.sex} onChange={handleSelectChange} variant="outlined">
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <p className="text-red-600 text-sm">{errors.sex?.message}</p>
            </div>

            <div className=" flexScreenStyle">
              <div className="flex items-center ">
                <label className="mr-2">
                  Mobile <span className="text-red-500">*</span>:
                </label>
                <TextField
                  inputProps={{
                    style: {
                      padding: 2,
                    },
                  }}
                  className="w-full"
                  id="outlined-basic"
                  type="text"
                  placeholder="Enter the Mobile"
                  variant="outlined"
                  value={formData.mobile}
                  {...register("mobile")}
                  onChange={handleInputChange}
                />
              </div>
              <p className="text-red-600 text-sm">{errors.mobile?.message}</p>
            </div>

            <div className="flex items-center w-full md:w-2/2 lg:w-2/3 xl:w-2/3 px-2 ">
              <div className="flex justify-between items-center w-full ">
                <div className="w-full flex md:w-1/2 px-2 items-center">
                  <label className="mr-2">Govt Id:</label>
                  <FormControl fullWidth>
                    <Select style={{ height: "32px" }} className="w-full" labelId="demo-simple-select-label" id="demo-simple-select" {...register("idType")} value={formData.idType} onChange={handleSelectGovtChange} variant="outlined">
                      <MenuItem value="Aadhar">Aadhar</MenuItem>
                      <MenuItem value="Pan">Pan</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full px-2 ">
                  <TextField
                    inputProps={{
                      style: {
                        padding: 2,
                      },
                    }}
                    className="w-full"
                    id="outlined-basic"
                    type="text"
                    placeholder="Enter the govtId"
                    variant="outlined"
                    value={formData.govtId}
                    {...register("govtId")}
                    onChange={handleInputChange}
                  />
                                <p className="text-red-600 text-sm">{errors.govtId?.message}</p>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border-2 p-2 bg-gray-300 mb-4">
          <h1 className="text-left">Adress Details</h1>
          <div className="flex flex-wrap items-center w-full  ">
            <div className="flex items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label className="mr-2">Address:</label>
              <TextField
                inputProps={{
                  style: {
                    padding: 2,
                  },
                }}
                className="w-full"
                id="outlined-basic"
                type="text"
                placeholder="Enter the address"
                variant="outlined"
                value={formData.address}
                {...register("address")}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label className="mr-2">State:</label>
              <TextField
                inputProps={{
                  style: {
                    padding: 2,
                  },
                }}
                className="w-full"
                id="outlined-basic"
                type="text"
                placeholder="Enter the name"
                variant="outlined"
                value={formData.state}
                {...register("state")}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label className="mr-2">City:</label>
              <TextField
                inputProps={{
                  style: {
                    padding: 2,
                  },
                }}
                className="w-full"
                id="outlined-basic"
                type="text"
                placeholder="Enter the city"
                variant="outlined"
                value={formData.city}
                {...register("city")}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label className="mr-2">Country:</label>
              <Autocomplete
                value={selectedCountry}
                onChange={handleAutocompleteChange}
                inputValue={inputValue}
                onInputChange={handleAutocompleteInputChange}
                id="controllable-states-demo"
                options={filteredCountries}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <>
                    <TextField {...params} name="country" />
                  </>
                )}
              />
            </div>

            <div className="flex items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label className="mr-2">Pincode:</label>
              <TextField
                inputProps={{
                  style: {
                    padding: 2,
                  },
                }}
                className="w-full"
                id="outlined-basic"
                type="number"
                placeholder="Enter the Pincode"
                variant="outlined"
                value={formData.pincode}
                {...register("pincode")}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <Button type="submit" variant="contained" color="success">
          Success
        </Button>
      </form>
    </>
  );
}

export default UserFormComponent;
