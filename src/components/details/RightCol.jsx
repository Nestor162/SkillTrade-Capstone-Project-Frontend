import { useEffect, useState } from 'react'
import { Card, Col, Spinner } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { getPostById } from '../../utils/api'
import ExtraInfoWithIcons from '../home/ExtraInfoWithIcons'
import { convertSnakeCaseToCapitalized } from '../../utils/stringUtils'

function RightCol() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  const [searchParams] = useSearchParams()
  const postId = searchParams.get('id')

  async function handleGetPostById(id) {
    setIsLoading(true)
    const { data, error } = await getPostById(id)
    if (error) {
      setErrorMsg(error.message)
      console.error(errorMsg)
    } else {
      setData(data)
      console.log(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetPostById(postId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading ? (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '360px' }}>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        <Col xs={10} md={7} className='mx-auto mx-lg-3 mx-xl-0 mt-4'>
          <Card className='right-col-details border-0'>
            {data.imageUrl && <Card.Img variant='top' src={data.imageUrl} />}
            <Card.Body>
              <Card.Title>{data.title}</Card.Title>
              <Card.Text>{data.content}</Card.Text>
              <div className='d-flex gap-3 small text-secondary mt-4'>
                <ExtraInfoWithIcons
                  availability={convertSnakeCaseToCapitalized(data.availability)}
                  skillLevel={convertSnakeCaseToCapitalized(data.skillLevel)}
                  category={data.category.name}
                />
              </div>
              {/* <Button variant='primary'>Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Col>
      )}
    </>
  )
}

export default RightCol
