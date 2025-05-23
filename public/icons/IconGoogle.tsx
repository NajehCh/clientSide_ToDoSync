import React from "react";

function IconGoogle({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 533.5 544.3"
    >
      <path
        fill="#4285f4"
        d="M533.5 278.4c0-17.4-1.4-34.1-4.1-50.4H272v95.3h146.9c-6.3 34.1-25 63-53.3 82.3v68h86.1c50.4-46.4 81.8-114.8 81.8-195.2z"
      />
      <path
        fill="#34a853"
        d="M272 544.3c72.6 0 133.6-24 178.1-65.1l-86.1-68c-23.9 16-54.6 25.3-92 25.3-70.7 0-130.7-47.7-152.1-111.9h-89v70.3c44.9 89.2 137.3 149.4 241.1 149.4z"
      />
      <path
        fill="#fbbc04"
        d="M119.9 324.6c-10.8-32.4-10.8-67.6 0-100.1v-70.3h-89C-6.4 219.4-6.4 324.8 30.9 415l89-70.4z"
      />
      <path
        fill="#ea4335"
        d="M272 107.7c39.5 0 75 13.6 103.1 40.4l77.1-77.1C405.6 25 344.6 0 272 0 168.2 0 75.8 60.2 30.9 149.4l89 70.3c21.4-64.2 81.4-111.9 152.1-111.9z"
      />
    </svg>
  );
}

export default IconGoogle;
