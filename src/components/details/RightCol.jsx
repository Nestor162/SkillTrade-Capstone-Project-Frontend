import { Button, Card, Col } from 'react-bootstrap'

function RightCol() {
  return (
    <Col xs={10} md={7} className='mx-auto mx-lg-3 mx-xl-0 mt-4'>
      <Card className='right-col-details border-0'>
        <Card.Img variant='top' src='holder.js/100px180' />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt ex libero, in aliquet augue
            ornare vitae. Ut quis ornare ante. Pellentesque eu tristique leo. Nullam ante mauris, imperdiet eget feugiat
            sed, placerat ac dui. Cras ac euismod ligula, in mattis enim. Aliquam ut ligula sit amet nisi rhoncus
            pharetra vitae ut elit. Nullam nec ipsum dapibus, mattis odio ut, molestie justo. Vivamus dignissim leo leo,
            in lacinia ligula imperdiet in. Curabitur convallis ipsum elit, interdum fermentum elit euismod volutpat.
            Donec consectetur eros rhoncus, lacinia elit ac, imperdiet erat. Nunc imperdiet, mi ut congue pharetra, est
            ante varius sapien, eu ornare nunc augue sit amet leo. Integer id enim elementum ex imperdiet efficitur.
            Integer aliquam ultricies massa sit amet ultricies. Mauris sollicitudin tortor enim, eget porta velit
            feugiat sed. Nulla facilisi. Cras aliquet mattis imperdiet. Ut turpis augue, fringilla vel risus in,
            consequat elementum lorem. Pellentesque viverra nunc eget lectus sodales tincidunt. Cras ac ante interdum,
            laoreet tellus ut, elementum erat. Donec dictum fringilla leo, et ultricies enim. Donec ut semper orci.
            Quisque laoreet turpis non orci feugiat, ac dignissim lectus tincidunt. Donec dictum ipsum non turpis
            laoreet rhoncus. Suspendisse potenti. Aliquam sed lacinia lorem. Duis gravida, mi nec vestibulum commodo,
            ante turpis elementum massa, at finibus nulla ipsum sit amet magna. Nulla ultricies magna nisl, a feugiat
            velit maximus vitae. Nullam maximus magna eu felis malesuada egestas. Curabitur nibh turpis, blandit sed
            vulputate vel, sodales et lorem. Nullam fringilla nulla et dolor porta euismod quis ut ante. Sed vehicula
            placerat lobortis. Nam ornare tempor sodales. Nulla eu nisl sem. Vestibulum eu neque orci. Morbi finibus
            placerat sapien, vel consequat turpis blandit eu. Nullam condimentum libero eu magna semper mollis. Nam nunc
            nulla, viverra nec erat vel, facilisis fermentum felis. Etiam id neque at dui rutrum ornare ut sit amet
            sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            Curabitur tincidunt nisi vel bibendum ultricies. Fusce quis neque elit. Cras tortor sem, accumsan et augue
            mollis, accumsan porttitor ex. Quisque consequat et tortor nec lobortis. Integer dictum ligula nec dui
            suscipit, vel iaculis est tempus. Sed ut pellentesque metus. Morbi ut tincidunt massa, eu pulvinar odio.
            Suspendisse imperdiet, elit at auctor vulputate, odio eros pellentesque eros, iaculis gravida arcu ligula
            quis diam. Sed eleifend elit a lacus maximus suscipit. Pellentesque id sem non ante pharetra rutrum eu nec
            lorem. Curabitur tincidunt elementum turpis in posuere. Morbi pharetra mollis ligula nec condimentum.
            Vivamus vel erat a nibh dapibus viverra. Vestibulum in felis lorem. Donec venenatis turpis luctus maximus
            sollicitudin. Donec rhoncus interdum rhoncus. Praesent in ex tempus, tempor tortor non, suscipit lorem.
            Vestibulum odio nulla, faucibus nec commodo sed, condimentum ut nibh. Curabitur tincidunt bibendum velit,
            eget lobortis nibh ullamcorper a.
          </Card.Text>
          <Button variant='primary'>Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default RightCol
