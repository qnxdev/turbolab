import "./styles/App.css";
import { ArticleList, Article } from "./components/Article";
import { Layout } from "./components/Layout";
import { ArticleData, UserPref } from "./lib/types";
import { useEffect, useState } from "react";
import { Fetcher } from "./components/Helpers";
import { Loader } from "./components/Loader";

function App() {
  const [articlesData, setArticlesData] = useState({} as ArticleData);
  const [userPref, setUserPref] = useState({
    searchTerm: "",
  } as UserPref);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageChange, setPageChange] = useState(false);
  let userData: string = "";

  const GetStorageOnce = () => {
    if (localStorage) {
      if (
        userPref.searchTerm === "" &&
        !userPref.filter &&
        !userPref.dateRange
      ) {
        try {
          userData = localStorage.getItem("user-pref") || "";

          if (
            JSON.parse(userData) !== userPref &&
            JSON.parse(userData).searchTerm
          )
            setUserPref(JSON.parse(userData));
        } catch (e) {
          console.log(e);
          try {
            localStorage.setItem("user-pref", JSON.stringify(userPref));
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  };

  const UpdateStorage = (params: UserPref) => {
    setTimeout(() => {
      try {
        localStorage.setItem("user-pref", JSON.stringify(params));
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  };

  useEffect(() => {
    return GetStorageOnce();
  });

  useEffect(() => {
    if (!articlesData.result) {
      setLoading(true);
    }
    if (articlesData.error || typeof articlesData.result == "string") {
      setError(true);
    }
  }, [articlesData]);

  useEffect(() => {
    if (loading && userPref.searchTerm !== "") {
      const GetData = async () => {
        if (pageChange) {
          setArticlesData(await Fetcher(userPref, articlesData.result.nextUrl));
        } else {
          setArticlesData(await Fetcher(userPref));
        }
      };
      GetData().then(() => {
        setLoading(false);
        setPageChange(false);
        setSelected(0)
      });
    }
  }, [loading, userPref,articlesData,pageChange]);

  return (
    <div className="App">
      <Layout
        searchTerm={userPref.searchTerm}
        setSearchTerm={(value: string) => {
          setUserPref({ ...userPref, searchTerm: value });
          setLoading(true);
          UpdateStorage({ ...userPref, searchTerm: value });
        }}
        filter={userPref.filter || {}}
        setFilter={(value) => {
          setUserPref({ ...userPref, filter: value });
          setLoading(true);
          UpdateStorage({ ...userPref, filter: value });
        }}
      >
        {error ||
        !articlesData.result ||
        (articlesData.result.data && articlesData.result.data.length <= 0) ||
        (userPref.searchTerm && userPref.searchTerm === "") ? (
          <div className="none-wrapper df">
            {error
              ? articlesData.result
              : `Nothing here. Start searching with a ${userPref.searchTerm!=="" ? "different ":""}keyword`}
          </div>
        ) : loading ? (
          <div className="loading-wrapper df">
            <Loader />
          </div>
        ) : (
          <div className="main-container df">
            <ArticleList
              dateRange={userPref.dateRange || {}}
              setDateRange={(values) => {
                setUserPref({ ...userPref, dateRange: values });
                setLoading(true);
                UpdateStorage({ ...userPref, dateRange: values });
              }}
              selected={selected}
              setSelected={setSelected}
              articles={articlesData.result.data}
              nextPage={() => {
                setPageChange(true);
                setLoading(true);
              }}
            />
            <Article {...articlesData.result.data[selected]} />
          </div>
        )}
      </Layout>
    </div>
  );
}

export default App;
