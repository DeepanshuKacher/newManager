import { AxiosError } from "axios";
import { Loader } from "./Loader";

interface Props {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError;
}

function LoaderPlusError(props: Props) {
  const { error, isError, isLoading } = props;

  if (isLoading) {
    return <Loader />;
  }
}
