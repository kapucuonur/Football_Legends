import React, { useState } from "react";
import Card from "react-bootstrap/Card";
const PlayerCard = ({ name, img, statistics,official_career }) => {
  const [showImage, setShowImage] = useState(true);
  const handleToggle = () => setShowImage(!showImage);
  return (
    <Card
        onClick={() => setShowImage(!showImage)}
        className="player-card"
        title={name}
        alt={name + "image"}
        role="button"
      >
        {showImage ? (
          <Card.Img
            variant="top"
            src={img}
             onClick={() => setShowImage(false)}
          />
        ) : (
          <>
          <Card.Header >
          <Card.Title className="my-2">{name}</Card.Title>
           </Card.Header>
            <ul
              className="m-auto "
                onClick={() => setShowImage(true)}
            >
              {statistics.map((item, i) => (
                <li className="list-unstyled h5 text-start" key={i}>
                  {" "}
                  ⚽ {item}
                </li>
              ))}
            </ul>
            <span className="fw-bold my-2">
              Career Years : {official_career}
            </span>
            
          </>
        )}
        
      </Card>
  );
};

export default PlayerCard;