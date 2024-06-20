import { BeatLoader } from "react-spinners";
import { Button } from "../ui/button";

const LoadingButton = ({ loading, text, icon, ...props }) => {
  return (
    <Button type="submit" className="w-full" {...props}>
      {loading ? (
        <BeatLoader
          size={10}
          color="white"
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <span>{text}</span>
          {icon && icon}
        </>
      )}
    </Button>
  );
};

export default LoadingButton;
