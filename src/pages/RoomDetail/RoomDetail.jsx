import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { phongThueService } from "../../services/phongThue.service";
import { viTriService } from "../../services/viTri.service";
import BookingForm from "../../components/BookingPicker/BookingPicker";
import { commentService } from "../../services/binhLuan.service";

const RoomDetail = () => {
  const [searchParam] = useSearchParams();
  const [roomDetail, setRoomDetail] = useState();
  const [idLocation, setIdLocation] = useState();
  const [locationDetail, setLocationDetail] = useState();
  const [listOffer, setListOffer] = useState();
  const [listComment, setListComment] = useState();
  const listBasisInfo = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "currentcolor",
          }}
          className="ms-5"
        >
          <path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z" />
        </svg>
      ),
      service: "Self check-in",
      description: "Check yourself in with the lockbox.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "currentcolor",
          }}
          className="ms-5"
        >
          <path d="M16 17a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM25.67.33a2 2 0 0 1 2 1.85v6.54a2 2 0 0 1-.97 1.7l-.14.08-9.67 4.84a2 2 0 0 1-1.61.07l-.17-.07-9.67-4.84a2 2 0 0 1-1.1-1.62V2.33a2 2 0 0 1 1.84-2h.15zm0 2H6.33v6.39L16 13.55l9.67-4.83z" />
        </svg>
      ),
      service: "Residence Yu is a Superhost",
      description: "Superhosts are experienced, highly rated Hosts.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "currentcolor",
          }}
          className="ms-5"
        >
          <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z" />
        </svg>
      ),
      service: "Great check-in experience",
      description: "Recent guests loved the smooth start to this stay.",
    },
  ];
  const offerNameTranslated = {
    banLa: "Iron",
    banUi: "Ironing board",
    bep: "Kitchen",
    dieuHoa: "Air conditioning",
    doXe: "Free parking",
    hoBoi: "Swimming pool",
    mayGiat: "Washing machine",
    tivi: "TV",
    wifi: "Wifi",
  };
  const offerIconMap = {
    Iron: (
      <svg
        key={1}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "inline",
          height: 24,
          width: 24,
          fill: "currentcolor",
        }}
      >
        <path d="M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.03 3h.3a12.5 12.5 0 0 1 11.82 9.48l.07.3 1.73 7.79.03.14A2 2 0 0 1 28.15 23H2.1a2 2 0 0 1-1.85-1.84v-7.38a5 5 0 0 1 4.77-4.77L5.25 9h9V5h-14V3zm11.53 16H2.25v2H28zM16.24 5v6H5.07a3 3 0 0 0-2.82 2.82V17H27.1l-.84-3.78-.07-.28a10.5 10.5 0 0 0-9.6-7.92L16.32 5z" />
      </svg>
    ),

    "Ironing board": (
      <svg
        key={2}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "inline",
          height: 24,
          width: 24,
          fill: "currentcolor",
        }}
      >
        <path d="M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.03 3h.3a12.5 12.5 0 0 1 11.82 9.48l.07.3 1.73 7.79.03.14A2 2 0 0 1 28.15 23H2.1a2 2 0 0 1-1.85-1.84v-7.38a5 5 0 0 1 4.77-4.77L5.25 9h9V5h-14V3zm11.53 16H2.25v2H28zM16.24 5v6H5.07a3 3 0 0 0-2.82 2.82V17H27.1l-.84-3.78-.07-.28a10.5 10.5 0 0 0-9.6-7.92L16.32 5z" />
      </svg>
    ),

    Kitchen: (
      <svg
        key={3}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "inline",
          height: 24,
          width: 24,
          fill: "currentcolor",
        }}
      >
        <path d="M26 1a5 5 0 0 1 5 5c0 6.39-1.6 13.19-4 14.7V31h-2V20.7c-2.36-1.48-3.94-8.07-4-14.36v-.56A5 5 0 0 1 26 1zm-9 0v18.12c2.32.55 4 3 4 5.88 0 3.27-2.18 6-5 6s-5-2.73-5-6c0-2.87 1.68-5.33 4-5.88V1zM2 1h1c4.47 0 6.93 6.37 7 18.5V21H4v10H2zm14 20c-1.6 0-3 1.75-3 4s1.4 4 3 4 3-1.75 3-4-1.4-4-3-4zM4 3.24V19h4l-.02-.96-.03-.95C7.67 9.16 6.24 4.62 4.22 3.36L4.1 3.3zm19 2.58v.49c.05 4.32 1.03 9.13 2 11.39V3.17a3 3 0 0 0-2 2.65zm4-2.65V17.7c.99-2.31 2-7.3 2-11.7a3 3 0 0 0-2-2.83z" />
      </svg>
    ),
    "Air conditioning": (
      <svg
        key={4}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "inline",
          height: 24,
          width: 24,
          fill: "currentcolor",
        }}
      >
        <path d="M17 1v4.03l4.03-2.32 1 1.73L17 7.34v6.93l6-3.47V5h2v4.65l3.49-2.02 1 1.74L26 11.38l4.03 2.33-1 1.73-5.03-2.9L18 16l6 3.46 5.03-2.9 1 1.73L26 20.62l3.49 2.01-1 1.74L25 22.35V27h-2v-5.8l-6-3.47v6.93l5.03 2.9-1 1.73L17 26.97V31h-2v-4.03l-4.03 2.32-1-1.73 5.03-2.9v-6.93L9 21.2V27H7v-4.65l-3.49 2.02-1-1.74L6 20.62l-4.03-2.33 1-1.73L8 19.46 14 16l-6-3.46-5.03 2.9-1-1.73L6 11.38 2.51 9.37l1-1.74L7 9.65V5h2v5.8l6 3.47V7.34l-5.03-2.9 1-1.73L15 5.03V1z" />
      </svg>
    ),
    "Free parking": (
      <svg
        key={5}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "inline",
          height: 24,
          width: 24,
          fill: "currentcolor",
        }}
      >
        <path d="M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.7-5 .41 1.12A4.97 4.97 0 0 1 30 18v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H8v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9c0-1.57.75-2.96 1.89-3.88L4.3 13H2v-2h3v.15L6.82 6.3A2 2 0 0 1 8.69 5h14.62c.83 0 1.58.52 1.87 1.3L27 11.15V11h3v2h-2.3zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h24zm-3-10h.56L23.3 7H8.69l-2.25 6H25zm-15 7h12v-2H10v2z" />
      </svg>
    ),

    "Swimming pool": (
      <svg
        key={6}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "inline",
          height: 24,
          width: 24,
          fill: "currentcolor",
        }}
      >
        <path d="M24 26c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 28c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 26zm0-5c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 23c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 21zM20 3a4 4 0 0 1 4 3.8V9h4v2h-4v5a4 4 0 0 1 2.5.86l.17.15c.3.27.71.44 1.14.48l.19.01v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 18c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 16c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5a3.96 3.96 0 0 1 2.44-1H16v-5H4V9h12V7a2 2 0 0 0-4-.15V7h-2a4 4 0 0 1 7-2.65A3.98 3.98 0 0 1 20 3zm-2 13.52.46.31.21.18c.35.31.83.49 1.33.49a2 2 0 0 0 1.2-.38l.13-.11c.2-.19.43-.35.67-.49V11h-4zM20 5a2 2 0 0 0-2 1.85V9h4V7a2 2 0 0 0-2-2z" />
      </svg>
    ),

    "Washing machine": (
      <svg
        key={7}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "inline",
          height: 24,
          width: 24,
          fill: "currentcolor",
        }}
      >
        <path d="M26.29 2a3 3 0 0 1 2.96 2.58c.5 3.56.75 7.37.75 11.42s-.25 7.86-.75 11.42a3 3 0 0 1-2.79 2.57l-.17.01H5.7a3 3 0 0 1-2.96-2.58C2.25 23.86 2 20.05 2 16s.25-7.86.75-11.42a3 3 0 0 1 2.79-2.57L5.7 2zm0 2H5.72a1 1 0 0 0-1 .86A80.6 80.6 0 0 0 4 16c0 3.96.24 7.67.73 11.14a1 1 0 0 0 .87.85l.11.01h20.57a1 1 0 0 0 1-.86c.48-3.47.72-7.18.72-11.14 0-3.96-.24-7.67-.73-11.14A1 1 0 0 0 26.3 4zM16 7a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm-5.84 7.5c-.34 0-.68.02-1.02.07a7 7 0 0 0 13.1 4.58 9.09 9.09 0 0 1-6.9-2.37l-.23-.23a6.97 6.97 0 0 0-4.95-2.05zM16 9a7 7 0 0 0-6.07 3.5h.23c2.26 0 4.44.84 6.12 2.4l.24.24a6.98 6.98 0 0 0 6.4 1.9A7 7 0 0 0 16 9zM7 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
    ),

    TV: (
      <svg
        key={8}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "inline",
          height: 24,
          width: 24,
          fill: "currentcolor",
        }}
      >
        <path d="M9 29v-2h2v-2H6a5 5 0 0 1-5-4.78V8a5 5 0 0 1 4.78-5H26a5 5 0 0 1 5 4.78V20a5 5 0 0 1-4.78 5H21v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-3 2.82V20a3 3 0 0 0 2.82 3H26a3 3 0 0 0 3-2.82V8a3 3 0 0 0-2.82-3z" />
      </svg>
    ),

    Wifi: (
      <svg
        key={9}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "inline",
          height: 24,
          width: 24,
          fill: "currentcolor",
        }}
      >
        <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z" />
      </svg>
    ),
  };
  const listReviewIcon = [
    {
      title: "Cleanliness",
      star: "4.8",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 32,
            width: 32,
            fill: "currentcolor",
          }}
        >
          <path d="M24 0v6h-4.3c.13 1.4.67 2.72 1.52 3.78l.2.22-1.5 1.33a9.05 9.05 0 0 1-2.2-5.08c-.83.38-1.32 1.14-1.38 2.2v4.46l4.14 4.02a5 5 0 0 1 1.5 3.09l.01.25.01.25v8.63a3 3 0 0 1-2.64 2.98l-.18.01-.21.01-12-.13A3 3 0 0 1 4 29.2L4 29.02v-8.3a5 5 0 0 1 1.38-3.45l.19-.18L10 12.9V8.85l-4.01-3.4.02-.7A5 5 0 0 1 10.78 0H11zm-5.03 25.69a8.98 8.98 0 0 1-6.13-2.41l-.23-.23A6.97 6.97 0 0 0 6 21.2v7.82c0 .51.38.93.87 1H7l11.96.13h.13a1 1 0 0 0 .91-.88l.01-.12v-3.52c-.34.04-.69.06-1.03.06zM17.67 2H11a3 3 0 0 0-2.92 2.3l-.04.18-.01.08 3.67 3.1h2.72l.02-.1a4.29 4.29 0 0 1 3.23-3.4zM30 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 0h-2.33v2H22zm8-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM20 20.52a3 3 0 0 0-.77-2l-.14-.15-4.76-4.61v-4.1H12v4.1l-5.06 4.78a3 3 0 0 0-.45.53 9.03 9.03 0 0 1 7.3 2.34l.23.23A6.98 6.98 0 0 0 20 23.6z" />
        </svg>
      ),
    },
    {
      title: "Accuracy",
      star: "4.9",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 32,
            width: 32,
            fill: "currentcolor",
          }}
        >
          <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm7 7.59L24.41 12 13.5 22.91 7.59 17 9 15.59l4.5 4.5z" />
        </svg>
      ),
    },
    {
      title: "Check-in",
      star: "5.0",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 32,
            width: 32,
            fill: "currentcolor",
          }}
        >
          <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z" />
        </svg>
      ),
    },
    {
      title: "Communication",
      star: "5.0",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            fill: "none",
            height: 32,
            width: 32,
            stroke: "currentcolor",
            strokeWidth: 2,
            overflow: "visible",
          }}
        >
          <path
            fill="none"
            d="M26 3a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-6.32L16 29.5 12.32 25H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
          />
        </svg>
      ),
    },
    {
      title: "Location",
      star: "4.8",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 32,
            width: 32,
            fill: "currentcolor",
          }}
        >
          <path d="M30.95 3.81a2 2 0 0 0-2.38-1.52l-7.58 1.69-10-2-8.42 1.87A1.99 1.99 0 0 0 1 5.8v21.95a1.96 1.96 0 0 0 .05.44 2 2 0 0 0 2.38 1.52l7.58-1.69 10 2 8.42-1.87A1.99 1.99 0 0 0 31 26.2V4.25a1.99 1.99 0 0 0-.05-.44zM12 4.22l8 1.6v21.96l-8-1.6zM3 27.75V5.8l-.22-.97.22.97 7-1.55V26.2zm26-1.55-7 1.55V5.8l7-1.55z" />
        </svg>
      ),
    },
    {
      title: "Value",
      star: "4.8",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 32,
            width: 32,
            fill: "currentcolor",
          }}
        >
          <path d="M16.17 2a3 3 0 0 1 1.98.74l.14.14 11 11a3 3 0 0 1 .14 4.1l-.14.14L18.12 29.3a3 3 0 0 1-4.1.14l-.14-.14-11-11A3 3 0 0 1 2 16.37l-.01-.2V5a3 3 0 0 1 2.82-3h11.35zm0 2H5a1 1 0 0 0-1 .88v11.29a1 1 0 0 0 .2.61l.1.1 11 11a1 1 0 0 0 1.31.08l.1-.08L27.88 16.7a1 1 0 0 0 .08-1.32l-.08-.1-11-11a1 1 0 0 0-.58-.28L16.17 4zM9 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
      ),
    },
  ];

  // api
  useEffect(() => {
    let roomId = searchParam.get("id");
    if (roomId) {
      phongThueService
        .getRoomDetail(roomId)
        .then((res) => {
          console.log(res);
          setRoomDetail(res.data.content);
          setIdLocation(res.data.content.maViTri);
        })
        .catch((err) => {
          console.log(err);
        });
      commentService
        .getCommentsByRoomId(roomId)
        .then((res) => {
          console.log(res);
          setListComment(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (roomDetail) {
      const listOffer = Object.entries(roomDetail)
        .filter(([key, value]) => value === true)
        .map(([key]) => offerNameTranslated[key]);
      // console.log(listOffer);
      setListOffer(listOffer);
    }
    const locationDetail = async () => {
      if (idLocation) {
        try {
          const res = await viTriService.getLocationById(idLocation);
          setLocationDetail(res.data.content);
        } catch (error) {
          console.log(error);
        }
      }
    };
    locationDetail();
  }, [roomDetail, idLocation]);

  return (
    <div className="container">
      <div className="flex justify-between py-6">
        <h2 className="text-2xl font-semibold">{roomDetail?.tenPhong}</h2>
        <div className="flex">
          <button className="py-1 px-3 hover:bg-slate-100 rounded-md me-2">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "inline",
                fill: "none",
                height: 16,
                width: 16,
                stroke: "currentcolor",
                strokeWidth: 2,
                overflow: "visible",
              }}
            >
              <path
                d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
                fill="none"
              />
            </svg>
            <span className="ms-1 text-base underline">Share</span>
          </button>
          <button className="py-1 px-3 hover:bg-slate-100 rounded-md me-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "inline",
                fill: "none",
                height: 16,
                width: 16,
                stroke: "currentcolor",
                strokeWidth: 2,
                overflow: "visible",
              }}
            >
              <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
            </svg>
            <span className="ms-1 text-base underline">Save</span>
          </button>
        </div>
      </div>
      <img
        src={roomDetail?.hinhAnh}
        width="100%"
        alt=""
        className="rounded-xl"
      />
      <div className="relative">
        <div className="grid grid-cols-3">
          {/* room info */}
          <div className="col-span-2">
            {/* title */}
            <div className="py-6 border-b">
              <h2 className="font-semibold text-xl">
                Entire rental unit in {locationDetail?.tenViTri},{" "}
                {locationDetail?.tinhThanh}
              </h2>
              <p className="text-base mt-2">
                {roomDetail?.khach} guests <span>·</span> {roomDetail?.phongNgu}{" "}
                bedroom <span>·</span> {roomDetail?.giuong} bed <span>·</span>{" "}
                {roomDetail?.phongTam} bath
              </p>
              <div className="text-base font-semibold mt-2">
                <i className="fa-solid fa-star"></i>4.99 (159) <span>·</span>{" "}
                <span className="underline">10 reviews</span>
              </div>
            </div>
            {/* host */}
            <div className="flex py-6 border-b">
              <img
                src={
                  "https://a0.muscache.com/im/Portrait/Avatars/messaging/b3e03835-ade9-4eb7-a0bb-2466ab9a534d.jpg?im_policy=medq_w_text&im_t=H&im_w=240&im_s=133.33&im_f=airbnb-cereal-medium.ttf&im_c=ffffff"
                }
                width={50}
                className="rounded-md"
                alt=""
              />
              <div className="ms-5">
                <p className="font-semibold">Hosted by Henry Park</p>
                <p className="text-sm text-gray-500">
                  Superhost <span>·</span> 4 months hosting
                </p>
              </div>
            </div>
            {/* basis info */}
            <div className="flex flex-col gap-5 py-8 border-b">
              {listBasisInfo.map((item, index) => {
                return (
                  <div className="flex" key={index}>
                    {item.icon}
                    <div className="ms-5">
                      <h4 className="font-semibold">{item.service}</h4>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* description */}
            <div className="py-8 border-b">
              <h4 className="font-semibold text-xl">About this place</h4>
              <p className="mt-5">{roomDetail?.moTa}</p>
            </div>
            <div className="py-8 border-b">
              <h4 className="font-semibold text-xl mb-5">Where you'll sleep</h4>
              <div className="overflow-hidden rounded-xl">
                <img
                  src={roomDetail?.hinhAnh}
                  className="w-full h-auto object-cover"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                  alt=""
                />
              </div>
              <p className="mt-5 font-semibold">Bedroom</p>
              <p className="text-sm">1 king bed</p>
            </div>
            {/* offer */}
            <div className="py-8">
              <h4 className="font-semibold text-xl mb-5">
                What this place offers
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {listOffer?.map((offer, offerIndex) => {
                  return (
                    <div key={offerIndex} className="py-2">
                      {offerIconMap[offer]}
                      <span className="ms-3">{offer}</span>
                    </div>
                  );
                })}
              </div>

              <button className="mt-5 py-2 px-5 border border-black rounded-lg font-semibold hover:bg-slate-100">
                Show all 10 amenities
              </button>
            </div>
          </div>
        </div>
        {/* booking card */}
        <div
          className="booking-card absolute top-2 right-6 w-96 rounded-md bg-white shadow-md"
          style={{ top: "10px", padding: "20px" }} // Khởi đầu từ 10px từ trên cùng
        >
          <div className="price-info mb-4">
            <span className="text-2xl font-semibold">
              ${roomDetail?.giaTien}
            </span>{" "}
            night
          </div>

          {/* booking form */}
          <BookingForm
            roomPrice={roomDetail?.giaTien}
            roomId={searchParam.get("id")}
          />
        </div>
      </div>

      {/* rates */}
      <div className="border-t">
        <h2 className="font-semibold text-2xl py-8">
          <i className="fa-solid fa-star"></i> 4.99 (159) <span>·</span>{" "}
          <span>10 reviews</span>
        </h2>
        <div className="grid grid-cols-7 gap-5 mb-10">
          <div>
            <h4 className="font-bold mb-5">Overall rating</h4>
            <div className="flex justify-between">
              {/* Rating Section */}
              <div className="w-full">
                <div className="flex items-center">
                  <span className="text-sm">5</span>
                  <div className="relative flex-grow h-2 bg-gray-300 mx-3">
                    <div
                      className="absolute top-0 left-0 h-full bg-black"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-sm">4</span>
                  <div className="relative flex-grow h-2 bg-gray-300 mx-3">
                    <div
                      className="absolute top-0 left-0 h-full bg-black"
                      style={{ width: "20%" }}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">3</span>
                  <div className="relative flex-grow h-2 bg-gray-300 mx-3">
                    <div
                      className="absolute top-0 left-0 h-full bg-black"
                      style={{ width: "10%" }}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">2</span>
                  <div className="relative flex-grow h-2 bg-gray-300 mx-3">
                    <div
                      className="absolute top-0 left-0 h-full bg-black"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">1</span>
                  <div className="relative flex-grow h-2 bg-gray-300 mx-3">
                    <div
                      className="absolute top-0 left-0 h-full bg-black"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {listReviewIcon.map((reviewItem, reviewIndex) => {
            return (
              <div key={reviewIndex}>
                <h4 className="font-bold mb-4">{reviewItem.title}</h4>
                <span className="text-lg font-semibold">{reviewItem.star}</span>
                <div className="mt-5">{reviewItem.icon}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* comment */}
      <div className="border-t py-8">
        <h4 className="font-semibold text-xl mb-5">What people say</h4>
        <div className="commment grid grid-cols-2 gap-4">
          {listComment?.map((cmt, cmtIndex) => (
            <div key={cmtIndex}>
              <div className="p-7 rounded-md space-y-5 border">
                <div className="flex items-center space-x-3 pb-5">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={cmt.avatar}
                    alt="avatar"
                  />
                  <div>
                    <h4 className="capitalize text-lg font-semibold">
                      {cmt.tenNguoiBinhLuan}
                    </h4>
                    <p>5 years on Airbnb</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: cmt.saoBinhLuan }, (_, index) => (
                    <i
                      key={index}
                      className="fa-solid fa-star text-yellow-500"
                    ></i>
                  ))}
                  <span>{cmt.ngayBinhLuan}</span>
                </div>
                <p className="">{cmt.noiDung}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RoomDetail;
