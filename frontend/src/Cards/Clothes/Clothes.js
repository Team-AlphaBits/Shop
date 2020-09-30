import React from "react";
import ReactDOM from "react-dom";
import { Card, Button } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import classes from "./Clothes.module.css";
import Item from "./Item";
import Penguin from "../../Assets/images/Penguins.jpg";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Clothes() {
  return (
    <>
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints}>
          <Item>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Penguin} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Item>
          <Item>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Penguin} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Item>
          <Item>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Penguin} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Item>
          <Item>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Penguin} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Item>
          <Item>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Penguin} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Item>
          <Item>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Penguin} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Item>
          <Item>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Penguin} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Item>
          <Item>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Penguin} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Item>
        </Carousel>
      </div>
    </>
  );
}

export default Clothes;
