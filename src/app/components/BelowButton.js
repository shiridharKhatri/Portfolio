import React from "react";
import { FaIcons, BiIcons, FiIcons } from "./Icons";
export default function BelowButton() {
  const socialicons = [
    {
      name: "Facebook",
      color: "#4267B2",
      icon: <FaIcons.FaFacebookF />,
      link: "#",
    },
    {
      name: "Instagram",
      color: "#E4405F",
      icon: <FiIcons.FiInstagram />,
      link: "#",
    },
    {
      name: "Linkedin",
      color: "#0A66C2",
      icon: <FaIcons.FaLinkedinIn />,
      link: "https://www.linkedin.com/in/shiridharkhatri/",
    },
    {
      name: "Upwork",
      color: "#00b22d",
      icon: <BiIcons.BiLogoUpwork/>,
      link: "https://www.upwork.com/freelancers/~01241e90d934b26b94",
    },
    {
      name: "Github",
      color: "#000000",
      icon: <FaIcons.FaGithub />,
      link: "https://github.com/shiridharKhatri",
    },
    {
      name: "Viber",
      color: "#7360F2",
      icon: <FaIcons.FaViber />,
      link: "viber://chat?number=+9779820610923",
    },
  ];
  return (
    <section className="BelowButton" style={{ marginBottom: "6rem" }}>
      <ul id="socialIconsL">
        {socialicons.map((e, index) => {
          return (
            <li
              onClick={() => {
                window.open(e.link, "_blank");
              }}
              style={{ background: e.color }}
              key={index}
            >
              {e.icon}
              &nbsp;<span>{e.name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
