import React, { useState } from "react";
import type { FilterParams } from "../types";

type Props = {
  onSubmit: (filters: FilterParams) => void;
  initialFilters: FilterParams;
};

const FilterForm: React.FC<Props> = ({ onSubmit, initialFilters }) => {
  const [category, setCategory] = useState(initialFilters.category ?? "all");
  const [rating, setRating] = useState(initialFilters.rating ?? 0);
  const [open247, setOpen247] = useState(initialFilters.open_24_7 ?? false);
  const [limit, setLimit] = useState(initialFilters.limit ?? 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      category,
      rating,
      open_24_7: open247,
      limit,
    });
  };

  return (
    <div className="">
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
          backgroundColor: "lightblue",
        }}
      >
        <h2 className="" style={{ backgroundColor: "lightblue" }}>
          🧭 Filters
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium mb-1 pl-5 ml-8"
            style={{
              marginLeft: "10px",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            Category
          </label>
          <select
            className="w-full border rounded-lg ml-2"
            style={{
              marginTop: "10px",
              marginLeft: "10px",
              width: "90%",
              borderRadius: "30px",
              height: "30px",
              paddingLeft: "10px",
            }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="hotel">Hotel</option>
            <option value="viewpoint">Viewpoint</option>
            <option value="monument">Monument</option>
            <option value="museum">Museum</option>
          </select>
        </div>
        <hr
          className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"
          style={{
            backgroundColor: "lightgray",
          }}
        />
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{
              margin: "10px",
              padding: "10px",
            }}
          >
            Minimum Rating: {rating}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <hr
          className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"
          style={{
            backgroundColor: "lightgray",
            marginTop: "20px",
          }}
        />
        <div
          className="flex items-center ps-3"
          style={{
            marginLeft: "10px",
            paddingLeft: "10px",
            marginTop: "10px",
          }}
        >
          <input
            type="checkbox"
            checked={open247}
            onChange={(e) => setOpen247(e.target.checked)}
            className=""
            style={{
              marginRight: "20px",
              width: "20px",
              height: "20px",
              marginLeft: "10px",
            }}
          />
          <label
            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            style={{
              marginLeft: "5px", //any other styling,
              paddingLeft: "5px",
            }}
          >
            Open 24_7
          </label>
        </div>
        <hr
          className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"
          style={{
            backgroundColor: "lightgray",
            marginTop: "20px",
          }}
        />

        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ marginLeft: "10px", paddingLeft: "10px" }}
          >
            Limit
          </label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className=""
            style={{
              marginLeft: "10px",
              paddingLeft: "10px",
              width: "90%",
              borderRadius: "30px",
              height: "30px",
            }}
            min="1"
          />
        </div>
        <hr
          className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"
          style={{
            backgroundColor: "lightgray",
            marginTop: "20px",
          }}
        />
        <button
          type="submit"
          className=""
          style={{
            backgroundColor: "lightblue",
            color: "black",
            padding: "10px",
            borderRadius: "30px",
            marginLeft: "10px",
            width: "90%",
            //remvove border
            border: "none",
            height: "40px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Submit Filters
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
