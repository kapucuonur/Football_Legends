import { useState } from "react";
import {  Container, Row } from "react-bootstrap"; //!yazım olarak daha kullanışlı ama performans açısından üstteki yöntem daha ideal

import Form from "react-bootstrap/Form";
import { data } from "../../helpers/data";
import LegendCard from "./LegendCard";

const LegendContainer = () => {
//   const [show, setShow] = useState(false);//! Parent componentte tanımladığımızda state 1 tane olmuş oluyor. Tek bir state ile tüm veriyi yönetmeye çalışınca da hata alıyoruz. O yüzden her bir veri için state tanımlamamaız gerekiyor. Bunun için de verileri bir component içerisinde yazdırmış olduk. 
    const [search,setSearch] = useState('');
//   console.log(data);
  const handleChange = (e) => {
    console.log("first",e.target.value)
    setSearch(e.target.value); //!setter metodu her zaman asenkron çalışır.
    // console.log(search)
    // if(e.target.value)
  }
  console.log("second",search)

  const filteredData = data.filter(item=> item.name.toLowerCase().includes(search.trim().toLowerCase()));
  console.log(filteredData)
  return (
    <div>
      <Form.Control type="search" placeholder="Search legends..." onChange={handleChange} className="w-50 mx-auto my-2" />
      <Container className="p-3 rounded-4 card-container my-3">
        <Row xs={1} md={2} lg={3} className="justify-content-center g-3">
          {filteredData.map((legend) => (
            <LegendCard key={legend.id} legend={legend}/>
          ))}
          {/**Diğer props gönderme yöntemleri */}
          {/* {filteredData.map((legend) => (
            <LegendCard key={legend.id} {...legend}/> //* {name,img,statistics,official_career}
          ))} */}
          {/* {filteredData.map((legend) => (
            <LegendCard key={legend.id} name={legend.name} img={legend.img} statistics={legend.statistics} official_career={legend.official_career} /> //* {name,img,statistics,official_career}
          ))} */}
        </Row>
      </Container>
    </div>
  );
};

export default LegendContainer;


// import { useState } from "react";
// import { Col, Container, Row } from "react-bootstrap"; //!yazım olarak daha kullanışlı ama performans açısından üstteki yöntem daha ideal
// import Card from "react-bootstrap/Card";
// import Form from "react-bootstrap/Form";
// import { data } from "../../helpers/data";
// import LegendCard from "./LegendCard";

// const LegendContainer = () => {
//   const [show, setShow] = useState(false);
//   console.log(data);
//   return (
//     <div>
//       <Form.Control type="search" placeholder="Search legends..." />
//       <Container>
//         <Row xs={1} md={2} lg={3}>
//           {data.map((legend) => (
//             // <Col xs={10} sm={8} md={6} lg={4} xl={3}>
//             // <Col>
//             //   <Card onClick={() => setShow(!show)}>
//             //     {!show ? (
//             //       <Card.Img
//             //         // onClick={() => setShow(!show)}
//             //         variant="top"
//             //         src={legend.img}
//             //       />
//             //     ) : (
//             //       <>
//             //         {/* <Fragment key=> Fragmentin avantajı key propunu alabilmesi ama boş brakırsak yazamayız */}
//             //         <Card.Header>
//             //           <Card.Title>{legend.name}</Card.Title>
//             //         </Card.Header>
//             //         <ul className="m-auto">
//             //           {legend.statistics.map((item) => (
//             //             <li className="list-unstyled h5 text-start">
//             //               {" "}
//             //               ⚽ {item}
//             //             </li>
//             //           ))}
//             //         </ul>
//             //         <span>{legend.official_career}</span>
//             //       </>
//             //     )}
//             //   </Card>
//             // </Col>
//             <LegendCard legend={legend}/>
//           ))}
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default LegendContainer;

