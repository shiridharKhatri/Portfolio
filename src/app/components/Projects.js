"use client";
import React, { useEffect, useState } from "react";
import { AiIcons, BiIcons, IoIcons, SiIcons, FaIcons, GrIcons } from "./Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Spinner from "../tools/Spinner";
export default function Projects() {
  const host =
    process.env.NEXT_PUBLIC_HOST || "https://quaint-gray-ladybug.cyclic.app";
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [clicked, setClicked] = useState(false)

  const router = useRouter();
  const tech = [
    {
      name: "nextjs",
      icons: <SiIcons.SiNextdotjs />,
      color: "var(--color)",
    },
    {
      name: "nodejs",
      icons: <FaIcons.FaNodeJs />,
      color: "#3C873A",
    },
    {
      name: "reactjs",
      icons: <GrIcons.GrReactjs />,
      color: "#61dafb",
    },
    {
      name: "mongodb",
      icons: <BiIcons.BiLogoMongodb />,
      color: "#589636",
    },
    {
      name: "css",
      icons: <IoIcons.IoLogoCss3 />,
      color: "#264de4",
    },
    {
      name: "javascript",
      icons: <BiIcons.BiLogoJavascript />,
      color: "#F0DB4F",
    },
    {
      name: "html",
      icons: <AiIcons.AiFillHtml5 />,
      color: "#ea4335",
    },
  ];
  const isClient = typeof window !== "undefined";
  let likeAudio = isClient ? new Audio("./audio/like.mp3") : null;
  let unLikeAudio = isClient ? new Audio("./audio/unlike.mp3") : null;

  const likeOnClick = async (id) => {
    try {
      const headers = {
        Accept: "*/*",
        "auth-token": Cookies.get("token"),
        "Content-Type": "application/json",
      };

      const body = JSON.stringify({
        productId: id,
      });

      await fetch(`${host}/api/project/like`, {
        method: "POST",
        body,
        headers,
      });
    } catch (error) {
      console.error("Error during 'like' action:", error.message);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoader(true);
      let headersList = {
        Accept: "*/*",
      };

      let response = await fetch(`${host}/api/project/fetch`, {
        method: "GET",
        headers: headersList,
      });

      let data = await response.json();
      if (data.success === true) {
        setLoader(false);
        setData(data);
      } else {
        setLoader(false);
      }
    };
    fetchProjects();
  }, [host]);
  let array = [1, 2, 3, 4];
  return (
    <section id="projectSec" className="projects">
      <div className="topH">
        <h2>PORTFOLIO</h2>
        <h1 id="projectHeading">Showcase</h1>
      </div>

      {loader ? (
        <>
          <div className="titleHead">
            <h3>
              Total projects (Loading...)
              <span
                id="viewAllProject"
                onClick={() => {
                  router.push("/project");
                }}
              >
                View all
              </span>
            </h3>
          </div>
          <div className="projectCards projectCards-loader">
            {array.map((e, index) => {
              return (
                <div key={index} className="card card-loader">
                  <div
                    className="project-card-items project-card-items-loader"
                    style={{
                      background: "transparent",
                    }}
                  >
                    <div className="image image-loader"></div>
                    <div className="techUsed techUsed-loader">
                      <ul id="techUsed">
                        {tech.map((e, index) => {
                          return <li key={index}></li>;
                        })}
                      </ul>
                    </div>
                    <div className="details details-loader">
                      <h2
                        style={{
                          margin: "2rem 0 0 0",
                          height: "3rem",
                          background: "#cacaca",
                        }}
                      ></h2>
                      <p
                        style={{
                          background: "#cacaca",
                          height: "1rem",
                          margin: "1rem 0 0 0",
                          width: "100%",
                        }}
                      ></p>
                      <p
                        style={{
                          background: "#cacaca",
                          height: "1rem",
                          margin: "1rem 0 0 0",
                          width: "100%",
                        }}
                      ></p>
                      <p
                        style={{
                          background: "#cacaca",
                          height: "1rem",
                          margin: "1rem 0 0 0",
                          width: "100%",
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="titleHead">
            <h3>
              Total projects ({data.total}){" "}
              <span
                id="viewAllProject"
                onClick={() => {
                  router.push("/project");
                }}
              >
                View all
              </span>
            </h3>
          </div>
          <div className="projectCards">
            {data.project?.slice(0, 4).map((e, index) => {
              return (
                <div
                  data-aos="fade-down-right fade-out"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-delay="200"
                  className="card"
                  key={e._id}
                >
                  <div className="project-card-items">
                    <div
                      className="image"
                      style={{
                        position: "relative",
                        userSelect: "none",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        id={`${index}likeBtn`}
                        className="likeBtnImg"
                        style={{ position: "absolute" }}
                      >
                        <div className="heart-container" title="Like">
                          <input
                            type="checkbox"
                            className="checkbox"
                            id={`${index}heartInImage`}
                          />
                          <div className="svg-container">
                            <svg
                              viewBox="0 0 24 24"
                              className="svg-outline"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                            </svg>
                            <svg
                              viewBox="0 0 24 24"
                              className="svg-filled"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                            </svg>
                            <svg
                              className="svg-celebrate"
                              width="100"
                              height="100"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polygon points="10,10 20,20"></polygon>
                              <polygon points="10,50 20,50"></polygon>
                              <polygon points="20,80 30,70"></polygon>
                              <polygon points="90,10 80,20"></polygon>
                              <polygon points="90,50 80,50"></polygon>
                              <polygon points="80,80 70,70"></polygon>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <Image
                        style={{ userSelect: "none" }}
                        src={`${host}/projectImage/${e.image[0]}`}
                        // src={e.image}
                        alt="projectPicture"
                        layout="responsive"
                        width={200}
                        height={150}
                      />
                    </div>
                    <div className="techUsed">
                      <ul id="techUsed">
                        {tech.map((e, index) => {
                          return (
                            <li key={index} style={{ color: e.color }}>
                              {e.icons}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="details">
                      <h2>{e.title}</h2>
                      <p>
                        {e.description.length > 210
                          ? e.description.slice(0, 210) + "..."
                          : e.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="btnsViewAll">
        <button
          onClick={() => {
            router.push("/project");
            setClicked(true);
          }}
        >
          {clicked === true ?  <Spinner />:"View all"}
         
        </button>
      </div>
    </section>
  );
}
