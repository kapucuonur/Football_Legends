## Football Legends

#### React Bootstrap

## Football Legends

### [filter işlemi](./src/components/legend/LegendContainer.jsx)

- The data shown on the screen should change according to the data entered into the input. Where do we print the data to the screen? In the CardContainer. Then we can create the input in the card container.

- In our example, the filtering process is done according to the players' name information. So, how do we filter by name?
- Let's remember the string methods. Which of these methods was checking whether it contained the characters we gave it? The includes() method. This method returns true if the data written into it contains the string we are querying, and false if it does not.

```javascript
  "araba".includes("a") => true
  "araba".includes("ar") => true
  "araba".includes("ara") => true
  "araba".includes("m") => false
```

- Here we will query the string name information in the filtering process. If the name information contains the data written in the input, the data will be filtered accordingly. And this should happen every time the user makes a change in the input.
- So first, what do we need is the data coming from the input. How do we capture the data from the input instantly? We can capture the changes instantly with the onChange event. We captured the data in onChange, but we need something that will detect each change and reflect it on the screen, but what is that? Of course, the useState hook. The useState hook is a hook that follows the state changes in React and re-renders the component according to that change.

```jsx
  const [search,setSearch] = useState("");

  ...

  return (
    <>
      <input type="search" onChange={(e)=> setSearch(e.target.value)}>
    </input>
  )
```

- Then, if we transfer the data coming from the input to the state, we will render the component with every change. Since filteredData will be recreated, that is, redefined, every time the component is rendered, we can easily make the change on the screen.

```jsx
const CardContainer = () => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((player) =>
    player.name.toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <>
      <Form.Control
        type="search"
        placeholder="Search player..."
        className="w-50 m-auto"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Container className="card-container my-4 p-3 rounded-4">
        <Row sm={2} md={2} lg={3} xl={4} className="g-4 justify-content-center">
          {filteredData.map((player, i) => {
            return (
              <Col key={i}>
                <PlayerCard {...player} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default CardContainer;
```

### [Change the Data Displayed in the Card](./src/components/legend/LegendCard.jsx)

- What is expected from us is that every time a card is clicked, there should be a change in that card. In our example, instead of the image, the statistical information should be displayed on the card or vice versa, the image should be displayed on the card.

- And every time it is clicked, the relevant card needs to be re-rendered. In order to do this in React, we need the useState hook. And since only the clicked card should change and the change should remain constant until that card is clicked again, each card should have its own state.
- In order for each card to have a state, if we return a component for each data when we map the data, we can create the states of each card in that component. Because the more components we will have created, the more components we will have created, so the states we created in that component will be defined separately for each data in the functions. In this way, we will be able to create the state of each card. Otherwise, if we press the screen where we map the data, we will have only one state, so no matter which card we click on, all of them will change.

- Therefore, we will map the data in the parent component and call the child component PlayerCard component for each data in the return and send the data to it via props.

```jsx
const CardContainer = () => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((player) =>
    player.name.toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <>
      <Form.Control
        type="search"
        placeholder="Search player..."
        className="w-50 m-auto"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Container className="card-container my-4 p-3 rounded-4">
        <Row sm={2} md={2} lg={3} xl={4} className="g-4 justify-content-center">
          {filteredData.map((player, i) => {
            return (
              <Col key={i}>
                <PlayerCard {...player} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default CardContainer;
```

- Now it's time to create states for each card. What kind of state will we create here? When the card is clicked, text will appear, when clicked again, images will appear. We need useState to follow this change. And we need the onClick event to make the change.

```jsx
const [showImg, setShowImg] = useState(true);
```

- As the state changes, the relevant component will be rendered, so we can create a mechanism according to this state. The name of this mechanism is **conditional rendering** in React. We can do this in JSX with [ternary operator](https://react.dev/learn/conditional-rendering#conditional-ternary-operator--). In other words, if the showImg state is true, the image will be displayed, if it is false, the name, statistics, year will be displayed. So how will the change happen? In other words, what should happen when clicked. And where will we define the click event? When the image is clicked, showImage will be false, when the text is clicked, showImage will be true. So instead of defining onClick separately, can we define it from a single place and have the same click work when there is both image and text, and can we reverse the showImage state? Of course we can. If we give the onClick event to the container and use the benefits of the `not !` operator in onClick, we can finish this process in one move. So when we say `setShowImage(!showImage)` it will make it false if it is true, and true if it is false.

```jsx
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
const PlayerCard = ({ name, img, statistics, official_career }) => {
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
          // onClick={() => setShowImage(false)}
        />
      ) : (
        <>
          <Card.Header>
            <Card.Title className="my-2">{name}</Card.Title>
          </Card.Header>
          <ul
            className="m-auto "
            //   onClick={() => setShowImage(true)}
          >
            {statistics.map((item, i) => (
              <li className="list-unstyled h5 text-start" key={i}>
                {" "}
                ⚽ {item}
              </li>
            ))}
          </ul>
          <span className="fw-bold my-2">Career Years : {official_career}</span>
        </>
      )}
    </Card>
  );
};

export default PlayerCard;
```
