import { isError, useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { useGlobalContext } from "./context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;
// const url =
//   "https://api.unsplash.com/search/photos?client_id=msY45mV1dp7sM1hfp-7jrK9qXx7PHQT2-rBhpHoGQRg";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const innerResult = await axios.get(`${url}&query=${searchTerm}`);

      return innerResult.data;
    },
  });
  // console.log(response);
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>there was an error...</h4>
      </section>
    );
  }
  const result = response.data.results;

  if (result.length < 1) {
    return (
      <section className="image-container">
        <h4>no ressults found</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {result.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_descrioption}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
