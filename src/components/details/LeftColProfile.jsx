import { Card, Col } from 'react-bootstrap'

function LeftColPost() {
  return (
    <Col xs={4} className='d-none d-md-flex'>
      <Card className='left-col-details ms-5 mt-4 border-0 position-sticky' style={{ top: '95px' }}>
        <Card.Body className='text-dark'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, placeat quidem nihil voluptas deleniti,
          officiis doloribus mollitia sint nisi quisquam earum! Odit nesciunt totam distinctio consequatur quis
          inventore suscipit ullam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolorem earum nemo
          maxime perferendis voluptas sed veritatis consectetur recusandae soluta neque odit quidem aliquid, repellat
          odio blanditiis autem cum dicta.
          {/* 
        
        
          <div>
            <h5>Interests</h5>
            <ul>
              {interests.map(interest => (
                <li key={interest.id}>{interest.name}</li>
              ))}
            </ul>

            <h5>Spoken Languages</h5>
            <ul>
              {spokenLanguages.map(language => (
                <li key={language.languageCode}>{language.languageName}</li>
              ))}
            </ul>
          </div> */}
        </Card.Body>
      </Card>
    </Col>
  )
}

// LeftColPost.propTypes = {
//   name: PropTypes.string.isRequired,
//   surname: PropTypes.string.isRequired,
//   profilePicture: PropTypes.string,
//   biography: PropTypes.string.isRequired,
//   averageRating: PropTypes.number,
//   location: PropTypes.string,
//   gender: PropTypes.string,
//   profileId: PropTypes.string,
//   interests: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired
//     })
//   ),
//   spokenLanguages: PropTypes.arrayOf(
//     PropTypes.shape({
//       languageCode: PropTypes.string.isRequired,
//       languageName: PropTypes.string.isRequired
//     })
//   )
// }

export default LeftColPost
