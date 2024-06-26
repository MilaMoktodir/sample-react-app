import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { IoSnow } from "react-icons/io5";
import { BsFlower1 } from "react-icons/bs";
import { getSeasonData } from "../api/actions";

const AllSeasonCard: React.FC = () => {
  const [data, setData] = useState<AllSeasonData>();
  const [loadingState, setLoadingState] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching season Data...");
    console.log(city);
    setLoadingState(true);
    getSeasonData(city)
      .then((res: AllSeasonData) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error: string) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="cityname"
              type="text"
              label="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.springSeason.city}</h1>
            {data.springSeason.temperature > 20 && (
              <div>
                <BsFlower1 className="w-36 h-36" />
              </div>
            )}

            {data.summerSeason.temperature > 35 && (
              <div>
                < IoSnow className="w-36 h-36" />
              </div>
            )}
            {data.autumnSeason.temperature >  && (
              <div>
                < IoSnow className="w-36 h-36" />
              </div>
            )}
            {data.winterSeason.temperature > 35 && (
              <div>
                < IoSnow className="w-36 h-36" />
              </div>
            )}


            <p className="text-3xl font-bold">{data.springSeason.temperature}°C</p>
            <p className="text-lg">Humidity: {data.springSeason.humidity}%</p>
            <p className="text-lg">Wind: {data.springSeason.wind} km/h</p>
            <p className="text-lg">Rain: {data.springSeason.rain} %</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a city</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AllSeasonCard;
