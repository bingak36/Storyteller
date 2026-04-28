import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";
import "./Landing.scss";

const Landing = () => {
  return (
    <section className="landing">
      <div className="inner">
        <div className="t-wrap">
          <p className="subtitle">나만의 식사 이야기</p>
          <h1>MIRI EAT</h1>
          <p className="desc">오늘 먹은 것을 기록하고, 나만의 식단 이야기를 만들어보세요.</p>
        </div>
        <NavLink to="/login">
          <Button text="시작하기" className="intro-btn button" />
        </NavLink>
      </div>
    </section>
  );
};

export default Landing;
