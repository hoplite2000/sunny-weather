import React, { useState, useEffect } from 'react'
import { Form, Col, Button, Row, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './loadercomponent';
import Message from './messagecomponent';
import { getinfoaction } from '../actions/infoactions';

const Main = () => {

    const dispatch = useDispatch();

    const getinfo = useSelector((state) => state.getinfo);
    const { loading, error, info } = getinfo;

    const [location, setlocation] = useState('');
    const [errorlocation, seterrorlocation] = useState('');
    const [show, setshow] = useState(false);

    const validate = () => {
        let res = true;

        if (!(/^[a-zA-z]{2,20}$/.test(location))) {
            seterrorlocation("Enter a valid location");
            res = false;
        } else {
            seterrorlocation("");
        }

        return res;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const valid = validate();
        if (valid) {
            setshow(true);
            dispatch(getinfoaction(location));
        } else {
            setshow(false);
        }
    }

    useEffect(() => {
        if (info) {
            setshow(true);
        } else {
            setshow(false);
        }
    }, [info]);

    const weatherIcon = {
        Thunderstorm: "wi-thunderstorm",
        Drizzle: "wi-sleet",
        Rain: "wi-storm-showers",
        Snow: "wi-snow",
        Atmosphere: "wi-fog",
        Clear: "wi-day-sunny",
        Clouds: "wi-day-fog"
    };

    const get_WeatherIcon = (rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
                return (weatherIcon.Thunderstorm);
            case rangeId >= 300 && rangeId <= 321:
                return (weatherIcon.Drizzle);
            case rangeId >= 500 && rangeId <= 521:
                return (weatherIcon.Rain);
            case rangeId >= 600 && rangeId <= 622:
                return (weatherIcon.Snow);
            case rangeId >= 701 && rangeId <= 781:
                return (weatherIcon.Atmosphere);
            case rangeId === 800:
                return (weatherIcon.Clear);
            case rangeId >= 801 && rangeId <= 804:
                return (weatherIcon.Clouds);
            default:
                return (weatherIcon.Clouds);
        }
    }

    return (
        <div className='start'>
            <Form onSubmit={submitHandler}>
                <Form.Row>
                    <Col xs={12} md={{ offset: 1, span: 8 }}>
                        <Form.Group controlId='location'>
                            <Form.Control size="lg" type='text' placeholder='Enter Location' value={location} onChange={(e) => setlocation(e.target.value)}></Form.Control>
                            <p style={{ color: 'red' }}>{errorlocation}</p >
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <center>
                            <Button type='submit' variant='warning'>Get Weather</Button>
                        </center>
                    </Col>
                </Form.Row>
            </Form>
            <br />
            <br />
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    show && (
                        <Container>
                            <Row>
                                <Col style={{
                                    fontSize: '15px', fontFamily: 'sans-serif'
                                }}>
                                    < center > <h1 className="py-3">{info.name}, {info.sys.country}</h1></center>
                                    <br />
                                    <center><span className={`wi ${get_WeatherIcon(info.weather[0].id)} display-1`}></span></center>
                                    <br />
                                    <center><h2 className="py-3">{info.weather[0].main}</h2></center>
                                    <center><h3>{info.weather[0].description}</h3></center>
                                    <br />
                                    <Row>
                                        <Col xs={12} md={2} className='py-3'>
                                            <Card style={{ height: '103%', background: 'lightcyan' }}>
                                                <center>
                                                    <Card.Body>
                                                        <Card.Title><span className='wi wi-barometer'></span> Atmospheric Pressure</Card.Title>
                                                        <hr />
                                                        <Card.Text>
                                                            {info.main.pressure ? <p>Pressure: {info.main.pressure}hPa</p> : <p>Pressure: --</p>}
                                                            {info.main.humidity ? <p>Humidity: {info.main.humidity}%</p> : <p>Humidity: --</p>}
                                                            {info.main.sea_level ? <p>Sea Level: {info.main.sea_level}hPa</p> : <p>Sea Level: --</p>}
                                                            {info.main.grnd_level ? <p>Ground Level: {info.main.grnd_level}hPa</p> : <p>Ground Level: --</p>}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </center>
                                            </Card>
                                        </Col>
                                        <Col xs={12} md={8} className='py-3'>
                                            <Card style={{ height: '103%', background: 'lightcyan' }}>
                                                <center>
                                                    <Card.Body>
                                                        <Card.Title><span className='wi wi-thermometer'></span> Temperature</Card.Title>
                                                        <hr />
                                                        <Container>
                                                            <Row>
                                                                <Col md={4}>
                                                                    <Card.Text>
                                                                        <u>Celsius</u>
                                                                        <p></p>
                                                                        {info.main.temp ? <p>Temperature: {(info.main.temp - 275.15).toFixed(2)}{`\xB0C`}</p> : <p>Temperature: --</p>}
                                                                        {info.main.feels_like ? <p>Feels Like: {(info.main.feels_like - 275.15).toFixed(2)}{`\xB0C`}</p> : <p>Feels Like: --</p>}
                                                                        {info.main.temp_max ? <p>Max Temperature: {(info.main.temp_max - 275.15).toFixed(2)}{`\xB0C`}</p> : <p>Max Temperature: --</p>}
                                                                        {info.main.temp_min ? <p>Min Temperature: {(info.main.temp_min - 275.15).toFixed(2)}{`\xB0C`}</p> : <p>Min Temperature: --</p>}
                                                                    </Card.Text>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Card.Text>
                                                                        <u>Fareheneit</u>
                                                                        <p></p>
                                                                        {info.main.temp ? <p>Temperature: {(info.main.temp * 9 / 5 - 459.67).toFixed(2)}{`\xB0F`}</p> : <p>Temperature: --</p>}
                                                                        {info.main.feels_like ? <p>Feels Like: {(info.main.feels_like * 9 / 5 - 459.67).toFixed(2)}{`\xB0F`}</p> : <p>Feels Like: --</p>}
                                                                        {info.main.temp_max ? <p>Max Temperature: {(info.main.temp_max * 9 / 5 - 459.67).toFixed(2)}{`\xB0F`}</p> : <p>Max Temperature: --</p>}
                                                                        {info.main.temp_min ? <p>Min Temperature: {(info.main.temp_min * 9 / 5 - 459.67).toFixed(2)}{`\xB0F`}</p> : <p>Min Temperature: --</p>}
                                                                    </Card.Text>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Card.Text>
                                                                        <u>Kelvin</u>
                                                                        <p></p>
                                                                        {info.main.temp ? <p>Temperature: {info.main.temp}K</p> : <p>Temperature: --</p>}
                                                                        {info.main.feels_like ? <p>Feels Like: {info.main.feels_like}K</p> : <p>Feels Like: --</p>}
                                                                        {info.main.temp_max ? <p>Max Temperature: {info.main.temp_max}K</p> : <p>Max Temperature: --</p>}
                                                                        {info.main.temp_min ? <p>Min Temperature: {info.main.temp_min}K</p> : <p>Min Temperature: --</p>}
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </Card.Body>
                                                </center>
                                            </Card>
                                        </Col>
                                        <Col xs={12} md={2} className='py-3'>
                                            <Card style={{ height: '103%', background: 'lightcyan' }}>
                                                <center>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            <Card.Title><span className='wi wi-strong-wind'></span> Wind</Card.Title>
                                                            <hr />
                                                            {info.wind.speed ? <p>Wind Speed: {info.wind.speed}m/sec</p> : <p>Wind Speed: --</p>}
                                                            {info.wind.deg ? <p>Wind Degree: {info.wind.deg}{`\u00B0 `}</p> : <p>Wind Degree: --</p>}
                                                            {info.wind.gust ? <p>Wind Gust: {info.wind.gust}m/sec</p> : <p>Wind Gust: --</p>}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </center>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <br />
                                </Col>
                            </Row>
                        </Container>
                    )
            }
        </div >
    )
}

export default Main
