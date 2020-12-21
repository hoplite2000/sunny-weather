import React, { useState, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap';
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
                        <h1>{info.name}</h1>
                    )
            }
        </div>
    )
}

export default Main
