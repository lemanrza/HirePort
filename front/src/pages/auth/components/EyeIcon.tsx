  const EyeIcon = ({ open }: { open: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-600"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
    >
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M2.5 10s3.5-6 7.5-6 7.5 6 7.5 6-3.5 6-7.5 6S2.5 10 2.5 10zM10 13a3 3 0 100-6 3 3 0 000 6z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 3l14 14M9.88 9.88a3 3 0 104.24 4.24M2.5 10s3.5-6 7.5-6c1.44 0 2.79.36 3.98.97M17.5 10s-1.99 3.4-5.01 5.04"
        />
      )}
    </svg>
  );


export default EyeIcon;
