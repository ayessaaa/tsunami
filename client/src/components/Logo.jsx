import 'animate.css';
function Logo({height}) {
  return <div className="text-center w-full text-5xl">
    {/* <img src="./imgs/logo.png" className="h-70 mx-auto animate__fadeIn animate__animated "></img> */}
    <img src="./imgs/logogif2.gif" className={`${height} mx-auto animate__fadeIn animate__animated `}></img>
  </div>;
}

export default Logo;
