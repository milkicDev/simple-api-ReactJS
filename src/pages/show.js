import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Api from '../Api';

class Show extends React.Component {
  state = {
    id: this.props.match.params.id,
    show: null,
  };

  componentDidMount() {
    const promise = Api.get(`/shows/${this.state.id}`)
      .then((res) => {
        this.setState({ show: res.data });
      })
      .catch((error) => console.error);

    Promise.all([promise]).then(() => {
      Api.get(`/shows/${this.state.id}/cast`)
        .then((res) => {
          console.log(res);
          this.setState({
            show: {
              ...this.state.show,
              cast: res.data,
            },
          });
        })
        .catch((error) => console.error);
    });
  }

  render() {
    const { show } = this.state;

    if (!this.state.id || !show) {
      return null;
    }

    const rating = [];
    if (show.rating) {
      for (let index = 1; index <= 5; index++) {
        if (index > show.rating.average) {
          rating.push(<span key={index}>☆</span>);
        } else {
          rating.push(<span key={index}>★</span>);
        }
      }
    }

    const starring = [];
    if (show.cast && show.cast.length > 0) {
      for (let index = 0; index < 5; index++) {
        if (show.cast[index]) {
          starring.push(
            <tr>
              <td class='align-middle border-top-0 border-bottom'>
                <img
                  src={
                    show.cast[index].person.image &&
                    show.cast[index].person.image.medium
                  }
                  alt={show.cast[index].person.name}
                  className='rounded-circle'
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
              <td class='align-middle border-top-0 border-bottom'>
                {show.cast[index].person.name}
              </td>
              <td class='align-middle border-top-0 border-bottom'>
                {show.cast[index].character.name}
              </td>
            </tr>
          );
        }
      }
    }

    return (
      <React.Fragment>
        <div
          className='bg-dark text-light pt-3'
          style={{
            paddingBottom: '2rem',
            marginBottom: '3rem',
            minHeight: '30rem',
          }}
        >
          <Container>
            <h2>TV Bland</h2>

            <div className='d-flex flex-column flex-md-row' style={{ marginTop: '2rem' }}>
              <img
                src={show.image.original}
                alt={show.name}
                style={{ width: '18rem', height: '380px', marginRight: '2rem' }}
              />

              <div>
                <p>
                  {rating} {show.rating.average || 0}/5
                </p>
                <h1>{show.name}</h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: show.summary,
                  }}
                />
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <Row>
            <Col>
              <p className='h3'>Show Info</p>
              <Table responsive>
                <tbody>
                  {show.webChannel && (
                    <tr>
                      <td class='align-middle border-top-0 border-bottom'>
                        Streamed on
                      </td>
                      <td class='align-middle border-top-0 border-bottom'>
                        {show.webChannel.name}
                      </td>
                    </tr>
                  )}
                  {show.schedule && (
                    <tr>
                      <td class='align-middle border-top-0 border-bottom'>
                        Schedule
                      </td>
                      <td class='align-middle border-top-0 border-bottom'>
                        {show.schedule.days.join(', ')}
                        <br />
                        {show.schedule.time}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td class='align-middle border-top-0 border-bottom'>
                      Status
                    </td>
                    <td class='align-middle border-top-0 border-bottom'>
                      {show.status}
                    </td>
                  </tr>
                  <tr>
                    <td class='align-middle border-top-0 border-bottom'>
                      Genres
                    </td>
                    <td class='align-middle border-top-0 border-bottom'>
                      {show.genres.join(', ')}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <p className='h3'>Starring</p>
              <Table responsive>
                <tbody>{starring}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

Show.propTypes = {
  match: PropTypes.object,
};

export default Show;
