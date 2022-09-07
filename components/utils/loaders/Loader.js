import Loader from "react-loader-spinner";

export default function Spinners({size}) {

    return (
        <Loader
            type="TailSpin"
            color="rgba(29,161,242,1.00)"
            height={size ? size : 30}
            width={size ? size : 30}
            timeout={10000} //3 secs
        />
    );
}