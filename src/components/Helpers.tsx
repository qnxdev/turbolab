import { UserPref } from "../lib/types";

const HOST_URL = "https://get.scrapehero.com/";
const API_KEY =
  "foSZeeMRB4JvgYE1GlFSqiXuXWEdmAqf"; /* "qoPtuQnVcBJqgv5YJp1nJsXrX1RlkAd0" */

export const Fetcher = async (userPref: UserPref, url?: string) => {
  try {
    const data = await fetch(
      url
        ? url.replace("http", "https") + `&x-api-key=${API_KEY}`
        : `${HOST_URL}news-api/news/?q=${encodeURIComponent(
            userPref.searchTerm
          )}&x-api-key=${API_KEY}${
            userPref.filter
              ? `${
                  userPref.filter.category &&
                  userPref.filter.category.length > 0
                    ? `&category_id=${userPref.filter.category
                        .map((i) => i.id)
                        .join(",")}`
                    : ""
                }${
                  userPref.filter.source && userPref.filter.source.length > 0
                    ? `&source_id=${userPref.filter.source
                        .map((i) => i.id)
                        .join(",")}`
                    : ""
                }${
                  userPref.filter.sentiment &&
                  userPref.filter.sentiment.length > 0
                    ? `&sentiment=${userPref.filter.sentiment[0].name}`
                    : ""
                }`
              : ""
          }${
            userPref.dateRange &&
            userPref.dateRange.from &&
            userPref.dateRange.to
              ? `&start_date=${userPref.dateRange.from}&end_date=${userPref.dateRange.to}`
              : ""
          }`
    );

    return await data.json();
  } catch (e) {
    console.log(e);

    return { error: "Failed to connect" };
  }
};

export const SubFetcher = async (type: string) => {
  switch (type) {
    case "category":
      try {
        const data = await fetch(
          `${HOST_URL}news-api/categories/?x-api-key=${API_KEY}`
        );
        return await data.json();
      } catch (e) {
        return { error: "Failed to connect" };
      }
    case "source":
      try {
        const data = await fetch(
          `${HOST_URL}news-api/sources/?x-api-key=${API_KEY}`
        );
        return await data.json();
      } catch (e) {
        return { error: "Failed to connect" };
      }
    default:
      return { error: "Unknown Error" };
  }
};

export const FormatDate = (date: string) => {
  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let d = new Date(date);
  return `${Months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

export const VerifyDate = (date1: string, date2: string) => {
  let d1: Array<number> = date1.split("-").map((i) => parseInt(i));
  let d2: Array<number> = date2.split("-").map((i) => parseInt(i));

  if (d1[0] <= d2[0] && d1[1] <= d2[1] && d1[2] <= d2[2]) {
    return true;
  } else {
    return false;
  }
};
