import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PurpleHeader from "../components/PurpleHeader";
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";

function MakeProfileCard() {
  return (
    <>
      <PurpleHeader title="프로필 카드 생성" />
      <NavigationBar />
    </>
  );
}

export default MakeProfileCard;
