import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";
import "./Landing.scss";

const Landing = () => {
  return (
    <section className="landing">
      <div className="inner">
        <div className="image-wrap" />
        <div className="t-wrap">
          <h1>MIRI EAT</h1>
          <p>나만의 이야기를 기록하세요</p>
        </div>
        <NavLink to="/login">
          <Button text="시작하기" className="intro-btn button" />
        </NavLink>
      </div>
    </section>
  );
};

export default Landing;
