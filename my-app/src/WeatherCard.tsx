import React from "react";
şnterface WeatherCardProps {
    children: React.ReactNode
}

const WeatherCard = ({ children }: WeatherCardProps): JSX.Element => {
    return(
    <><div>{children}</div></> ;
};

export default WeatherCard;