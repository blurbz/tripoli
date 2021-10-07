import RingLoader from "react-spinners/RingLoader";

function FallbackLoading() {
  return (
    <div>
      <h1 className="text-center text-2xl">Loading...</h1>
      <RingLoader loading={true} />
    </div>
  );
}

export default FallbackLoading;
