import { Link } from "react-router";

function LetterCard({ className="w-[50%]", x=true, children }) {
  return (
    <div className={`letter mx-auto py-10  text-[#82734B] drop-shadow-[0px_5px_7px_rgba(0,0,0,.2)] transition-all ${className}`}>
      <p className="w-fit ml-auto text-6xl text-white -mt-10 mr-3 hover:rotate-10  transition-all">
        {x && <Link className="pointer" to={"/home"}>
          x
        </Link>}
        
      </p>
      {children}
    </div>
  );
}

export default LetterCard;
