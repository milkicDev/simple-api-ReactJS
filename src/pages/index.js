import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Api from '../Api';

class Index extends React.Component {
  state = {
    schedules: [],
    load: 50,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.infiniteScroll);

    Api.get('/schedule/full')
      .then((res) => {
        this.setState({ schedules: res.data });
      })
      .catch((error) => console.error(error));
  }

  infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      let newLoad = this.state.load;

      this.setState({
        load: newLoad + 20,
      });
    }
  };

  handleRouteSwitch = (path) => {
    this.props.history.push(path);
  };

  render() {
    const { schedules, load } = this.state;

    const cards = [];
    if (schedules.length > 0) {
      for (let index = 0; index < load; index++) {
        const schedule = schedules[index];

        const rating = [];
        if (schedule._embedded.show.rating) {
          for (let index = 1; index <= 5; index++) {
            if (index > schedule._embedded.show.rating.average) {
              rating.push(<span key={index}>☆</span>);
            } else {
              rating.push(<span key={index}>★</span>);
            }
          }
        }

        cards.push(
          <Col
            sm={12}
            md={4}
            lg={3}
            key={index}
            className='mb-4'
            onClick={() =>
              this.handleRouteSwitch(`/show/${schedule._embedded.show.id}`)
            }
          >
            <Card>
              <Card.Img
                variant='top'
                src={
                  schedule._embedded.show.image &&
                  schedule._embedded.show.image.medium
                }
              />
              <Card.Body>
                <p>
                  {rating} {schedule._embedded.show.rating.average || 0}/5
                </p>
                <Card.Title>
                  {schedule._embedded.show.name} - {schedule.name}
                </Card.Title>
                {/* <Card.Text
                  dangerouslySetInnerHTML={{
                    __html: schedule._embedded.show.summary,
                  }}
                /> */}
              </Card.Body>
            </Card>
          </Col>
        );
      }
    }

    return (
      <React.Fragment>
        <div
          className='bg-dark text-light pt-3'
          style={{ paddingBottom: '5rem' }}
        >
          <Container>
            <h2>TV Bland</h2>

            <h6>
              TV Show and web series database.
              <br />
              Created personalised schedules. Episode guide, cast, crew and
              <br />
              character information
            </h6>

            <h6 className='mt-5'>Last Added Shows</h6>
          </Container>
        </div>

        <Container style={{ marginTop: '-3rem' }}>
          <Row>{cards}</Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(Index);
