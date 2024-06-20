import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const buildNewuserInfo = () => ({
    name: '',
    email: '',
    password: '',
    role: ''
});

const UserModal = ({
    show,
    userToUpdateInfo,
    isCreate,
    handleAdduserClick,
    handleUpdateuserClick,
    handleCancelClick
}) => {
    const [currentuserInfo, setCurrentuserInfo] = useState({});
    const [shouldValidate, setShouldValidate] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        if (show) {
            if (isCreate) {
                const newuserBarebone = buildNewuserInfo();
                setCurrentuserInfo(newuserBarebone);
            } else {
                setCurrentuserInfo(userToUpdateInfo)
            }
        }

    }, [show]);

    useEffect(() => {
        if (formRef.current) {
            setIsValidated(formRef.current.checkValidity());
        }

    }, [currentuserInfo]);

    const handleuserInputFieldChange = (event, fieldName) => {
        {
            setShouldValidate(true)
        }

            setCurrentuserInfo({
                ...currentuserInfo,
                [fieldName]: event.target.value
            })
    
    }

    const handleSave = (event) => {
        if (isValidated) {
            if (isCreate) {
                handleAdduserClick(currentuserInfo);
            } else {
                handleUpdateuserClick(currentuserInfo);
            }

            clearState();
        }
    };

    const handleCancel = (event) => {
        handleCancelClick();

        clearState();
    };

    const clearState = () => {
        setShouldValidate(false)
        setIsValidated(false);
        setCurrentuserInfo({});
    }

    return (
        <>
            <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{isCreate ? 'Agregar Usuario' : 'Modificar Usuario'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef} noValidate validated={shouldValidate}>
                        <Form.Group className="mb-3" controlId="ControlInput1">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                defaultValue={currentuserInfo.name}
                                type="text"
                                placeholder=""
                                onChange={(e) => handleuserInputFieldChange(e, 'name')}
                                required
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, ingrese el nombre de usuario
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                defaultValue={currentuserInfo.email}
                                type="email"
                                placeholder=""
                                required
                                onChange={(e) => handleuserInputFieldChange(e, 'email')}
                            />
                            <Form.Control.Feedback>Muy bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Tiene que ingresar un email
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                defaultValue={currentuserInfo.password}
                                type="password"
                                placeholder=""
                                required
                                onChange={(e) => handleuserInputFieldChange(e, 'password')}
                            />
                            <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Ingrese una contraseña
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ControlInput1">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control
                                defaultValue={currentuserInfo.role}
                                type="text"
                                placeholder=""
                                required
                                onChange={(e) => handleuserInputFieldChange(e, 'role')}
                            />
                            <Form.Control.Feedback>Genial!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Determine el rol del usuario
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={!isValidated}
                    >
                        {isCreate ? 'Agregar' : 'Modificar'}
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserModal;